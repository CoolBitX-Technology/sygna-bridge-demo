import React, {Component} from "react";
import {AppState} from "../reducers";
import {connect} from "react-redux";
import ReactJson from 'react-json-view'
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Button from "react-bootstrap/Button";
import {Dispatch} from "redux";
import {transferDecrypt, transferResult, transferVerify} from "../actions";
import {ACCEPT, NONE, REJECT, SUCCESS} from "../constants/status";
import Alert from "react-bootstrap/Alert";

interface BeneficiaryProps {
    transferResult: Function,
    transferDecrypt: Function,
    transferVerify: Function,
    verified_status: string,
    sign_object: any,
    private_info: any
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        transferResult: (el: any) => dispatch(transferResult(el)),
        transferDecrypt: (el: string) => dispatch(transferDecrypt(el)),
        transferVerify: (el: any) => dispatch(transferVerify(el)),
    };
};

const mapStateToProps = (state: AppState) => {
    const {beneficiary} = state;
    return {
        verified_status: beneficiary.verified_status,
        sign_object: beneficiary.sign_object,
        private_info: beneficiary.private_info
    }
};

const marginTopSm = {
    marginTop: '10px'
};

const margin = {
    margin: '2px'
};

class Beneficiary extends Component<BeneficiaryProps, any> {
    constructor(props: BeneficiaryProps) {
        super(props)
        this.state = {};
        this.btnClick = this.btnClick.bind(this);
        this.btnDecryptClick = this.btnDecryptClick.bind(this);
        this.btnVerifyClick = this.btnVerifyClick.bind(this);
    }

    btnClick(event: any) {
        event.preventDefault();
        const {id, value} = event.target;
        this.props.transferResult({
            transfer_id: value,
            result: id
        });
    }

    btnDecryptClick(event: any) {
        event.preventDefault();
        const {private_info} = this.props.sign_object;
        this.props.transferDecrypt(private_info);
    }

    btnVerifyClick(event: any) {
        event.preventDefault();
        this.props.transferVerify(this.props.sign_object);
    }

    render() {
        const {
            verified_status,
            sign_object,
            private_info
        } = this.props;
        const {transfer_id} = sign_object;
        const variant = (verified_status === SUCCESS)? "success": "danger";
        return (
            <div>
                <div className="row">
                    <div className="col-md">
                        <ButtonToolbar>
                            <Button
                                value={transfer_id}
                                variant="primary"
                                size="lg"
                                style={margin}
                                onClick={(event: any) => {
                                    this.btnVerifyClick(event)
                                }}
                            >Verify</Button>
                            <Button
                                value={transfer_id}
                                variant="secondary"
                                size="lg"
                                style={margin}
                                onClick={(event: any) => {
                                    this.btnDecryptClick(event)
                                }}
                            >Decrypt</Button>
                            <Button
                                id={ACCEPT}
                                value={transfer_id}
                                variant="success"
                                size="lg"
                                style={margin}
                                onClick={(event: any) => {
                                    this.btnClick(event)
                                }}
                            >Accept</Button>
                            <Button
                                id={REJECT}
                                value={transfer_id}
                                variant="secondary"
                                size="lg"
                                style={margin}
                                onClick={(event: any) => {
                                    this.btnClick(event)
                                }}
                            >Reject</Button>
                        </ButtonToolbar>
                    </div>
                </div>
                {(verified_status !== NONE) && (
                    <Alert variant={variant}>
                        Verify result is {verified_status}
                    </Alert>
                )}
                <div className="row" style={marginTopSm}>
                    <div className="col-md">
                        <ReactJson name="transfer_info" displayDataTypes={false} src={sign_object} collapseStringsAfterLength={30}/>
                        <ReactJson name="private_info" displayDataTypes={false} src={private_info} collapseStringsAfterLength={30}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Beneficiary);
