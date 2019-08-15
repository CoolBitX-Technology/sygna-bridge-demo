import {TRANSFER_DECRYPT, TRANSFER_REQUEST, TRANSFER_RESULT, TRANSFER_VERIFY} from "../constants/action-types";
import {BridgeActionTypes} from "../actions/types";
import {Dispatch} from "redux";
import {transferDecryptResult, transferLoaded, transferResultSign, transferVerifyResult} from "../actions";
// @ts-ignore
import {crypto} from "sygna-bridge-util/index";
import {
    BENEFICIARY_PRIVATE_KEY,
    BENEFICIARY_PUBLIC_KEY,
    ORIGINATOR_PRIVATE_KEY,
    ORIGINATOR_PUBLIC_KEY
} from "../constants/env";
import uuidv1 from "uuid";
import {FAILED, SUCCESS} from "../constants/status";

interface MiddlewareProps {
    dispatch: Dispatch
}

export function bridgeMiddleware({dispatch}: MiddlewareProps) {
    return function (next: Function) {
        return function (action: BridgeActionTypes) {
            if (action.type === TRANSFER_REQUEST) {
                const {originator_info, transfer_info, beneficiary_info} = action.payload;
                const encrypt_info = {
                    originator: {
                        name: originator_info.name,
                        date_of_birth: originator_info.date_of_birth,
                        physical_address: originator_info.physical_address,
                        national_identity_number: originator_info.national_identity_number,
                        unique_identity: originator_info.unique_identity
                    },
                    beneficiary:{
                        name: beneficiary_info.beneficiary_name
                    }
                };
                const private_info = crypto.sygnaEncodePrivateObj(encrypt_info, BENEFICIARY_PUBLIC_KEY);
                const data_dt = new Date();
                let sign_object = crypto.signTransferData(private_info, transfer_info, data_dt.toISOString(), ORIGINATOR_PRIVATE_KEY);
                sign_object.transfer_id = uuidv1();
                return dispatch(transferLoaded(sign_object));
            }
            if (action.type === TRANSFER_RESULT) {
                const {transfer_id, result} = action.payload;
                let sign_result = crypto.signResult(transfer_id, result, BENEFICIARY_PRIVATE_KEY);
                return dispatch(transferResultSign(sign_result));
            }
            if (action.type === TRANSFER_DECRYPT) {
                let decode = crypto.sygnaDecodePrivateObg(action.payload, BENEFICIARY_PRIVATE_KEY);
                return dispatch(transferDecryptResult(decode));
            }
            if (action.type === TRANSFER_VERIFY) {
                const filtered = {...action.payload};
                delete filtered.transfer_id;
                delete filtered.result;
                let verify_result = crypto.verifyObject(filtered, ORIGINATOR_PUBLIC_KEY);
                return dispatch(transferVerifyResult((verify_result) ? SUCCESS : FAILED))
            }
            return next(action);
        }
    }
}
