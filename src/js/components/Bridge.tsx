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
        this.state = {
            open_id: ""
        };
        this.showDetail = this.showDetail.bind(this);
    }

    showDetail(event: any, transfer_id: string, idx: number = 0) {
        event.preventDefault();
        this.setState({
            open_id: (event.target.value === "true") ? "" : transfer_id
        });
    }

    render() {
        const {sign_objects} = this.props;
        return (
            <div className="grid-striped">
                <div className="row font-weight-bold py-2">
                    <div className="col-1">#</div>
                    <div className="col">Originator VASP code</div>
                    <div className="col">Beneficiary VASP code</div>
                    <div className="col">Result</div>
                    <div className="col"></div>
                </div>
                {sign_objects.map((el, idx) => (
                        <Transfer
                            key={idx}
                            idx={idx}
                            open={(this.state.open_id === el.transfer_id) ? true : false}
                            sign_object={el}
                            handleClick={(event: any) => this.showDetail(event, el.transfer_id, idx)}
                        />
                    )
                )}
            </div>
        );
    }
};

export default connect(mapStateToProps)(Bridge);
