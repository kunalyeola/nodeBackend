/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
module.exports = [
  {
    anonymous: false,
    inputs: [
		  {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address"
		  },
		  {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address"
		  },
		  {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool"
		  }
    ],
    name: "ApprovalForAll",
    type: "event"
	  },
	  {
    anonymous: false,
    inputs: [
		  {
        indexed: false,
        internalType: "address",
        name: "receiver",
        type: "address"
		  },
		  {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256"
		  },
		  {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
		  }
    ],
    name: "AssetMinted",
    type: "event"
	  },
	  {
    anonymous: false,
    inputs: [
		  {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8"
		  }
    ],
    name: "Initialized",
    type: "event"
	  },
	  {
    anonymous: false,
    inputs: [
		  {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address"
		  },
		  {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address"
		  }
    ],
    name: "OwnershipTransferred",
    type: "event"
	  },
	  {
    anonymous: false,
    inputs: [
		  {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address"
		  },
		  {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address"
		  },
		  {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address"
		  },
		  {
        indexed: false,
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]"
		  },
		  {
        indexed: false,
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]"
		  }
    ],
    name: "TransferBatch",
    type: "event"
	  },
	  {
    anonymous: false,
    inputs: [
		  {
        indexed: false,
        internalType: "address",
        name: "from",
        type: "address"
		  },
		  {
        indexed: false,
        internalType: "address",
        name: "to",
        type: "address"
		  },
		  {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
		  },
		  {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256"
		  }
    ],
    name: "TransferNFT",
    type: "event"
	  },
	  {
    anonymous: false,
    inputs: [
		  {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address"
		  },
		  {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address"
		  },
		  {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address"
		  },
		  {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256"
		  },
		  {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256"
		  }
    ],
    name: "TransferSingle",
    type: "event"
	  },
	  {
    anonymous: false,
    inputs: [
		  {
        indexed: false,
        internalType: "string",
        name: "value",
        type: "string"
		  },
		  {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256"
		  }
    ],
    name: "URI",
    type: "event"
	  },
	  {
    anonymous: false,
    inputs: [
		  {
        indexed: false,
        internalType: "address",
        name: "from",
        type: "address"
		  },
		  {
        indexed: false,
        internalType: "address[]",
        name: "to",
        type: "address[]"
		  },
		  {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
		  },
		  {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256"
		  }
    ],
    name: "airDropedNFT",
    type: "event"
	  },
	  {
    anonymous: false,
    inputs: [
		  {
        indexed: false,
        internalType: "address",
        name: "from",
        type: "address"
		  },
		  {
        components: [
			  {
            internalType: "address",
            name: "_address",
            type: "address"
			  },
			  {
            internalType: "uint256",
            name: "_tokenId",
            type: "uint256"
			  },
			  {
            internalType: "uint256",
            name: "_amount",
            type: "uint256"
			  }
        ],
        indexed: false,
        internalType: "struct SayBloweV2.AirDropDetails[]",
        name: "airDropDetails",
        type: "tuple[]"
		  }
    ],
    name: "airDropedNFT1",
    type: "event"
	  },
	  {
    anonymous: false,
    inputs: [
		  {
        indexed: false,
        internalType: "address",
        name: "from",
        type: "address"
		  },
		  {
        indexed: false,
        internalType: "address",
        name: "to",
        type: "address"
		  },
		  {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
		  },
		  {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256"
		  }
    ],
    name: "purchasedNFT",
    type: "event"
	  },
	  {
    inputs: [
		  {
        internalType: "address",
        name: "account",
        type: "address"
		  },
		  {
        internalType: "uint256",
        name: "id",
        type: "uint256"
		  }
    ],
    name: "balanceOf",
    outputs: [
		  {
        internalType: "uint256",
        name: "",
        type: "uint256"
		  }
    ],
    stateMutability: "view",
    type: "function",
    constant: true
	  },
	  {
    inputs: [
		  {
        internalType: "address[]",
        name: "accounts",
        type: "address[]"
		  },
		  {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]"
		  }
    ],
    name: "balanceOfBatch",
    outputs: [
		  {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]"
		  }
    ],
    stateMutability: "view",
    type: "function",
    constant: true
	  },
	  {
    inputs: [],
    name: "dataFeedcontractAvaxUsd",
    outputs: [
		  {
        internalType: "address",
        name: "",
        type: "address"
		  }
    ],
    stateMutability: "view",
    type: "function",
    constant: true
	  },
	  {
    inputs: [],
    name: "dataFeedcontractEthUsd",
    outputs: [
		  {
        internalType: "address",
        name: "",
        type: "address"
		  }
    ],
    stateMutability: "view",
    type: "function",
    constant: true
	  },
	  {
    inputs: [],
    name: "getLatestPriceAvaxUsd",
    outputs: [
		  {
        internalType: "int256",
        name: "",
        type: "int256"
		  }
    ],
    stateMutability: "view",
    type: "function",
    constant: true
	  },
	  {
    inputs: [],
    name: "getLatestPriceEthUsd",
    outputs: [
		  {
        internalType: "int256",
        name: "",
        type: "int256"
		  }
    ],
    stateMutability: "view",
    type: "function",
    constant: true
	  },
	  {
    inputs: [
		  {
        internalType: "address",
        name: "account",
        type: "address"
		  },
		  {
        internalType: "address",
        name: "operator",
        type: "address"
		  }
    ],
    name: "isApprovedForAll",
    outputs: [
		  {
        internalType: "bool",
        name: "",
        type: "bool"
		  }
    ],
    stateMutability: "view",
    type: "function",
    constant: true
	  },
	  {
    inputs: [],
    name: "name",
    outputs: [
		  {
        internalType: "string",
        name: "",
        type: "string"
		  }
    ],
    stateMutability: "view",
    type: "function",
    constant: true
	  },
	  {
    inputs: [],
    name: "owner",
    outputs: [
		  {
        internalType: "address",
        name: "",
        type: "address"
		  }
    ],
    stateMutability: "view",
    type: "function",
    constant: true
	  },
	  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
	  },
	  {
    inputs: [
		  {
        internalType: "address",
        name: "from",
        type: "address"
		  },
		  {
        internalType: "address",
        name: "to",
        type: "address"
		  },
		  {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]"
		  },
		  {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]"
		  },
		  {
        internalType: "bytes",
        name: "data",
        type: "bytes"
		  }
    ],
    name: "safeBatchTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
	  },
	  {
    inputs: [
		  {
        internalType: "address",
        name: "from",
        type: "address"
		  },
		  {
        internalType: "address",
        name: "to",
        type: "address"
		  },
		  {
        internalType: "uint256",
        name: "id",
        type: "uint256"
		  },
		  {
        internalType: "uint256",
        name: "amount",
        type: "uint256"
		  },
		  {
        internalType: "bytes",
        name: "data",
        type: "bytes"
		  }
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
	  },
	  {
    inputs: [
		  {
        internalType: "address",
        name: "operator",
        type: "address"
		  },
		  {
        internalType: "bool",
        name: "approved",
        type: "bool"
		  }
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
	  },
	  {
    inputs: [
		  {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4"
		  }
    ],
    name: "supportsInterface",
    outputs: [
		  {
        internalType: "bool",
        name: "",
        type: "bool"
		  }
    ],
    stateMutability: "view",
    type: "function",
    constant: true
	  },
	  {
    inputs: [],
    name: "symbol",
    outputs: [
		  {
        internalType: "string",
        name: "",
        type: "string"
		  }
    ],
    stateMutability: "view",
    type: "function",
    constant: true
	  },
	  {
    inputs: [],
    name: "tokenCounter",
    outputs: [
		  {
        internalType: "uint256",
        name: "",
        type: "uint256"
		  }
    ],
    stateMutability: "view",
    type: "function",
    constant: true
	  },
	  {
    inputs: [
		  {
        internalType: "address",
        name: "newOwner",
        type: "address"
		  }
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
	  },
	  {
    inputs: [
		  {
        internalType: "address",
        name: "_contract1",
        type: "address"
		  },
		  {
        internalType: "address",
        name: "_contract2",
        type: "address"
		  }
    ],
    name: "updateDataFeedContract",
    outputs: [
		  {
        internalType: "bool",
        name: "",
        type: "bool"
		  }
    ],
    stateMutability: "nonpayable",
    type: "function"
	  },
	  {
    inputs: [
		  {
        internalType: "string",
        name: "before_",
        type: "string"
		  },
		  {
        internalType: "string",
        name: "after_",
        type: "string"
		  }
    ],
    name: "updateTokenUri",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
	  },
	  {
    inputs: [
		  {
        internalType: "uint256",
        name: "_supply",
        type: "uint256"
		  }
    ],
    name: "mintNft",
    outputs: [
		  {
        internalType: "uint256",
        name: "",
        type: "uint256"
		  }
    ],
    stateMutability: "nonpayable",
    type: "function"
	  },
	  {
    inputs: [
		  {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256"
		  },
		  {
        internalType: "uint256",
        name: "_supply",
        type: "uint256"
		  }
    ],
    name: "topupNFT",
    outputs: [
		  {
        internalType: "bool",
        name: "",
        type: "bool"
		  }
    ],
    stateMutability: "nonpayable",
    type: "function"
	  },
	  {
    inputs: [
		  {
        internalType: "address",
        name: "_to",
        type: "address"
		  },
		  {
        components: [
			  {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256"
			  },
			  {
            internalType: "uint256",
            name: "noOfTokens",
            type: "uint256"
			  }
        ],
        internalType: "struct SayBloweV2.tokenDetails",
        name: "tokens",
        type: "tuple"
		  }
    ],
    name: "transferNFT",
    outputs: [
		  {
        internalType: "bool",
        name: "",
        type: "bool"
		  }
    ],
    stateMutability: "nonpayable",
    type: "function"
	  },
	  {
    inputs: [
		  {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
		  }
    ],
    name: "uri",
    outputs: [
		  {
        internalType: "string",
        name: "",
        type: "string"
		  }
    ],
    stateMutability: "view",
    type: "function",
    constant: true
	  },
	  {
    inputs: [],
    name: "getPriceVarient",
    outputs: [
		  {
        internalType: "int256[2]",
        name: "",
        type: "int256[2]"
		  }
    ],
    stateMutability: "view",
    type: "function",
    constant: true
	  },
	  {
    inputs: [
		  {
        internalType: "address[]",
        name: "_addresses",
        type: "address[]"
		  },
		  {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256"
		  },
		  {
        internalType: "uint256",
        name: "_amount",
        type: "uint256"
		  }
    ],
    name: "airDrop",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
	  },
	  {
    inputs: [
		  {
        components: [
			  {
            internalType: "address",
            name: "_address",
            type: "address"
			  },
			  {
            internalType: "uint256",
            name: "_tokenId",
            type: "uint256"
			  },
			  {
            internalType: "uint256",
            name: "_amount",
            type: "uint256"
			  }
        ],
        internalType: "struct SayBloweV2.AirDropDetails[]",
        name: "airDropDetails",
        type: "tuple[]"
		  }
    ],
    name: "airDrop2",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
	  }
];
