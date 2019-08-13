import React, {Component} from "react";
import {Dispatch} from "redux";
import {OriginatorInfo, TransferDetail, TransferInfo} from "../reducers/types";
import {transferRequest} from "../actions";
import {AppState} from "../reducers";
import {connect} from "react-redux";
import Alert from "react-bootstrap/Alert";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

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
        error_msg: originator.error_msg,
        transfer_info: originator.transfer_info,
        originator_info: originator.originator_info
    }
};

class Originator extends Component<OriginatorProps, any> {
    constructor(props: OriginatorProps) {
        super(props);
        this.state = {
            originator_vasp_code: "",
            beneficiary_vasp_code: "",
            beneficiary_name: "",
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event: any) {
        this.setState({[event.target.id]: event.target.value});
    }

    handleSelect(eventKey: any, event: any) {
        this.setState({beneficiary_vasp_code: eventKey})
    }

    handleSubmit(event: any) {
        event.preventDefault();
        const {originator_vasp_code, beneficiary_vasp_code, beneficiary_name} = this.state;
        const transfer_info = Object.assign({}, this.props.transfer_info, {
            originator_vasp_code, beneficiary_vasp_code, beneficiary_name
        });
        const originator_info = {...this.props.originator_info};
        this.props.transferRequest({
            transfer_info,
            originator_info
        });
        this.setState({
            originator_vasp_code: "",
            beneficiary_vasp_code: "",
            beneficiary_name: "",
        });
    }

    render() {
        const {originator_vasp_code, beneficiary_vasp_code, beneficiary_name} = this.state;
        const {error_msg} = this.props;
        const vasp_list = {
            "V1": "VASP 1",
            "V2": "VASP 2",
            "V3": "VASP 3",
        };
        return (
            <form onSubmit={this.handleSubmit}>
                {error_msg && (
                    <Alert variant='danger'>
                        {error_msg}
                    </Alert>
                )}
                <div className="form-group">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control mt-1"
                            id="originator_vasp_code"
                            value={originator_vasp_code}
                            placeholder="Originator VASP"
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control mt-1"
                            id="beneficiary_name"
                            value={beneficiary_name}
                            placeholder="Beneficiary Name"
                            onChange={this.handleChange}
                        />
                        <DropdownButton
                            className="mt-1 ml-1"
                            title="VASP"
                            variant="secondary"
                            id="secondary"
                            key="secondary"
                        >
                            {Object.keys(vasp_list).map((key, idx) => {
                                    // @ts-ignore
                                    const item = vasp_list[key];
                                    const selected = (key === beneficiary_vasp_code) ? true : false;
                                    return (
                                        <Dropdown.Item key={idx} eventKey={key} onSelect={this.handleSelect}
                                                       active={selected}>{item}</Dropdown.Item>
                                    )
                                }
                            )}
                        </DropdownButton>
                    </div>
                </div>
                <button type="submit" className="btn btn-success btn-lg">
                    Send
                </button>
            </form>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Originator);
