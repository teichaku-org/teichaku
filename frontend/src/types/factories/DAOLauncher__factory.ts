/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type { DAOLauncher, DAOLauncherInterface } from "../DAOLauncher";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_daoHistoryAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "daoId",
        type: "string",
      },
      {
        internalType: "string",
        name: "projectId",
        type: "string",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "string",
        name: "website",
        type: "string",
      },
      {
        internalType: "string",
        name: "logo",
        type: "string",
      },
      {
        internalType: "address",
        name: "_tokenAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_contributorToken",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_voterToken",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_votingDuration",
        type: "uint256",
      },
    ],
    name: "createDao",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50604051610e97380380610e9783398101604081905261002f916100af565b6100383361005d565b600280546001600160a01b0319166001600160a01b03929092169190911790556100df565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6000602082840312156100c157600080fd5b81516001600160a01b03811681146100d857600080fd5b9392505050565b610da9806100ee6000396000f3fe608060405234801561001057600080fd5b50600436106100a95760003560e01c806372f0d5061161007157806372f0d506146101375780638da5cb5b1461016257806391d1485414610173578063a217fddf14610186578063d547741f1461018e578063f2fde38b146101a157600080fd5b806301ffc9a7146100ae578063248a9ca3146100d65780632f2ff15d1461010757806336568abe1461011c578063715018a61461012f575b600080fd5b6100c16100bc3660046108f8565b6101b4565b60405190151581526020015b60405180910390f35b6100f96100e4366004610922565b60009081526020819052604090206001015490565b6040519081526020016100cd565b61011a610115366004610960565b6101eb565b005b61011a61012a366004610960565b610215565b61011a610298565b61014a610145366004610a33565b6102ac565b6040516001600160a01b0390911681526020016100cd565b6001546001600160a01b031661014a565b6100c1610181366004610960565b61048b565b6100f9600081565b61011a61019c366004610960565b6104b4565b61011a6101af366004610b59565b6104d9565b60006001600160e01b03198216637965db0b60e01b14806101e557506301ffc9a760e01b6001600160e01b03198316145b92915050565b60008281526020819052604090206001015461020681610552565b610210838361055c565b505050565b6001600160a01b038116331461028a5760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b60648201526084015b60405180910390fd5b61029482826105e0565b5050565b6102a0610645565b6102aa600061069f565b565b600080600260009054906101000a90046001600160a01b031690506000816001600160a01b0316633afaa4ab8e8e8e8e8e8e6040518763ffffffff1660e01b81526004016102ff96959493929190610bd2565b602060405180830381600087803b15801561031957600080fd5b505af115801561032d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103519190610c54565b60405163bc42d60760e01b8152600481018890526024810187905290915081906001600160a01b0382169063bc42d60790604401600060405180830381600087803b15801561039f57600080fd5b505af11580156103b3573d6000803e3d6000fd5b50506040516363d7f4f960e11b81526001600160a01b038b81166004830152600060248301528416925063c7afe9f29150604401600060405180830381600087803b15801561040157600080fd5b505af1158015610415573d6000803e3d6000fd5b5050604051639f4d2dcf60e01b815260006004820152602481018890526001600160a01b0384169250639f4d2dcf9150604401600060405180830381600087803b15801561046257600080fd5b505af1158015610476573d6000803e3d6000fd5b505050505050509a9950505050505050505050565b6000918252602082815260408084206001600160a01b0393909316845291905290205460ff1690565b6000828152602081905260409020600101546104cf81610552565b61021083836105e0565b6104e1610645565b6001600160a01b0381166105465760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610281565b61054f8161069f565b50565b61054f81336106f1565b610566828261048b565b610294576000828152602081815260408083206001600160a01b03851684529091529020805460ff1916600117905561059c3390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b6105ea828261048b565b15610294576000828152602081815260408083206001600160a01b0385168085529252808320805460ff1916905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b6001546001600160a01b031633146102aa5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610281565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6106fb828261048b565b61029457610713816001600160a01b03166014610755565b61071e836020610755565b60405160200161072f929190610c71565b60408051601f198184030181529082905262461bcd60e51b825261028191600401610ce6565b60606000610764836002610d0f565b61076f906002610d2e565b67ffffffffffffffff81111561078757610787610990565b6040519080825280601f01601f1916602001820160405280156107b1576020820181803683370190505b509050600360fc1b816000815181106107cc576107cc610d46565b60200101906001600160f81b031916908160001a905350600f60fb1b816001815181106107fb576107fb610d46565b60200101906001600160f81b031916908160001a905350600061081f846002610d0f565b61082a906001610d2e565b90505b60018111156108a2576f181899199a1a9b1b9c1cb0b131b232b360811b85600f166010811061085e5761085e610d46565b1a60f81b82828151811061087457610874610d46565b60200101906001600160f81b031916908160001a90535060049490941c9361089b81610d5c565b905061082d565b5083156108f15760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152606401610281565b9392505050565b60006020828403121561090a57600080fd5b81356001600160e01b0319811681146108f157600080fd5b60006020828403121561093457600080fd5b5035919050565b6001600160a01b038116811461054f57600080fd5b803561095b8161093b565b919050565b6000806040838503121561097357600080fd5b8235915060208301356109858161093b565b809150509250929050565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126109b757600080fd5b813567ffffffffffffffff808211156109d2576109d2610990565b604051601f8301601f19908116603f011681019082821181831017156109fa576109fa610990565b81604052838152866020858801011115610a1357600080fd5b836020870160208301376000602085830101528094505050505092915050565b6000806000806000806000806000806101408b8d031215610a5357600080fd5b8a3567ffffffffffffffff80821115610a6b57600080fd5b610a778e838f016109a6565b9b5060208d0135915080821115610a8d57600080fd5b610a998e838f016109a6565b9a5060408d0135915080821115610aaf57600080fd5b610abb8e838f016109a6565b995060608d0135915080821115610ad157600080fd5b610add8e838f016109a6565b985060808d0135915080821115610af357600080fd5b610aff8e838f016109a6565b975060a08d0135915080821115610b1557600080fd5b50610b228d828e016109a6565b955050610b3160c08c01610950565b935060e08b013592506101008b013591506101208b013590509295989b9194979a5092959850565b600060208284031215610b6b57600080fd5b81356108f18161093b565b60005b83811015610b91578181015183820152602001610b79565b83811115610ba0576000848401525b50505050565b60008151808452610bbe816020860160208601610b76565b601f01601f19169290920160200192915050565b60c081526000610be560c0830189610ba6565b8281036020840152610bf78189610ba6565b90508281036040840152610c0b8188610ba6565b90508281036060840152610c1f8187610ba6565b90508281036080840152610c338186610ba6565b905082810360a0840152610c478185610ba6565b9998505050505050505050565b600060208284031215610c6657600080fd5b81516108f18161093b565b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000815260008351610ca9816017850160208801610b76565b7001034b99036b4b9b9b4b733903937b6329607d1b6017918401918201528351610cda816028840160208801610b76565b01602801949350505050565b6020815260006108f16020830184610ba6565b634e487b7160e01b600052601160045260246000fd5b6000816000190483118215151615610d2957610d29610cf9565b500290565b60008219821115610d4157610d41610cf9565b500190565b634e487b7160e01b600052603260045260246000fd5b600081610d6b57610d6b610cf9565b50600019019056fea26469706673582212201a50600c3bfe093ffac74f895c57182f310241e80a58dfd71a735c468f745d1064736f6c63430008090033";

type DAOLauncherConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: DAOLauncherConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class DAOLauncher__factory extends ContractFactory {
  constructor(...args: DAOLauncherConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _daoHistoryAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<DAOLauncher> {
    return super.deploy(
      _daoHistoryAddress,
      overrides || {}
    ) as Promise<DAOLauncher>;
  }
  override getDeployTransaction(
    _daoHistoryAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_daoHistoryAddress, overrides || {});
  }
  override attach(address: string): DAOLauncher {
    return super.attach(address) as DAOLauncher;
  }
  override connect(signer: Signer): DAOLauncher__factory {
    return super.connect(signer) as DAOLauncher__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DAOLauncherInterface {
    return new utils.Interface(_abi) as DAOLauncherInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DAOLauncher {
    return new Contract(address, _abi, signerOrProvider) as DAOLauncher;
  }
}
