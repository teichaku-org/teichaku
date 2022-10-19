/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  HistoryNFTCreator,
  HistoryNFTCreatorInterface,
} from "../HistoryNFTCreator";

const _abi = [
  {
    inputs: [],
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
        internalType: "int256",
        name: "pollId",
        type: "int256",
      },
    ],
    name: "mintForSprint",
    outputs: [],
    stateMutability: "nonpayable",
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
    ],
    name: "mintForWholePeriod",
    outputs: [],
    stateMutability: "nonpayable",
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
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "setDAOHistoryAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "setDAONftAddress",
    outputs: [],
    stateMutability: "nonpayable",
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
  "0x608060405234801561001057600080fd5b5061002d61002261003260201b60201c565b61003a60201b60201c565b6100fe565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b6110d78061010d6000396000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c80638da5cb5b1161005b5780638da5cb5b146100c45780638e39a050146100e2578063e216cea3146100fe578063f2fde38b1461011a5761007d565b80633daa22ce146100825780633ee89de31461009e578063715018a6146100ba575b600080fd5b61009c60048036038101906100979190610893565b610136565b005b6100b860048036038101906100b3919061091e565b610347565b005b6100c2610460565b005b6100cc610474565b6040516100d991906109d7565b60405180910390f35b6100fc60048036038101906100f79190610a1e565b61049d565b005b61011860048036038101906101139190610a1e565b6104e9565b005b610134600480360381019061012f9190610a1e565b610535565b005b6000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905060008173ffffffffffffffffffffffffffffffffffffffff1663ce7066fc86866040518363ffffffff1660e01b815260040161019a929190610ad3565b60006040518083038186803b1580156101b257600080fd5b505afa1580156101c6573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f820116820180604052508101906101ef9190610eb3565b905060005b815181101561033f578382828151811061021157610210610efc565b5b602002602001015160a0015114801561027357503373ffffffffffffffffffffffffffffffffffffffff1682828151811061024f5761024e610efc565b5b60200260200101516080015173ffffffffffffffffffffffffffffffffffffffff16145b1561032c57600082828151811061028d5761028c610efc565b5b602002602001015190506000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690508073ffffffffffffffffffffffffffffffffffffffff166340d097c3336040518263ffffffff1660e01b81526004016102f791906109d7565b600060405180830381600087803b15801561031157600080fd5b505af1158015610325573d6000803e3d6000fd5b5050505050505b808061033790610f5a565b9150506101f4565b505050505050565b6000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905060008173ffffffffffffffffffffffffffffffffffffffff1663ce7066fc85856040518363ffffffff1660e01b81526004016103ab929190610ad3565b60006040518083038186803b1580156103c357600080fd5b505afa1580156103d7573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f820116820180604052508101906104009190610eb3565b905060005b8151811015610459573373ffffffffffffffffffffffffffffffffffffffff1682828151811061043857610437610efc565b5b6020026020010151608001515050808061045190610f5a565b915050610405565b5050505050565b6104686105b9565b6104726000610637565b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6104a56105b9565b80600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b6104f16105b9565b80600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b61053d6105b9565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614156105ad576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105a490611015565b60405180910390fd5b6105b681610637565b50565b6105c16106fb565b73ffffffffffffffffffffffffffffffffffffffff166105df610474565b73ffffffffffffffffffffffffffffffffffffffff1614610635576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161062c90611081565b60405180910390fd5b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600033905090565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b61076a82610721565b810181811067ffffffffffffffff8211171561078957610788610732565b5b80604052505050565b600061079c610703565b90506107a88282610761565b919050565b600067ffffffffffffffff8211156107c8576107c7610732565b5b6107d182610721565b9050602081019050919050565b82818337600083830152505050565b60006108006107fb846107ad565b610792565b90508281526020810184848401111561081c5761081b61071c565b5b6108278482856107de565b509392505050565b600082601f83011261084457610843610717565b5b81356108548482602086016107ed565b91505092915050565b6000819050919050565b6108708161085d565b811461087b57600080fd5b50565b60008135905061088d81610867565b92915050565b6000806000606084860312156108ac576108ab61070d565b5b600084013567ffffffffffffffff8111156108ca576108c9610712565b5b6108d68682870161082f565b935050602084013567ffffffffffffffff8111156108f7576108f6610712565b5b6109038682870161082f565b92505060406109148682870161087e565b9150509250925092565b600080604083850312156109355761093461070d565b5b600083013567ffffffffffffffff81111561095357610952610712565b5b61095f8582860161082f565b925050602083013567ffffffffffffffff8111156109805761097f610712565b5b61098c8582860161082f565b9150509250929050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006109c182610996565b9050919050565b6109d1816109b6565b82525050565b60006020820190506109ec60008301846109c8565b92915050565b6109fb816109b6565b8114610a0657600080fd5b50565b600081359050610a18816109f2565b92915050565b600060208284031215610a3457610a3361070d565b5b6000610a4284828501610a09565b91505092915050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610a85578082015181840152602081019050610a6a565b83811115610a94576000848401525b50505050565b6000610aa582610a4b565b610aaf8185610a56565b9350610abf818560208601610a67565b610ac881610721565b840191505092915050565b60006040820190508181036000830152610aed8185610a9a565b90508181036020830152610b018184610a9a565b90509392505050565b600067ffffffffffffffff821115610b2557610b24610732565b5b602082029050602081019050919050565b600080fd5b600080fd5b600080fd5b6000610b58610b53846107ad565b610792565b905082815260208101848484011115610b7457610b7361071c565b5b610b7f848285610a67565b509392505050565b600082601f830112610b9c57610b9b610717565b5b8151610bac848260208601610b45565b91505092915050565b6000819050919050565b610bc881610bb5565b8114610bd357600080fd5b50565b600081519050610be581610bbf565b92915050565b600067ffffffffffffffff821115610c0657610c05610732565b5b602082029050602081019050919050565b6000610c2a610c2584610beb565b610792565b90508083825260208201905060208402830185811115610c4d57610c4c610b36565b5b835b81811015610c9457805167ffffffffffffffff811115610c7257610c71610717565b5b808601610c7f8982610b87565b85526020850194505050602081019050610c4f565b5050509392505050565b600082601f830112610cb357610cb2610717565b5b8151610cc3848260208601610c17565b91505092915050565b600081519050610cdb816109f2565b92915050565b600081519050610cf081610867565b92915050565b600060e08284031215610d0c57610d0b610b3b565b5b610d1660e0610792565b9050600082015167ffffffffffffffff811115610d3657610d35610b40565b5b610d4284828501610b87565b6000830152506020610d5684828501610bd6565b602083015250604082015167ffffffffffffffff811115610d7a57610d79610b40565b5b610d8684828501610c9e565b6040830152506060610d9a84828501610bd6565b6060830152506080610dae84828501610ccc565b60808301525060a0610dc284828501610ce1565b60a08301525060c082015167ffffffffffffffff811115610de657610de5610b40565b5b610df284828501610c9e565b60c08301525092915050565b6000610e11610e0c84610b0a565b610792565b90508083825260208201905060208402830185811115610e3457610e33610b36565b5b835b81811015610e7b57805167ffffffffffffffff811115610e5957610e58610717565b5b808601610e668982610cf6565b85526020850194505050602081019050610e36565b5050509392505050565b600082601f830112610e9a57610e99610717565b5b8151610eaa848260208601610dfe565b91505092915050565b600060208284031215610ec957610ec861070d565b5b600082015167ffffffffffffffff811115610ee757610ee6610712565b5b610ef384828501610e85565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610f6582610bb5565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415610f9857610f97610f2b565b5b600182019050919050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b6000610fff602683610a56565b915061100a82610fa3565b604082019050919050565b6000602082019050818103600083015261102e81610ff2565b9050919050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b600061106b602083610a56565b915061107682611035565b602082019050919050565b6000602082019050818103600083015261109a8161105e565b905091905056fea264697066735822122081eebb8c4406b66657505003147835a34862cebbdb36fc57d42e0bf873378c2f64736f6c63430008090033";

type HistoryNFTCreatorConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: HistoryNFTCreatorConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class HistoryNFTCreator__factory extends ContractFactory {
  constructor(...args: HistoryNFTCreatorConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<HistoryNFTCreator> {
    return super.deploy(overrides || {}) as Promise<HistoryNFTCreator>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): HistoryNFTCreator {
    return super.attach(address) as HistoryNFTCreator;
  }
  override connect(signer: Signer): HistoryNFTCreator__factory {
    return super.connect(signer) as HistoryNFTCreator__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): HistoryNFTCreatorInterface {
    return new utils.Interface(_abi) as HistoryNFTCreatorInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): HistoryNFTCreator {
    return new Contract(address, _abi, signerOrProvider) as HistoryNFTCreator;
  }
}
