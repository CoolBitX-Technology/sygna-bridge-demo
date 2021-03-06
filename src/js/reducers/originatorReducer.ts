import {OriginatorState} from "./types";
import {BridgeActionTypes} from "../actions/types";
import {ERROR} from "../constants/action-types";

const initState = {
    transfer_info: {
        beneficiary_vasp_code: "",
        originator_addr: "0x05ECAf39376088D7C8bF1aCc06015F71e35bFE35",
        originator_vasp_code: "",
        beneficiary_addr: "0x0b696FEB926675a2f8B55644A1669b43b9924C03",
        transaction_currency: "0x8000003c",
        amount: 0.269726
    },
    originator_info: {
        name: "John Armstrong",
        physical_address: "Bahnhofstrasse 665, 8001 Zurich, Switzerland",
        national_identity_number: "886",
        date_of_birth: "2009-01-03",
        unique_identity: "John"
    },
    beneficiary_info: {
        beneficiary_name: "Antoine Griezmann"
    },
    error_msg: ""
};

export function originatorReducer(state: OriginatorState = initState, action: BridgeActionTypes): OriginatorState {
    if (action.type === ERROR){
        return Object.assign({}, state, {
            error_msg: action.payload
        });
    }
    return state;
}
