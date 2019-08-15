import {BridgeState} from "./types";
import {BridgeActionTypes} from "../actions/types";
import {TRANSFER_LOADED, TRANSFER_RESULT_SIGN} from "../constants/action-types";

const initState = {
    sign_objects: [
        {
            "private_info": "046fdd18954d0cb1ab4228cded96d7ce998c228ac427bcd11456be2e6785e22fc29e8cb08a2fb8993676a65e3e7da8f4dc0d04e16e3c4b143436d8208f8b20b7bb8b66dd76b4fb6da81d8e141583c23ed4a64a4d2ef7e3e08c0fec3a06b6d212f9f27a7c7fb8c33661194be5e8b2bac30eff1703c1616c7aa680c21edd970637232112e4595675fd9a872b336c8cc5509b2542107d20506295add107ed2752eebc96be260d26185470e1baaacd389de6e444fa1fd6c531dac4d163af14acc4cdbcd1817cebdcac053fd86ed28a808ee14e2c39556edc02bf3b400d82bc4837a79aaec16feb",
            "transaction": {
                "beneficiary_vasp_code": "V2",
                "originator_addr": "0x05ECAf39376088D7C8bF1aCc06015F71e35bFE35",
                "originator_vasp_code": "V1",
                "beneficiary_addr": "0x0b696FEB926675a2f8B55644A1669b43b9924C03",
                "transaction_currency": "0x8000003c",
                "amount": 0.347895
            },
            "data_dt": "",
            "signature": "f6f7bab547bde36e4a020b013cefd37d36379d92f6f295d3fedb00a2b1a8ddf074fa246b9e5a1c9e33ec103838dcae5fa08f1d9cd9e782612f793216040497e6",
            "transfer_id": "176ee01d-8be8-47ba-90a7-4d1a2cce8b33"
        }
    ]
}

export function bridgeReducer(state: BridgeState = initState, action: BridgeActionTypes): BridgeState {
    if (action.type === TRANSFER_LOADED) {
        return Object.assign({}, state, {
            sign_objects: [...state.sign_objects, action.payload]
        });
    }
    if (action.type === TRANSFER_RESULT_SIGN) {
        const {sign_objects} = state;
        const {transfer_id} = action.payload;
        const index = sign_objects.findIndex(x => x.transfer_id === transfer_id);
        const target_object = sign_objects[index];
        const new_object = Object.assign({}, target_object, {
            result: action.payload.result,
            beneficiary_result: action.payload
        });
        return Object.assign({}, state, {
            sign_objects: [
                ...sign_objects.slice(0, index), // everything before current post
                new_object,
                ...sign_objects.slice(index + 1), // everything after current post
            ]
        });
    }
    return state;
}
