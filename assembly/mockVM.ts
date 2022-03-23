import { Protobuf } from "as-proto";
import { System, value } from ".";
import { authority } from "./proto/chain/authority";
import { chain } from "./proto/chain/chain";
import { protocol } from "./proto/protocol/protocol";

export namespace MockVM {
  export const METADATA_SPACE = new chain.object_space(true, null, 0);

  export class MockAuthority {
    autorization_type: authority.authorization_type;
    account: Uint8Array;
    authorized: bool;

    constructor(autorization_type: authority.authorization_type, account: Uint8Array, authorized: bool) {
      this.autorization_type = autorization_type;
      this.account = account;
      this.authorized = authorized;
    }
  }

  /**
    * Set entry point that will be used when calling System.getEntryPoint()
    * @param { u32 } entryPoint entry point to set
    * @example
    * ```ts
    * MockVM.setEntryPoint(0xc3ab8ff1);
    * 
    * const entryPoint = System.getEntryPoint();
    * System.log('entryPoint: ' + entryPoint.toString());
    * ```
    */
  export function setEntryPoint(entryPoint: u32): void {
    const entryPointObj = new value.value_type();
    entryPointObj.int32_value = entryPoint;

    System.putObject(METADATA_SPACE, 'entry_point', entryPointObj, value.value_type.encode);
  }

  /**
    * Set contract arguments that will be used when calling System.getContractArguments()
    * @param { Uint8Array } contractArguments contract arguments to set
    * @example
    * ```ts
    * let contractArguments = StringBytes.stringToBytes('myArgs');
    * MockVM.setContractArguments(contractArguments);
    *
    * contractArguments = System.getContractArguments();
    * System.log('contractArguments: ' + (StringBytes.bytesToString(contractArguments) as string));
    * ```
    */
  export function setContractArguments(contractArguments: Uint8Array): void {
    System.putBytes(METADATA_SPACE, 'contract_arguments', contractArguments);
  }

  /**
    * Set contract id that will be used when calling System.getContractArguments()
    * @param { Uint8Array } contractId contract id to set
    * @example
    * ```ts
    * let contractId = Base58.decode('1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe');
    * MockVM.setContractId(contractId);
    *
    * contractId = System.getContractId();
    * System.log('contractId: ' + Base58.encode(contractId));
    * ```
    */
  export function setContractId(contractId: Uint8Array): void {
    System.putBytes(METADATA_SPACE, 'contract_id', contractId);
  }

  /**
    * Set head info that will be used when calling System.getHeadInfo()
    * @param { chain.head_info } headInfo head info to set
    * @example
    * ```ts
    * let headInfo = new chain.head_info();
    * headInfo.head_block_time = 123456789;
    * headInfo.last_irreversible_block = 3;
    *
    * MockVM.setHeadInfo(headInfo);
    *
    * headInfo = System.getHeadInfo();
    * System.log('headInfo.head_block_time: ' + headInfo.head_block_time.toString());
    * ```
    */
  export function setHeadInfo(headInfo: chain.head_info): void {
    System.putObject(METADATA_SPACE, 'authority', headInfo, chain.head_info.encode);
  }

  /**
    * Set entry point that will be used when calling System.getEntryPoint()
    * @param { u64 } lastIrreversibleBlock last irreversible block height to set
    * @example
    * ```ts
    * MockVM.setLastIrreversibleBlock(987654321);
    *
    * const lastIrreversibleBlock = System.getLastIrreversibleBlock();
    * System.log('lastIrreversibleBlock: ' + lastIrreversibleBlock.toString());
    * ```
    */
  export function setLastIrreversibleBlock(lastIrreversibleBlock: u64): void {
    const lastIrreversibleBlockObj = new value.value_type();
    lastIrreversibleBlockObj.uint64_value = lastIrreversibleBlock;

    System.putObject(METADATA_SPACE, 'last_irreversible_block', lastIrreversibleBlockObj, value.value_type.encode);
  }

