export interface BeneficiaryState {
    verified_status: string,
    sign_object: any,
    originator_info: OriginatorInfo
}

export interface BridgeState {
    sign_objects: Array<any>
}

export interface OriginatorState {
    transfer_info: TransferInfo,
    originator_info: OriginatorInfo,
    error_msg: string
}

export interface TransferDetail {
    transfer_info: TransferInfo,
    originator_info: OriginatorInfo,
}

export interface TransferInfo {
    beneficiary_vasp_code: string,
    beneficiary_name: string,
    originator_addr: string,
    originator_vasp_code: string,
    beneficiary_addr: string,
    transaction_currency: string,
    amount: number
}

export interface TransferResult {
    transfer_id: string,
    result: string,
    signature: string
}

export interface OriginatorInfo {
    name: string,
    physical_address: string,
    national_identity_number: string,
    date_of_birth: string,
    unique_identity: string
}
