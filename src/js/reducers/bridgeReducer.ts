import {BridgeState} from "./types";
import {BridgeActionTypes} from "../actions/types";
import {TRANSFER_LOADED, TRANSFER_RESULT_SIGN} from "../constants/action-types";

const initState = {
    sign_objects: [
        {
            "private_info": "0463819c52c6db0f5bd28d51eb7b53e8ad8e89294921ecdabc5c602e85825528cfaa33df614c0e25edaf97b9e0216ced0bb2bc4c8eb51f47a4e956f34a4012adf51852bda9a05df2b5d48ca2ea4f804b1b35040c23939d9f61188038efd6833ac7c8ee399eaf7855fda58b3a91301bfc95bed7bb9056a459f586149e04908a0c736ed1ff2d107228c440b323981899102612cae42d2596e40493770d4224cd82e0a040b5d7e1ac3812f6683200d094a92fafcd0add98350fb8b39b62df3025cad2425997a5aac358ab9252be0bc0f2f84908271e5c3050566e5908356e00bdea455b2e1883e44fe6733e77f0637f3e99c9d08ceb5628fed29ab5d9ef12bfd9f165db984a8228ac99302d02ca9d858e602207100601cf6d5e2e9e713d4b340e55da4cdf8dd0436c38b8ebb6013f4d450feb088de5bc52c5daddbe8ab5f6ff59146987d4d2bd",
            "transaction": {
                "beneficiary_vasp_code": "VASPUSNY",
                "originator_addr": "0x05ECAf39376088D7C8bF1aCc06015F71e35bFE35",
                "originator_vasp_code": "VASPJPJT",
                "beneficiary_addr": "0x0b696FEB926675a2f8B55644A1669b43b9924C03",
                "transaction_currency": "0x8000003c",
                "amount": 0.347895
            },
            "data_dt": "2019-08-16T02:37:33.582Z",
            "signature": "3a61dab5a821bdb67e65990a88ff4950f045442e753d58575392a85954073be77e2f0a1f34de3c36e0f4e49272e2350af1beff22a9344ba5e239203b7718f5fc",
            "transfer_id": "92d00213-80da-41d3-8c39-38e6c8b9a373"
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
