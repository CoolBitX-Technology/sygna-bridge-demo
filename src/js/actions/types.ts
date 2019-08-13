import {
    ERROR,
    TRANSFER_LOADED,
    TRANSFER_REQUEST
} from "../constants/action-types";
import {TransferDetail} from "../reducers/types";

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

export type BridgeActionTypes =
    TransferRequestAction
    | TransferLoadedAction
    | ErrorAction
