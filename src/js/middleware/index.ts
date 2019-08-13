import {TRANSFER_REQUEST} from "../constants/action-types";
import {BridgeActionTypes} from "../actions/types";
import {Dispatch} from "redux";
import {transferLoaded} from "../actions";
// @ts-ignore
import {crypto} from "sygna-bridge-util/index";
import {BENEFICIARY_PUBLIC_KEY, ORIGINATOR_PRIVATE_KEY} from "../constants/env";
import uuidv1 from "uuid";

interface MiddlewareProps {
    dispatch: Dispatch
}

export function bridgeMiddleware({dispatch}: MiddlewareProps) {
    return function (next: Function) {
        return function (action: BridgeActionTypes) {
            if (action.type === TRANSFER_REQUEST) {
                const {originator_info, transfer_info} = action.payload;
                const private_info = crypto.sygnaEncodePrivateObj(originator_info, BENEFICIARY_PUBLIC_KEY);
                let sign_object = crypto.signTransferData(private_info, transfer_info, "", ORIGINATOR_PRIVATE_KEY);
                sign_object.id = uuidv1();
                return dispatch(transferLoaded(sign_object));
            }
            return next(action);
        }
    }
}