  /**
    * Set caller data that will be used when calling System.getCaller()
    * @param { chain.caller_data } callerData caller data to set
    * @example
    * ```ts
    * let callerData = new chain.caller_data(Base58.decode('1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe'), chain.privilege.user_mode);
    * 
    * MockVM.setCaller(callerData);
    *
    * callerData = System.getCaller();
    * 
    * System.log('callerData.caller_privilege: ' + callerData.caller_privilege.toString());
    * if (callerData.caller) {
    *   System.log('callerData.caller (b58): ' + Base58.encode(callerData.caller as Uint8Array));
    * }
    * ```
    */
  export function setCaller(callerData: chain.caller_data): void {
    System.putObject(METADATA_SPACE, 'caller', callerData, chain.caller_data.encode);
  }

  /**
    * Set transaction that will be used when calling System.getTransaction() and System.getTransactionField(...)
    * @param { protocol.transaction } transaction transaction to set
    * @example
    * ```ts
    * let transaction = new protocol.transaction();
    * transaction.id = StringBytes.stringToBytes("0x12345");
    * 
    * MockVM.setTransaction(transaction);
    *
    * transaction = System.getTransaction();
    * 
    * System.log("transaction.id: " + (StringBytes.bytesToString((transaction.id) as Uint8Array) as string));
    * 
    * let txField = System.getTransactionField('id');
    * if (txField) {
    *   System.log("transaction.id: " + (StringBytes.bytesToString((txField.bytes_value) as Uint8Array) as string));
    * }
    * ```
    */
  export function setTransaction(transaction: protocol.transaction): void {
    System.putObject(METADATA_SPACE, 'transaction', transaction, protocol.transaction.encode);
  }

  /**
    * Set block that will be used when calling System.getBlock() and System.getBlockField(...)
    * @param { protocol.block } block block to set
    * @example
    * ```ts
    * let block = new protocol.block();
    * block.id = StringBytes.stringToBytes("0x12345");
    * 
    * MockVM.setBlock(block);
    *
    * block = System.getBlock();
    * 
    * System.log("block.id: " + (StringBytes.bytesToString((block.id) as Uint8Array) as string));
    * 
    * let blField = System.getBlockField('id');
    * if (blField) {
    *   System.log("block.id: " + (StringBytes.bytesToString((blField.bytes_value) as Uint8Array) as string));
    * }
    * ```
    */
  export function setBlock(block: protocol.block): void {
    System.putObject(METADATA_SPACE, 'block', block, protocol.block.encode);
  }

  /**
    * Set authorities that will be used when calling System.requireAuthority(...)
    * @param { MockAuthority[] } authorities authorities to set
    * @example
    * ```ts
    * const account = Base58.decode('1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe');
    * const auth1 = new MockAuthority(authority.authorization_type.contract_call, account, true);
    * const auth2 = new MockAuthority(authority.authorization_type.contract_upload, account, false)
    * 
    * MockVM.setAuthorities([auth1, auth2]);
    *
    * System.requireAuthority(authority.authorization_type.contract_call, account);
    * ```
    */
  export function setAuthorities(authorities: MockAuthority[]): void {
    const authoritiesListType = new value.list_type();

    for (let index = 0; index < authorities.length; index++) {
      const auth = authorities[index];

      const authorityValueType = new value.value_type();
      authorityValueType.bool_value = auth.authorized;
      authorityValueType.bytes_value = auth.account;
      authorityValueType.int32_value = auth.autorization_type;

      authoritiesListType.values.push(authorityValueType);

    }

    System.putObject(METADATA_SPACE, 'authority', authoritiesListType, value.list_type.encode);
  }

