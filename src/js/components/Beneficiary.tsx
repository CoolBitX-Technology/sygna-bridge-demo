import React, {Component} from "react";
import {OriginatorInfo} from "../reducers/types";
import {AppState} from "../reducers";
import {connect} from "react-redux";
import ReactJson from 'react-json-view'
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Button from "react-bootstrap/Button";

interface BeneficiaryProps {
    verified_status: string,
    sign_object: any,
    originator_info: OriginatorInfo
}

const mapStateToProps = (state: AppState) => {
    const {beneficiary} = state;
    return {
        verified_status: beneficiary.verified_status,
        sign_object: beneficiary.sign_object,
        originator_info: beneficiary.originator_info
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
    }

    render() {
        const {verified_status, sign_object, originator_info} = this.props;
        return (
            <div>
                <div className="row">
                    <div className="col-md">
                        <ButtonToolbar>
                            <Button variant="primary" size="lg" style={margin}>
                                Verify
                            </Button>
                            <Button variant="secondary" size="lg" style={margin}>
                                Decrypt
                            </Button>
                            <Button href="#" variant="success" size="lg" style={margin}>
                                Accept
                            </Button>
                            <Button href="#" variant="secondary" size="lg" style={margin}>
                                Reject
                            </Button>
                        </ButtonToolbar>
                    </div>
                </div>
                <div className="row" style={marginTopSm}>
                    <div className="col-md">
                        <ReactJson src={sign_object} collapseStringsAfterLength={30}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Beneficiary);
