/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export type AssessmentStruct = {
  voter: PromiseOrValue<string>;
  contributor: PromiseOrValue<string>;
  points: PromiseOrValue<BigNumberish>[];
  comment: PromiseOrValue<string>;
  perspectiveId: PromiseOrValue<BigNumberish>;
  pollId: PromiseOrValue<BigNumberish>;
};

export type AssessmentStructOutput = [
  string,
  string,
  BigNumber[],
  string,
  BigNumber,
  BigNumber
] & {
  voter: string;
  contributor: string;
  points: BigNumber[];
  comment: string;
  perspectiveId: BigNumber;
  pollId: BigNumber;
};

export type DAOHistoryItemStruct = {
  contributionText: PromiseOrValue<string>;
  reward: PromiseOrValue<BigNumberish>;
  roles: PromiseOrValue<string>[];
  timestamp: PromiseOrValue<BigNumberish>;
  contributor: PromiseOrValue<string>;
  pollId: PromiseOrValue<BigNumberish>;
  evidences: PromiseOrValue<string>[];
};

export type DAOHistoryItemStructOutput = [
  string,
  BigNumber,
  string[],
  BigNumber,
  string,
  BigNumber,
  string[]
] & {
  contributionText: string;
  reward: BigNumber;
  roles: string[];
  timestamp: BigNumber;
  contributor: string;
  pollId: BigNumber;
  evidences: string[];
};

export type DAOInfoStruct = {
  name: PromiseOrValue<string>;
  description: PromiseOrValue<string>;
  website: PromiseOrValue<string>;
  logo: PromiseOrValue<string>;
  projects: PromiseOrValue<string>[];
};

export type DAOInfoStructOutput = [string, string, string, string, string[]] & {
  name: string;
  description: string;
  website: string;
  logo: string;
  projects: string[];
};

