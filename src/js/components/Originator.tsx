import React, {Component} from "react";
import {Dispatch} from "redux";
import {OriginatorInfo, TransferDetail, TransferInfo} from "../reducers/types";
import {transferRequest} from "../actions";
import {AppState} from "../reducers";
import {connect} from "react-redux";
import Alert from "react-bootstrap/Alert";
import Collapse from "react-bootstrap/Collapse";
import Dropdown from "./Picker/Dropdown.jsx";

interface OriginatorProps {
    transferRequest: Function;
    transfer_info: TransferInfo;
    originator_info: OriginatorInfo;
    error_msg: string;
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        transferRequest: (detail: TransferDetail) => dispatch(transferRequest(detail))
    };
};

const mapStateToProps = (state: AppState) => {
    const {originator} = state;
    return {
        transfer_info: originator.transfer_info,
        originator_info: originator.originator_info,
        error_msg: originator.error_msg
    }
};

class Originator extends Component<OriginatorProps, any> {
    constructor(props: OriginatorProps) {
        super(props);
        this.state = {
            transaction_currency: "0x8000003c",
            amount: 0.347895,
            beneficiary_addr: "0x0b696FEB926675a2f8B55644A1669b43b9924C03",
            originator_vasp_code: "V1",
            originator_name: "John Armstrong",
            beneficiary_vasp_code: "V2",
            beneficiary_name: "Satoshi Nakamoto",
            originator_addr: "0x05ECAf39376088D7C8bF1aCc06015F71e35bFE35",
            originator_physical_address: "Bahnhofstrasse 665, 8001 Zurich, Switzerland",
            transfer_open: true,
            beneficiary_open: true,
            originator_open: true,
            alert_msg: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setOpen = this.setOpen.bind(this);
    }

    handleChange(event: any) {
        this.setState({[event.target.id]: event.target.value});
    }

    handleSubmit(event: any) {
        event.preventDefault();
        const {
            transaction_currency,
            amount,
            beneficiary_addr,
            originator_vasp_code,
            originator_name,
            beneficiary_vasp_code,
            beneficiary_name,
            originator_addr,
            originator_physical_address
        } = this.state;
        const transfer_info = Object.assign({}, this.props.transfer_info, {
            beneficiary_vasp_code,
            beneficiary_name,
            originator_addr,
            originator_vasp_code,
            beneficiary_addr,
            transaction_currency,
            amount: parseFloat(amount)
        });
        const originator_info = Object.assign({}, this.props.originator_info, {
            name: originator_name,
            physical_address: originator_physical_address
        });
        this.props.transferRequest({
            transfer_info,
            originator_info
        });
    }

    setOpen(event: any, open: boolean) {
        this.setState({[event.target.id]: open});
    }

    render() {
        const {
            transaction_currency,
            amount,
            beneficiary_addr,
            originator_vasp_code,
            originator_name,
            beneficiary_vasp_code,
            beneficiary_name,
            originator_addr,
            originator_physical_address,
            transfer_open,
            beneficiary_open,
            originator_open,
        } = this.state;
        const {error_msg} = this.props;
        const vasp_list = {
            "V1": "VASP 1",
            "V2": "VASP 2",
            "V3": "VASP 3",
        };
        const currency_list = {
            "0x80000000": "BTC",
            "0x8000003c": "ETH",
            "0x80000002": "LTC",
            "0x80000091": "BCH",
            "0x80000090": "XRP",
        };
        return (
            <form onSubmit={this.handleSubmit}>
                {error_msg && (
                    <Alert variant='danger'>
                        {error_msg}
                    </Alert>
                )}
                <div className="row">
                    <div className="col">
                        <div className="alert alert-primary" role="alert" id="transfer_open"
                             onClick={(event: any) => this.setOpen(event, !transfer_open)}>
                            Transfer Info
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Collapse in={transfer_open}>
                            <div id="collapse-transfer" className="form-group">
                                <div className="input-group">
                                    <Dropdown id="transaction_currency" src={currency_list} title="Choose Currency"
                                              marginClass="mt-1"
                                              selectedValue={transaction_currency}
                                              onChange={this.handleChange}/>
                                </div>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control mt-1"
                                        id="amount"
                                        value={amount}
                                        placeholder="Amount"
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control mt-1"
                                        id="beneficiary_addr"
                                        value={beneficiary_addr}
                                        placeholder="Beneficiary Address"
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>
                        </Collapse>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <div className="alert alert-secondary" role="alert" id="beneficiary_open"
                             onClick={(event: any) => this.setOpen(event, !beneficiary_open)}>
                            Beneficiary Info
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Collapse in={beneficiary_open}>
                            <div id="collapse-beneficiary" className="form-group">
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control mt-1"
                                        id="beneficiary_name"
                                        value={beneficiary_name}
                                        placeholder="Beneficiary Name"
                                        onChange={this.handleChange}
                                    />
                                    <Dropdown id="beneficiary_vasp_code" src={vasp_list} title="Choose Beneficiary VASP"
                                              marginClass="mt-1 ml-1"
                                              selectedValue={beneficiary_vasp_code}
                                              onChange={this.handleChange}/>
                                </div>
                            </div>
                        </Collapse>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <div className="alert alert-secondary" role="alert" id="originator_open"
                             onClick={(event: any) => this.setOpen(event, !originator_open)}>
                            Originator Info
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Collapse in={originator_open}>
                            <div id="collapse-originator" className="form-group">
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control mt-1"
                                        id="originator_name"
                                        value={originator_name}
                                        placeholder="Originator Name"
                                        onChange={this.handleChange}
                                    />
                                    <Dropdown id="originator_vasp_code" src={vasp_list} title="Choose Originator VASP"
                                              marginClass="mt-1 ml-1"
                                              selectedValue={originator_vasp_code}
                                              onChange={this.handleChange}/>
                                </div>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control mt-1"
                                        id="originator_addr"
                                        value={originator_addr}
                                        placeholder="Originator Address"
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control mt-1"
                                        id="originator_physical_address"
                                        value={originator_physical_address}
                                        placeholder="Originator Physical Address"
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>
                        </Collapse>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <button type="submit" className="btn btn-success btn-lg">
                            Send
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Originator);