  /**
    * Set call contract results that will be used when calling System.callContract(...)
    * @param { Uint8Array[] } callContractResults The results are FIFO, so the first System.callContract(...) used in your code will use the first result you set in callContractResults, the second System.callContract(...) will get the second result, etc...
    * @example
    * ```ts
    * const callContractResults = new value.list_type();

    const callContractRes1 = Base64.decode('res1');
    const callContractRes2 = Base64.decode('res2');

    const callContractResults: Uint8Array[] = 

    MockVM.setCallContractResults([callContractRes1, callContractRes2]);

    let callRes = System.callContract(contract_id, 1, new Uint8Array(0));
    if (callRes) {
      System.log('callRes1: ' + (Base64.encode(callRes as Uint8Array) as string));
    }

    callRes = System.callContract(contract_id, 1, new Uint8Array(0));
    if (callRes) {
      System.log('callRes2: ' + (Base64.encode(callRes as Uint8Array) as string));
    }
    * ```
    */
  export function setCallContractResults(callContractResults: Uint8Array[]): void {
    const callContractResultListType = new value.list_type();

    for (let index = 0; index < callContractResults.length; index++) {
      const callContractRes = callContractResults[index];

      const callContractResultValueType = new value.value_type();
      callContractResultValueType.bytes_value = callContractRes;

      callContractResultListType.values.push(callContractResultValueType);

    }

    System.putObject(METADATA_SPACE, 'call_contract_results', callContractResultListType, value.list_type.encode);
  }

  /**
    * Get logs set when calling System.log()
    * @returns { string[] }
    * @example
    * ```ts
    * System.log('log 1');
    * System.log('log 2');
    * 
    * const logs = MockVM.getLogs();
    * 
    * for (let index = 0; index < logs.length; index++) {
    *   const log = logs;
    * }
    * ```
    */
  export function getLogs(): string[] {
    const logs: string[] = [];

    const logsBytes = System.getBytes(METADATA_SPACE, 'logs');

    if (logsBytes) {
      const logsListType = Protobuf.decode(logsBytes, value.list_type.decode);

      for (let index = 0; index < logsListType.values.length; index++) {
        const log = logsListType.values[index];

        logs.push(log.string_value as string);
      }
    }

    return logs;
  }

  /**
    * Get logs set when calling System.log()
    * @returns { string[] }
    * @example
    * ```ts
    * System.Event('my-event-1', Base64.decode('event data'), [Base58.decode('1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe')]);
    * System.Event('my-event-2', Base64.decode('event data 2'), [Base58.decode('1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe')]);
    * 
    * const events = MockVM.getEvents();
    * 
    * for (let index = 0; index < events.length; index++) {
    *   const event = events;
    * }
    * ```
    */
  export function getEvents(): Uint8Array[] {
    const events: Uint8Array[] = [];

    const eventsBytes = System.getBytes(METADATA_SPACE, 'events');

    if (eventsBytes) {
      const eventsListType = Protobuf.decode(eventsBytes, value.list_type.decode);

      for (let index = 0; index < eventsListType.values.length; index++) {
        const eventBytes = eventsListType.values[index];

        events.push(eventBytes.bytes_value as Uint8Array);
      }
    }

    return events;
  }

  /**
    * Reset the MockVM database
    * @example
    * ```ts
    * MockVM.reset();
    * ```
    */
  export function reset(): void {
    System.putBytes(METADATA_SPACE, 'reset', new Uint8Array(0));
  }

  /**
    * Backup the database so that it can be rolledback to the backedup state if the transaction reverts
    * @example
    * ```ts
    * MockVM.beginTransaction();
    * ```
    */
  export function beginTransaction(): void {
    System.putBytes(METADATA_SPACE, 'begin_transaction', new Uint8Array(0));
  }

  /**
    * Rrestore the backup made via MockVM.beginTransaction()
    * @example
    * ```ts
    * MockVM.rollbackTransaction();
    * ```
    */
  export function rollbackTransaction(): void {
    System.putBytes(METADATA_SPACE, 'rollback_transaction', new Uint8Array(0));
  }

  /**
    * Clear the backup made via MockVM.beginTransaction() (hence make it impossible to rollback)
    * @example
    * ```ts
    * MockVM.commitTransaction();
    * ```
    */
  export function commitTransaction(): void {
    System.putBytes(METADATA_SPACE, 'commit_transaction', new Uint8Array(0));
  }
}