export interface DAOHistoryInterface extends utils.Interface {
  functions: {
    "ADD_HISTORY_ROLE()": FunctionFragment;
    "DEFAULT_ADMIN_ROLE()": FunctionFragment;
    "addAssessment(string,string,(address,address,uint256[],string,uint256,int256)[])": FunctionFragment;
    "addDao(string,string,string,string,string,string)": FunctionFragment;
    "addDaoHistory(string,string,(string,uint256,string[],uint256,address,int256,string[]))": FunctionFragment;
    "assessments(string,string,uint256)": FunctionFragment;
    "daoInfo(string)": FunctionFragment;
    "getDaoAssessments(string,string)": FunctionFragment;
    "getDaoHistory(string,string)": FunctionFragment;
    "getDaoInfo(string)": FunctionFragment;
    "getRoleAdmin(bytes32)": FunctionFragment;
    "grantRole(bytes32,address)": FunctionFragment;
    "hasRole(bytes32,address)": FunctionFragment;
    "histories(string,string,uint256)": FunctionFragment;
    "owner()": FunctionFragment;
    "pollAddress(string,string)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "renounceRole(bytes32,address)": FunctionFragment;
    "revokeRole(bytes32,address)": FunctionFragment;
    "setupAddHistoryRole(address)": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "ADD_HISTORY_ROLE"
      | "DEFAULT_ADMIN_ROLE"
      | "addAssessment"
      | "addDao"
      | "addDaoHistory"
      | "assessments"
      | "daoInfo"
      | "getDaoAssessments"
      | "getDaoHistory"
      | "getDaoInfo"
      | "getRoleAdmin"
      | "grantRole"
      | "hasRole"
      | "histories"
      | "owner"
      | "pollAddress"
      | "renounceOwnership"
      | "renounceRole"
      | "revokeRole"
      | "setupAddHistoryRole"
      | "supportsInterface"
      | "transferOwnership"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "ADD_HISTORY_ROLE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "DEFAULT_ADMIN_ROLE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "addAssessment",
    values: [PromiseOrValue<string>, PromiseOrValue<string>, AssessmentStruct[]]
  ): string;
  encodeFunctionData(
    functionFragment: "addDao",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "addDaoHistory",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      DAOHistoryItemStruct
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "assessments",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "daoInfo",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getDaoAssessments",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getDaoHistory",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getDaoInfo",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getRoleAdmin",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "grantRole",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "hasRole",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "histories",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "pollAddress",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "renounceRole",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "revokeRole",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "setupAddHistoryRole",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(
    functionFragment: "ADD_HISTORY_ROLE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "DEFAULT_ADMIN_ROLE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "addAssessment",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "addDao", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "addDaoHistory",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "assessments",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "daoInfo", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getDaoAssessments",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getDaoHistory",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getDaoInfo", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getRoleAdmin",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "grantRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "hasRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "histories", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "pollAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceRole",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "revokeRole", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setupAddHistoryRole",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;

  events: {
    "OwnershipTransferred(address,address)": EventFragment;
    "RoleAdminChanged(bytes32,bytes32,bytes32)": EventFragment;
    "RoleGranted(bytes32,address,address)": EventFragment;
    "RoleRevoked(bytes32,address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleAdminChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleGranted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleRevoked"): EventFragment;
}

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface RoleAdminChangedEventObject {
  role: string;
  previousAdminRole: string;
  newAdminRole: string;
}
export type RoleAdminChangedEvent = TypedEvent<
  [string, string, string],
  RoleAdminChangedEventObject
>;

export type RoleAdminChangedEventFilter =
  TypedEventFilter<RoleAdminChangedEvent>;

export interface RoleGrantedEventObject {
  role: string;
  account: string;
  sender: string;
}
export type RoleGrantedEvent = TypedEvent<
  [string, string, string],
  RoleGrantedEventObject
>;

export type RoleGrantedEventFilter = TypedEventFilter<RoleGrantedEvent>;

export interface RoleRevokedEventObject {
  role: string;
  account: string;
  sender: string;
}
export type RoleRevokedEvent = TypedEvent<
  [string, string, string],
  RoleRevokedEventObject
>;

export type RoleRevokedEventFilter = TypedEventFilter<RoleRevokedEvent>;

export interface DAOHistory extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: DAOHistoryInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    ADD_HISTORY_ROLE(overrides?: CallOverrides): Promise<[string]>;

    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<[string]>;

    addAssessment(
      daoId: PromiseOrValue<string>,
      projectId: PromiseOrValue<string>,
      _assessments: AssessmentStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    addDao(
      daoId: PromiseOrValue<string>,
      projectId: PromiseOrValue<string>,
      name: PromiseOrValue<string>,
      description: PromiseOrValue<string>,
      website: PromiseOrValue<string>,
      logo: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    addDaoHistory(
      daoId: PromiseOrValue<string>,
      projectId: PromiseOrValue<string>,
      daoHistoryItem: DAOHistoryItemStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    assessments(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [string, string, string, BigNumber, BigNumber] & {
        voter: string;
        contributor: string;
        comment: string;
        perspectiveId: BigNumber;
        pollId: BigNumber;
      }
    >;

    daoInfo(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [string, string, string, string] & {
        name: string;
        description: string;
        website: string;
        logo: string;
      }
    >;

    getDaoAssessments(
      daoId: PromiseOrValue<string>,
      projectId: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[AssessmentStructOutput[]]>;

    getDaoHistory(
      daoId: PromiseOrValue<string>,
      projectId: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[DAOHistoryItemStructOutput[]]>;

    getDaoInfo(
      daoId: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[DAOInfoStructOutput]>;

    getRoleAdmin(
      role: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    grantRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    hasRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    histories(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber, BigNumber, string, BigNumber] & {
        contributionText: string;
        reward: BigNumber;
        timestamp: BigNumber;
        contributor: string;
        pollId: BigNumber;
      }
    >;

    owner(overrides?: CallOverrides): Promise<[string]>;

    pollAddress(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    renounceRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    revokeRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setupAddHistoryRole(
      contractAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  ADD_HISTORY_ROLE(overrides?: CallOverrides): Promise<string>;

  DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>;

  addAssessment(
    daoId: PromiseOrValue<string>,
    projectId: PromiseOrValue<string>,
    _assessments: AssessmentStruct[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  addDao(
    daoId: PromiseOrValue<string>,
    projectId: PromiseOrValue<string>,
    name: PromiseOrValue<string>,
    description: PromiseOrValue<string>,
    website: PromiseOrValue<string>,
    logo: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  addDaoHistory(
    daoId: PromiseOrValue<string>,
    projectId: PromiseOrValue<string>,
    daoHistoryItem: DAOHistoryItemStruct,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  assessments(
    arg0: PromiseOrValue<string>,
    arg1: PromiseOrValue<string>,
    arg2: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<
    [string, string, string, BigNumber, BigNumber] & {
      voter: string;
      contributor: string;
      comment: string;
      perspectiveId: BigNumber;
      pollId: BigNumber;
    }
  >;

  daoInfo(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<
    [string, string, string, string] & {
      name: string;
      description: string;
      website: string;
      logo: string;
    }
  >;

  getDaoAssessments(
    daoId: PromiseOrValue<string>,
    projectId: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<AssessmentStructOutput[]>;

  getDaoHistory(
    daoId: PromiseOrValue<string>,
    projectId: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<DAOHistoryItemStructOutput[]>;

  getDaoInfo(
    daoId: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<DAOInfoStructOutput>;

  getRoleAdmin(
    role: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<string>;

  grantRole(
    role: PromiseOrValue<BytesLike>,
    account: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  hasRole(
    role: PromiseOrValue<BytesLike>,
    account: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  histories(
    arg0: PromiseOrValue<string>,
    arg1: PromiseOrValue<string>,
    arg2: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<
    [string, BigNumber, BigNumber, string, BigNumber] & {
      contributionText: string;
      reward: BigNumber;
      timestamp: BigNumber;
      contributor: string;
      pollId: BigNumber;
    }
  >;

  owner(overrides?: CallOverrides): Promise<string>;

  pollAddress(
    arg0: PromiseOrValue<string>,
    arg1: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  renounceRole(
    role: PromiseOrValue<BytesLike>,
    account: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  revokeRole(
    role: PromiseOrValue<BytesLike>,
    account: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setupAddHistoryRole(
    contractAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  supportsInterface(
    interfaceId: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  transferOwnership(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    ADD_HISTORY_ROLE(overrides?: CallOverrides): Promise<string>;

    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>;

    addAssessment(
      daoId: PromiseOrValue<string>,
      projectId: PromiseOrValue<string>,
      _assessments: AssessmentStruct[],
      overrides?: CallOverrides
    ): Promise<void>;

    addDao(
      daoId: PromiseOrValue<string>,
      projectId: PromiseOrValue<string>,
      name: PromiseOrValue<string>,
      description: PromiseOrValue<string>,
      website: PromiseOrValue<string>,
      logo: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    addDaoHistory(
      daoId: PromiseOrValue<string>,
      projectId: PromiseOrValue<string>,
      daoHistoryItem: DAOHistoryItemStruct,
      overrides?: CallOverrides
    ): Promise<void>;

    assessments(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [string, string, string, BigNumber, BigNumber] & {
        voter: string;
        contributor: string;
        comment: string;
        perspectiveId: BigNumber;
        pollId: BigNumber;
      }
    >;

    daoInfo(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [string, string, string, string] & {
        name: string;
        description: string;
        website: string;
        logo: string;
      }
    >;

    getDaoAssessments(
      daoId: PromiseOrValue<string>,
      projectId: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<AssessmentStructOutput[]>;

    getDaoHistory(
      daoId: PromiseOrValue<string>,
      projectId: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<DAOHistoryItemStructOutput[]>;

    getDaoInfo(
      daoId: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<DAOInfoStructOutput>;

    getRoleAdmin(
      role: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    grantRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    hasRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    histories(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber, BigNumber, string, BigNumber] & {
        contributionText: string;
        reward: BigNumber;
        timestamp: BigNumber;
        contributor: string;
        pollId: BigNumber;
      }
    >;

    owner(overrides?: CallOverrides): Promise<string>;

    pollAddress(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    renounceRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    revokeRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    setupAddHistoryRole(
      contractAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "OwnershipTransferred(address,address)"(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;

    "RoleAdminChanged(bytes32,bytes32,bytes32)"(
      role?: PromiseOrValue<BytesLike> | null,
      previousAdminRole?: PromiseOrValue<BytesLike> | null,
      newAdminRole?: PromiseOrValue<BytesLike> | null
    ): RoleAdminChangedEventFilter;
    RoleAdminChanged(
      role?: PromiseOrValue<BytesLike> | null,
      previousAdminRole?: PromiseOrValue<BytesLike> | null,
      newAdminRole?: PromiseOrValue<BytesLike> | null
    ): RoleAdminChangedEventFilter;

    "RoleGranted(bytes32,address,address)"(
      role?: PromiseOrValue<BytesLike> | null,
      account?: PromiseOrValue<string> | null,
      sender?: PromiseOrValue<string> | null
    ): RoleGrantedEventFilter;
    RoleGranted(
      role?: PromiseOrValue<BytesLike> | null,
      account?: PromiseOrValue<string> | null,
      sender?: PromiseOrValue<string> | null
    ): RoleGrantedEventFilter;

    "RoleRevoked(bytes32,address,address)"(
      role?: PromiseOrValue<BytesLike> | null,
      account?: PromiseOrValue<string> | null,
      sender?: PromiseOrValue<string> | null
    ): RoleRevokedEventFilter;
    RoleRevoked(
      role?: PromiseOrValue<BytesLike> | null,
      account?: PromiseOrValue<string> | null,
      sender?: PromiseOrValue<string> | null
    ): RoleRevokedEventFilter;
  };

  estimateGas: {
    ADD_HISTORY_ROLE(overrides?: CallOverrides): Promise<BigNumber>;

    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<BigNumber>;

    addAssessment(
      daoId: PromiseOrValue<string>,
      projectId: PromiseOrValue<string>,
      _assessments: AssessmentStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    addDao(
      daoId: PromiseOrValue<string>,
      projectId: PromiseOrValue<string>,
      name: PromiseOrValue<string>,
      description: PromiseOrValue<string>,
      website: PromiseOrValue<string>,
      logo: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    addDaoHistory(
      daoId: PromiseOrValue<string>,
      projectId: PromiseOrValue<string>,
      daoHistoryItem: DAOHistoryItemStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    assessments(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    daoInfo(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getDaoAssessments(
      daoId: PromiseOrValue<string>,
      projectId: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getDaoHistory(
      daoId: PromiseOrValue<string>,
      projectId: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getDaoInfo(
      daoId: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getRoleAdmin(
      role: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    grantRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    hasRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    histories(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    pollAddress(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    renounceRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    revokeRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setupAddHistoryRole(
      contractAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    ADD_HISTORY_ROLE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    DEFAULT_ADMIN_ROLE(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    addAssessment(
      daoId: PromiseOrValue<string>,
      projectId: PromiseOrValue<string>,
      _assessments: AssessmentStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    addDao(
      daoId: PromiseOrValue<string>,
      projectId: PromiseOrValue<string>,
      name: PromiseOrValue<string>,
      description: PromiseOrValue<string>,
      website: PromiseOrValue<string>,
      logo: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    addDaoHistory(
      daoId: PromiseOrValue<string>,
      projectId: PromiseOrValue<string>,
      daoHistoryItem: DAOHistoryItemStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    assessments(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    daoInfo(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getDaoAssessments(
      daoId: PromiseOrValue<string>,
      projectId: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getDaoHistory(
      daoId: PromiseOrValue<string>,
      projectId: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getDaoInfo(
      daoId: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getRoleAdmin(
      role: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    grantRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    hasRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    histories(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    pollAddress(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    renounceRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    revokeRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setupAddHistoryRole(
      contractAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
