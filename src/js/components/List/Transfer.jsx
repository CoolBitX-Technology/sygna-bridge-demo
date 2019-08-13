import React, {Component} from "react";
import Button from "react-bootstrap/Button";

export default class Transfer extends Component {
    render() {
        const {
            idx,
            transferId,
            originator_vasp_code,
            beneficiary_vasp_code,
            beneficiary_name,
            handleClick
        } = this.props;
        return (
            <tr id={transferId}>
                <th scope="row">{idx+1}</th>
                <th>{originator_vasp_code}</th>
                <th>{beneficiary_vasp_code}</th>
                <th>{beneficiary_name}</th>
                <th>Waiting</th>
                <th>
                    <Button variant="info" size="sm"  onClick={handleClick}>
                        Detail
                    </Button>
                </th>
            </tr>
        );
    }
}
