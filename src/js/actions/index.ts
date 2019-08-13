import {
    ERROR,
    TRANSFER_LOADED,
    TRANSFER_REQUEST
} from "../constants/action-types";
import {BridgeActionTypes} from "./types";
import {TransferDetail} from "../reducers/types";

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
