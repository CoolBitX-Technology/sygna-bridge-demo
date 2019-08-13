import {combineReducers} from 'redux';
import {BeneficiaryState, BridgeState, OriginatorState} from "./types";
import {originatorReducer} from "./originatorReducer";
import {beneficiaryReducer} from "./beneficiaryReducer";
import {bridgeReducer} from "./bridgeReducer";

export interface AppState {
    originator: OriginatorState,
    beneficiary: BeneficiaryState,
    bridge: BridgeState
}

const rootReducer = combineReducers<AppState>({
    originator: originatorReducer,
    beneficiary: beneficiaryReducer,
    bridge: bridgeReducer,
});

export default rootReducer;
