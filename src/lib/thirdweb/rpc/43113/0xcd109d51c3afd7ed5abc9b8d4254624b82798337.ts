import {
  prepareEvent,
  prepareContractCall,
  readContract,
  type BaseTransactionOptions,
  type AbiParameterToPrimitiveType,
} from "thirdweb";

/**
 * Contract events
 */

/**
 * Represents the filters for the "Approval" event.
 */
export type ApprovalEventFilters = Partial<{
  owner: AbiParameterToPrimitiveType<{
    indexed: true;
    internalType: "address";
    name: "owner";
    type: "address";
  }>;
  spender: AbiParameterToPrimitiveType<{
    indexed: true;
    internalType: "address";
    name: "spender";
    type: "address";
  }>;
}>;

/**
 * Creates an event object for the Approval event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { approvalEvent } from "TODO";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  approvalEvent({
 *  owner: ...,
 *  spender: ...,
 * })
 * ],
 * });
 * ```
 */
export function approvalEvent(filters: ApprovalEventFilters = {}) {
  return prepareEvent({
    signature:
      "event Approval(address indexed owner, address indexed spender, uint256 value)",
    filters,
  });
}

/**
 * Creates an event object for the EIP712DomainChanged event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { eIP712DomainChangedEvent } from "TODO";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  eIP712DomainChangedEvent()
 * ],
 * });
 * ```
 */
export function eIP712DomainChangedEvent() {
  return prepareEvent({
    signature: "event EIP712DomainChanged()",
  });
}

/**
 * Represents the filters for the "OwnershipTransferred" event.
 */
export type OwnershipTransferredEventFilters = Partial<{
  previousOwner: AbiParameterToPrimitiveType<{
    indexed: true;
    internalType: "address";
    name: "previousOwner";
    type: "address";
  }>;
  newOwner: AbiParameterToPrimitiveType<{
    indexed: true;
    internalType: "address";
    name: "newOwner";
    type: "address";
  }>;
}>;

/**
 * Creates an event object for the OwnershipTransferred event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { ownershipTransferredEvent } from "TODO";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  ownershipTransferredEvent({
 *  previousOwner: ...,
 *  newOwner: ...,
 * })
 * ],
 * });
 * ```
 */
export function ownershipTransferredEvent(
  filters: OwnershipTransferredEventFilters = {}
) {
  return prepareEvent({
    signature:
      "event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)",
    filters,
  });
}

/**
 * Represents the filters for the "Transfer" event.
 */
export type TransferEventFilters = Partial<{
  from: AbiParameterToPrimitiveType<{
    indexed: true;
    internalType: "address";
    name: "from";
    type: "address";
  }>;
  to: AbiParameterToPrimitiveType<{
    indexed: true;
    internalType: "address";
    name: "to";
    type: "address";
  }>;
}>;

/**
 * Creates an event object for the Transfer event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { transferEvent } from "TODO";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  transferEvent({
 *  from: ...,
 *  to: ...,
 * })
 * ],
 * });
 * ```
 */
export function transferEvent(filters: TransferEventFilters = {}) {
  return prepareEvent({
    signature:
      "event Transfer(address indexed from, address indexed to, uint256 value)",
    filters,
  });
}

/**
 * Contract read functions
 */

/**
 * Calls the "DOMAIN_SEPARATOR" function on the contract.
 * @param options - The options for the DOMAIN_SEPARATOR function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { DOMAIN_SEPARATOR } from "TODO";
 *
 * const result = await DOMAIN_SEPARATOR();
 *
 * ```
 */
