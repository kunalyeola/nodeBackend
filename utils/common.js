/* eslint-disable no-useless-catch */
const config = require("../config");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const fs = require("fs");
const tmp = require("tmp");

module.exports = {
  response: (msg, data = {}) => {
    const details = {
      message: msg,
      data
    };
    return details;
  },

  generateToken: tokenData => {
    const encryptToken = jwt.sign(tokenData, config.jwtPrivateKet);
    return encryptToken;
  },

  generateRefreshToken: tokenData => {
    const refreshToken = jwt.sign({ data: tokenData }, "1d", {
      expiresIn: "1d"
    });
    return refreshToken;
  },

  verifyToken: token => {
    try {
      const decodedData = jwt.verify(token, config.jwtTokenKey);
      return decodedData;
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        err.message = "User Session Expired";
        err.status = 401;
        throw err;
      }
      throw err;
    }
  },

  verifyTokenWithoutExpiration: token => {
    try {
      const decodedData = jwt.verify(token, config.jwtTokenKey, { ignoreExpiration: true });
      return decodedData;
    } catch (err) {
      throw err;
    }
  },

  verifyRefreshToken: token => {
    try {
      const decodedData = jwt.verify(token, config.jwtTokenKey);
      return decodedData;
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        err.status = 403;
        throw err;
      }
      throw err;
    }
  },

  encryptString: rawString => {
    const encryptedString = CryptoJS.AES.encrypt(rawString, config.cryptoKey).toString();
    return encryptedString;
  },

  decryptString: encryptedString => {
    const decryptedString = CryptoJS.AES.decrypt(encryptedString, config.cryptoKey);
    const rawString = decryptedString.toString(CryptoJS.enc.Utf8);
    return rawString;
  },

  encryptData: data => {
    const dataString = JSON.stringify(data);
    const encryptedData = CryptoJS.AES.encrypt(dataString, config.cryptoKey).toString();
    return encryptedData;
  },

  decryptData: async (data) => {
    const decrypted = CryptoJS.AES.decrypt(data, config.cryptoKey);
    const decryptedData = await JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  },

  encryptRequestData: async (data) => {
    if (config.encryption === "true") {
      const dataString = JSON.stringify(data);
      const encryptedReq = await CryptoJS.AES.encrypt(dataString, config.cryptoKey);
      return { encrypted_res: encryptedReq.toString() };
    }
    return data;
  },

  decryptRequestData: async (data) => {
    try {
      if (config.encryption === "true") {
        const decrypted = await CryptoJS.AES.decrypt(data, config.cryptoKey);
        if (decrypted) {
          const requestInfo = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
          return requestInfo;
        }
        return data;
      }
      return data;
    } catch (err) {
      return err;
    }
  },

  fileUpload: async info => {
    try {
      const fileRootDir = `${config.rootDir}/public/profile`;
      const fileDir = `${fileRootDir}`;
      const tmpobj = tmp.dirSync();
      const tmpDir = tmpobj.name;
      const tempFilePath = `${tmpDir}/${info.name}`;
      if (info.is_base64) {
        const base64 = info.file.data.split(";base64,")[1];
        const fileBuffer = Buffer.from(base64, "base64");
        await fs.writeFileSync(tempFilePath, fileBuffer, "utf8");
      } else {
        await info.file.mv(tempFilePath);
      }
      const fileContent = await fs.readFileSync(tempFilePath);
      if (!await fs.existsSync(fileDir)) {
        await fs.mkdirSync(fileDir, { recursive: true });
      }
      await Promise.all([
        fs.writeFileSync(`${fileDir}${info.name}`, fileContent, "utf8"),
        fs.unlinkSync(tempFilePath)
      ]);
      return 1;
    } catch (error) {
      return 0;
    }
  }

};
