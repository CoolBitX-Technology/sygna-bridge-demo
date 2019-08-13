import React, {Component} from "react";
import {AppState} from "../reducers";
import {connect} from "react-redux";
import Transfer from "./List/Transfer.jsx";

interface BridgeProps {
    sign_objects: Array<any>;
}

const mapStateToProps = (state: AppState) => {
    const {bridge} = state;
    return {
        sign_objects: bridge.sign_objects
    }
};

class Bridge extends Component<BridgeProps, any> {
    constructor(props: BridgeProps) {
        super(props);
        this.state = {};
        this.showDetail = this.showDetail.bind(this);
    }

    showDetail(event: any, transferId: string, itemIdx: number = 0) {
        event.preventDefault();
    }

    render() {
        const {sign_objects} = this.props;
        return (
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Originator VASP</th>
                            <th scope="col">Beneficiary VASP</th>
                            <th scope="col">Beneficiary</th>
                            <th scope="col">Status</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                {sign_objects.map((el, idx) => (
                        <Transfer
                            key={idx}
                            idx={idx}
                            transferId={el.id}
                            originator_vasp_code={el.transaction.originator_vasp_code}
                            beneficiary_vasp_code={el.transaction.beneficiary_vasp_code}
                            beneficiary_name={el.transaction.beneficiary_name}
                            handleClick={(event: any) => this.showDetail(event, el.id, idx)}
                        />
                    )
                )}
                    </tbody>
                </table>
            </div>
        );
    }
};

export default connect(mapStateToProps)(Bridge);