export async function DOMAIN_SEPARATOR(options: BaseTransactionOptions) {
  return readContract({
    contract: options.contract,
    method: [
      "0x3644e515",
      [],
      [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
    ],
    params: [],
  });
}

/**
 * Represents the parameters for the "allowance" function.
 */
export type AllowanceParams = {
  owner: AbiParameterToPrimitiveType<{
    internalType: "address";
    name: "owner";
    type: "address";
  }>;
  spender: AbiParameterToPrimitiveType<{
    internalType: "address";
    name: "spender";
    type: "address";
  }>;
};

/**
 * Calls the "allowance" function on the contract.
 * @param options - The options for the allowance function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { allowance } from "TODO";
 *
 * const result = await allowance({
 *  owner: ...,
 *  spender: ...,
 * });
 *
 * ```
 */
export async function allowance(
  options: BaseTransactionOptions<AllowanceParams>
) {
  return readContract({
    contract: options.contract,
    method: [
      "0xdd62ed3e",
      [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
      ],
      [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
    ],
    params: [options.owner, options.spender],
  });
}

/**
 * Represents the parameters for the "balanceOf" function.
 */
export type BalanceOfParams = {
  account: AbiParameterToPrimitiveType<{
    internalType: "address";
    name: "account";
    type: "address";
  }>;
};

/**
 * Calls the "balanceOf" function on the contract.
 * @param options - The options for the balanceOf function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { balanceOf } from "TODO";
 *
 * const result = await balanceOf({
 *  account: ...,
 * });
 *
 * ```
 */
export async function balanceOf(
  options: BaseTransactionOptions<BalanceOfParams>
) {
  return readContract({
    contract: options.contract,
    method: [
      "0x70a08231",
      [
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
    ],
    params: [options.account],
  });
}

/**
 * Calls the "decimals" function on the contract.
 * @param options - The options for the decimals function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { decimals } from "TODO";
 *
 * const result = await decimals();
 *
 * ```
 */
export async function decimals(options: BaseTransactionOptions) {
  return readContract({
    contract: options.contract,
    method: [
      "0x313ce567",
      [],
      [
        {
          internalType: "uint8",
          name: "",
          type: "uint8",
        },
      ],
    ],
    params: [],
  });
}

/**
 * Calls the "eip712Domain" function on the contract.
 * @param options - The options for the eip712Domain function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { eip712Domain } from "TODO";
 *
 * const result = await eip712Domain();
 *
 * ```
 */
export async function eip712Domain(options: BaseTransactionOptions) {
  return readContract({
    contract: options.contract,
    method: [
      "0x84b0196e",
      [],
      [
        {
          internalType: "bytes1",
          name: "fields",
          type: "bytes1",
        },
        {
          internalType: "string",
          name: "name",
          type: "string",
        },
        {
          internalType: "string",
          name: "version",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "chainId",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "verifyingContract",
          type: "address",
        },
        {
          internalType: "bytes32",
          name: "salt",
          type: "bytes32",
        },
        {
          internalType: "uint256[]",
          name: "extensions",
          type: "uint256[]",
        },
      ],
    ],
    params: [],
  });
}

/**
 * Calls the "name" function on the contract.
 * @param options - The options for the name function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { name } from "TODO";
 *
 * const result = await name();
 *
 * ```
 */
export async function name(options: BaseTransactionOptions) {
  return readContract({
    contract: options.contract,
    method: [
      "0x06fdde03",
      [],
      [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
    ],
    params: [],
  });
}

/**
 * Represents the parameters for the "nonces" function.
 */
export type NoncesParams = {
  owner: AbiParameterToPrimitiveType<{
    internalType: "address";
    name: "owner";
    type: "address";
  }>;
};

/**
 * Calls the "nonces" function on the contract.
 * @param options - The options for the nonces function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { nonces } from "TODO";
 *
 * const result = await nonces({
 *  owner: ...,
 * });
 *
 * ```
 */
export async function nonces(options: BaseTransactionOptions<NoncesParams>) {
  return readContract({
    contract: options.contract,
    method: [
      "0x7ecebe00",
      [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
      ],
      [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
    ],
    params: [options.owner],
  });
}

/**
 * Calls the "owner" function on the contract.
 * @param options - The options for the owner function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { owner } from "TODO";
 *
 * const result = await owner();
 *
 * ```
 */
export async function owner(options: BaseTransactionOptions) {
  return readContract({
    contract: options.contract,
    method: [
      "0x8da5cb5b",
      [],
      [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
    ],
    params: [],
  });
}

/**
 * Calls the "symbol" function on the contract.
 * @param options - The options for the symbol function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { symbol } from "TODO";
 *
 * const result = await symbol();
 *
 * ```
 */
export async function symbol(options: BaseTransactionOptions) {
  return readContract({
    contract: options.contract,
    method: [
      "0x95d89b41",
      [],
      [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
    ],
    params: [],
  });
}

/**
 * Calls the "totalSupply" function on the contract.
 * @param options - The options for the totalSupply function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { totalSupply } from "TODO";
 *
 * const result = await totalSupply();
 *
 * ```
 */
export async function totalSupply(options: BaseTransactionOptions) {
  return readContract({
    contract: options.contract,
    method: [
      "0x18160ddd",
      [],
      [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
    ],
    params: [],
  });
}

/**
 * Calls the "treeAddr" function on the contract.
 * @param options - The options for the treeAddr function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { treeAddr } from "TODO";
 *
 * const result = await treeAddr();
 *
 * ```
 */
export async function treeAddr(options: BaseTransactionOptions) {
  return readContract({
    contract: options.contract,
    method: [
      "0x4567daeb",
      [],
      [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
    ],
    params: [],
  });
}

/**
 * Contract write functions
 */

/**
 * Represents the parameters for the "approve" function.
 */
export type ApproveParams = {
  spender: AbiParameterToPrimitiveType<{
    internalType: "address";
    name: "spender";
    type: "address";
  }>;
  value: AbiParameterToPrimitiveType<{
    internalType: "uint256";
    name: "value";
    type: "uint256";
  }>;
};

/**
 * Calls the "approve" function on the contract.
 * @param options - The options for the "approve" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { approve } from "TODO";
 *
 * const transaction = approve({
 *  spender: ...,
 *  value: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function approve(options: BaseTransactionOptions<ApproveParams>) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      "0x095ea7b3",
      [
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
    ],
    params: [options.spender, options.value],
  });
}

/**
 * Represents the parameters for the "grantCredit" function.
 */
export type GrantCreditParams = {
  to: AbiParameterToPrimitiveType<{
    internalType: "address";
    name: "to";
    type: "address";
  }>;
  amount: AbiParameterToPrimitiveType<{
    internalType: "uint256";
    name: "amount";
    type: "uint256";
  }>;
};

/**
 * Calls the "grantCredit" function on the contract.
 * @param options - The options for the "grantCredit" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { grantCredit } from "TODO";
 *
 * const transaction = grantCredit({
 *  to: ...,
 *  amount: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function grantCredit(
  options: BaseTransactionOptions<GrantCreditParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      "0x28fb4b59",
      [
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      [],
    ],
    params: [options.to, options.amount],
  });
}

/**
 * Represents the parameters for the "mint" function.
 */
export type MintParams = {
  to: AbiParameterToPrimitiveType<{
    internalType: "address";
    name: "to";
    type: "address";
  }>;
  amount: AbiParameterToPrimitiveType<{
    internalType: "uint256";
    name: "amount";
    type: "uint256";
  }>;
};

/**
 * Calls the "mint" function on the contract.
 * @param options - The options for the "mint" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { mint } from "TODO";
 *
 * const transaction = mint({
 *  to: ...,
 *  amount: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function mint(options: BaseTransactionOptions<MintParams>) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      "0x40c10f19",
      [
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      [],
    ],
    params: [options.to, options.amount],
  });
}

/**
 * Represents the parameters for the "permit" function.
 */
export type PermitParams = {
  owner: AbiParameterToPrimitiveType<{
    internalType: "address";
    name: "owner";
    type: "address";
  }>;
  spender: AbiParameterToPrimitiveType<{
    internalType: "address";
    name: "spender";
    type: "address";
  }>;
  value: AbiParameterToPrimitiveType<{
    internalType: "uint256";
    name: "value";
    type: "uint256";
  }>;
  deadline: AbiParameterToPrimitiveType<{
    internalType: "uint256";
    name: "deadline";
    type: "uint256";
  }>;
  v: AbiParameterToPrimitiveType<{
    internalType: "uint8";
    name: "v";
    type: "uint8";
  }>;
  r: AbiParameterToPrimitiveType<{
    internalType: "bytes32";
    name: "r";
    type: "bytes32";
  }>;
  s: AbiParameterToPrimitiveType<{
    internalType: "bytes32";
    name: "s";
    type: "bytes32";
  }>;
};

/**
 * Calls the "permit" function on the contract.
 * @param options - The options for the "permit" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { permit } from "TODO";
 *
 * const transaction = permit({
 *  owner: ...,
 *  spender: ...,
 *  value: ...,
 *  deadline: ...,
 *  v: ...,
 *  r: ...,
 *  s: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function permit(options: BaseTransactionOptions<PermitParams>) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      "0xd505accf",
      [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "deadline",
          type: "uint256",
        },
        {
          internalType: "uint8",
          name: "v",
          type: "uint8",
        },
        {
          internalType: "bytes32",
          name: "r",
          type: "bytes32",
        },
        {
          internalType: "bytes32",
          name: "s",
          type: "bytes32",
        },
      ],
      [],
    ],
    params: [
      options.owner,
      options.spender,
      options.value,
      options.deadline,
      options.v,
      options.r,
      options.s,
    ],
  });
}

/**
 * Calls the "renounceOwnership" function on the contract.
 * @param options - The options for the "renounceOwnership" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { renounceOwnership } from "TODO";
 *
 * const transaction = renounceOwnership();
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function renounceOwnership(options: BaseTransactionOptions) {
  return prepareContractCall({
    contract: options.contract,
    method: ["0x715018a6", [], []],
    params: [],
  });
}

/**
 * Represents the parameters for the "setTreeAddr" function.
 */
export type SetTreeAddrParams = {
  addr: AbiParameterToPrimitiveType<{
    internalType: "address";
    name: "addr";
    type: "address";
  }>;
};

/**
 * Calls the "setTreeAddr" function on the contract.
 * @param options - The options for the "setTreeAddr" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { setTreeAddr } from "TODO";
 *
 * const transaction = setTreeAddr({
 *  addr: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function setTreeAddr(
  options: BaseTransactionOptions<SetTreeAddrParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      "0xcbd4c01c",
      [
        {
          internalType: "address",
          name: "addr",
          type: "address",
        },
      ],
      [],
    ],
    params: [options.addr],
  });
}

/**
 * Represents the parameters for the "transfer" function.
 */
export type TransferParams = {
  to: AbiParameterToPrimitiveType<{
    internalType: "address";
    name: "to";
    type: "address";
  }>;
  value: AbiParameterToPrimitiveType<{
    internalType: "uint256";
    name: "value";
    type: "uint256";
  }>;
};

/**
 * Calls the "transfer" function on the contract.
 * @param options - The options for the "transfer" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { transfer } from "TODO";
 *
 * const transaction = transfer({
 *  to: ...,
 *  value: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function transfer(options: BaseTransactionOptions<TransferParams>) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      "0xa9059cbb",
      [
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
    ],
    params: [options.to, options.value],
  });
}

/**
 * Represents the parameters for the "transferFrom" function.
 */
export type TransferFromParams = {
  from: AbiParameterToPrimitiveType<{
    internalType: "address";
    name: "from";
    type: "address";
  }>;
  to: AbiParameterToPrimitiveType<{
    internalType: "address";
    name: "to";
    type: "address";
  }>;
  value: AbiParameterToPrimitiveType<{
    internalType: "uint256";
    name: "value";
    type: "uint256";
  }>;
};

/**
 * Calls the "transferFrom" function on the contract.
 * @param options - The options for the "transferFrom" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { transferFrom } from "TODO";
 *
 * const transaction = transferFrom({
 *  from: ...,
 *  to: ...,
 *  value: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function transferFrom(
  options: BaseTransactionOptions<TransferFromParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      "0x23b872dd",
      [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
    ],
    params: [options.from, options.to, options.value],
  });
}

/**
 * Represents the parameters for the "transferOwnership" function.
 */
export type TransferOwnershipParams = {
  newOwner: AbiParameterToPrimitiveType<{
    internalType: "address";
    name: "newOwner";
    type: "address";
  }>;
};

/**
 * Calls the "transferOwnership" function on the contract.
 * @param options - The options for the "transferOwnership" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { transferOwnership } from "TODO";
 *
 * const transaction = transferOwnership({
 *  newOwner: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function transferOwnership(
  options: BaseTransactionOptions<TransferOwnershipParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      "0xf2fde38b",
      [
        {
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      [],
    ],
    params: [options.newOwner],
  });
}
