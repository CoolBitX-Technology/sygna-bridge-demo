export interface BeneficiaryState {
    verified_status: string,
    sign_object: any,
    private_info: any
}

export interface BridgeState {
    sign_objects: Array<any>
}

export interface OriginatorState {
    transfer_info: TransferInfo,
    originator_info: OriginatorInfo,
    beneficiary_info: BeneficiaryInfo,
    error_msg: string
}

export interface TransferDetail {
    transfer_info: TransferInfo,
    originator_info: OriginatorInfo,
    beneficiary_info: BeneficiaryInfo
}

export interface TransferInfo {
    originator_vasp_code: string,
    originator_addr: string,
    beneficiary_vasp_code: string,
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

export interface BeneficiaryInfo {
    beneficiary_name: string
}
