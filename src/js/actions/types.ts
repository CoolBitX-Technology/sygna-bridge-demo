import {
    ERROR, TRANSFER_DECRYPT, TRANSFER_DECRYPT_RESULT,
    TRANSFER_LOADED,
    TRANSFER_REQUEST, TRANSFER_RESULT, TRANSFER_RESULT_SIGN, TRANSFER_VERIFY, TRANSFER_VERIFY_RESULT
} from "../constants/action-types";
import {TransferDetail, TransferResult} from "../reducers/types";

interface ErrorAction {
    type: typeof ERROR,
    payload: string
}

interface TransferRequestAction {
    type: typeof TRANSFER_REQUEST,
    payload: TransferDetail
}

interface TransferLoadedAction {
    type: typeof TRANSFER_LOADED,
    payload: object
}

interface TransferResultAction {
    type: typeof TRANSFER_RESULT,
    payload: any
}

interface TransferResultSignAction {
    type: typeof TRANSFER_RESULT_SIGN,
    payload: TransferResult
}

interface TransferDecryptAction {
    type: typeof TRANSFER_DECRYPT,
    payload: string
}

interface TransferDecryptResultAction {
    type: typeof TRANSFER_DECRYPT_RESULT,
    payload: any
}

interface TransferVerifyAction {
    type: typeof TRANSFER_VERIFY,
    payload: any
}

interface TransferVerifyResultAction {
    type: typeof TRANSFER_VERIFY_RESULT,
    payload: string
}

export type BridgeActionTypes =
    TransferRequestAction
    | TransferLoadedAction
    | ErrorAction
    | TransferResultAction
    | TransferResultSignAction
    | TransferDecryptAction
    | TransferDecryptResultAction
    | TransferVerifyAction
    | TransferVerifyResultAction
