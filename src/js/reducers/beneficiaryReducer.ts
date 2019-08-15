import {BeneficiaryState} from "./types";
import {BridgeActionTypes} from "../actions/types";
import {
    TRANSFER_DECRYPT_RESULT,
    TRANSFER_LOADED,
    TRANSFER_RESULT_SIGN,
    TRANSFER_VERIFY_RESULT
} from "../constants/action-types";
import {NONE} from "../constants/status";

const initialState = {
    verified_status: NONE,
    sign_object: {
        "private_info": "04bb2aae0e33fbe50ffb6121375a4e0f46c9003d946ba96499d5a9c30f077393dc36d89744b3749bcb23c5d523bbf7157ea55410a8bc16aa0f9c414310ec3657fb96a974aba1c1321e831857996acbcb7146c68efeaf97db5b9c6c3331fad23538b7a945f4e2dff8416144f7a0aa644d10f7c914b2507a36732cabd1fd991ed6cf120bca00d48482e27e44fd51ef19c1b85ce5d6e473de169ccbd54f15365c95515442af6833599eb07eb4a13494ca25cb885fa41e18d7611c75288d865141e65b63bf99e66ac5c1383637cb276ecf4f3f63e11f6fe92b7464970143d065d21152bab5787dd4466492a57dcf998090bff55ad2f332413c3b13ac8c362461c8c7b20ee08604cf93a59b7521f47153756c8e52eca88258821b3be6d22978685d1661b1dee99e0bd84a4f9a5325f814d47dbf2f10d67723100eb4d9b0815bbfdb05132c3813a5",
        "transaction": {
            "beneficiary_vasp_code": "VASPUSNY",
            "originator_addr": "0x05ECAf39376088D7C8bF1aCc06015F71e35bFE35",
            "originator_vasp_code": "VASPJPJT",
            "beneficiary_addr": "0x0b696FEB926675a2f8B55644A1669b43b9924C03",
            "transaction_currency": "0x8000003c",
            "amount": 0.347895
        },
        "data_dt": "2019-08-15T10:28:10.364Z",
        "signature": "9eee630c20a2aa894373216b32343c429621b02f29c35130e7573f4d775edd8e7fd50f1a5813a234246785a2fcd542058a0b6ca3d56bc6719b8eb14c88b19301",
        "transfer_id": "01ca7589-f697-4637-931e-aa8922999112"
    },
    private_info: {
        "originator": {
            "name": "",
            "date_of_birth": "",
            "physical_address": "",
            "national_identity_number": "",
            "unique_identity": ""
        },
        "beneficiary": {
            "name": ""
        }
    }
};

export function beneficiaryReducer(state: BeneficiaryState = initialState, action: BridgeActionTypes): BeneficiaryState {
    const {sign_object} = state;
    if (action.type === TRANSFER_LOADED) {
        return Object.assign({}, state, {
            sign_object: action.payload,
            verified_status: NONE,
            private_info: {
                originator: {
                    name: "",
                    date_of_birth: "",
                    physical_address: "",
                    national_identity_number: "",
                    unique_identity: ""
                },
                beneficiary: {
                    name: ""
                }
            }
        });
    }
    if (action.type === TRANSFER_RESULT_SIGN) {
        const {result} = action.payload;
        return Object.assign({}, state, {
            sign_object: Object.assign({}, sign_object, {
                result
            })
        });
    }
    if (action.type === TRANSFER_DECRYPT_RESULT) {
        return Object.assign({}, state, {
            private_info: action.payload
        });
    }
    if (action.type === TRANSFER_VERIFY_RESULT) {
        return Object.assign({}, state, {
            verified_status: action.payload
        });
    }
    return state;
}
