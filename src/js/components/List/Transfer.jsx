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
            beneficiary_vasp_code
        } = sign_object.transaction;
        const {transfer_id, result} = sign_object;
        return [
            <div key={`${transfer_id}`} className="row py-2" id={transfer_id} value={open}
                 onClick={(event) => {
                     handleClick(event)
                 }}>
                <div className="col-1">{idx + 1}</div>
                <div className="col">{originator_vasp_code}</div>
                <div className="col">{beneficiary_vasp_code}</div>
                <div className="col">{(result) ? result : WAITING}</div>
                <div className="col d-none d-sm-block">
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
