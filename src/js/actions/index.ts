import {
    ERROR, TRANSFER_DECRYPT, TRANSFER_DECRYPT_RESULT,
    TRANSFER_LOADED,
    TRANSFER_REQUEST, TRANSFER_RESULT, TRANSFER_RESULT_SIGN, TRANSFER_VERIFY, TRANSFER_VERIFY_RESULT
} from "../constants/action-types";
import {BridgeActionTypes} from "./types";
import {TransferDetail, TransferResult} from "../reducers/types";

export function foundError(payload: string): BridgeActionTypes {
    return {
        type: ERROR,
        payload
    };
};

export function transferRequest(payload: TransferDetail): BridgeActionTypes {
    return {
        type: TRANSFER_REQUEST,
        payload
    };
};

export function transferLoaded(payload: object): BridgeActionTypes {
    return {
        type: TRANSFER_LOADED,
        payload
    };
};

export function transferResult(payload: any): BridgeActionTypes {
    return {
        type: TRANSFER_RESULT,
        payload
    };
};

export function transferResultSign(payload: TransferResult): BridgeActionTypes {
    return {
        type: TRANSFER_RESULT_SIGN,
        payload
    };
};

export function transferDecrypt(payload: string): BridgeActionTypes {
    return {
        type: TRANSFER_DECRYPT,
        payload
    };
};

export function transferDecryptResult(payload: any): BridgeActionTypes {
    return {
        type: TRANSFER_DECRYPT_RESULT,
        payload
    };
};

export function transferVerify(payload: any): BridgeActionTypes {
    return {
        type: TRANSFER_VERIFY,
        payload
    };
};

export function transferVerifyResult(payload: string): BridgeActionTypes {
    return {
        type: TRANSFER_VERIFY_RESULT,
        payload
    };
};
