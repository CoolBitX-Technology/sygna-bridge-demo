import React, {Component} from "react";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import ReactJson from "react-json-view";
import {WAITING} from "../../constants/status";

export default class Transfer extends Component {
    render() {
        const {
            idx,
            sign_object,
            open,
            handleClick
        } = this.props;
        const {
            originator_vasp_code,
            beneficiary_vasp_code,
            beneficiary_name,
        } = sign_object.transaction;
        const {transfer_id, result} = sign_object;
        return [
            <div key={`${transfer_id}`} className="row py-2" id={transfer_id}>
                <div className="col">{idx + 1}</div>
                <div className="col">{originator_vasp_code}</div>
                <div className="col">{beneficiary_vasp_code}</div>
                <div className="col">{beneficiary_name}</div>
                <div className="col">{(result) ? result : WAITING}</div>
                <div className="col">
                    <Button variant="info" size="sm"
                            aria-expanded={open}
                            value={open}
                            onClick={(event) => {
                                handleClick(event)
                            }}>Detail
                    </Button>
                </div>
            </div>,
            <Collapse key={`Collapse-${transfer_id}`} in={open}>
                <div className="row py-2 bridge_detail">
                    <div className="col">
                        <ReactJson src={sign_object} displayDataTypes={false} collapseStringsAfterLength={30}/>
                    </div>
                </div>
            </Collapse>
        ];
    }
}
