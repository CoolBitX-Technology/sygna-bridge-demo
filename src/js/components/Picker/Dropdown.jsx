import React from "react";

export default class Dropdown extends React.Component {

    onChange(e) {
        const {onChange} = this.props;
        onChange(e);
    }

    render() {
        const {id, src, selectRef, selectedValue, title, marginClass} = this.props;
        const className = "form-control " + marginClass;
        return (
            <select id={id} className={className} ref={selectRef} onChange={this.onChange.bind(this)}
                    value={selectedValue}>
                <option value="" disabled>{title}</option>
                {Object.keys(src).map((key, idx) => {
                        // @ts-ignore
                        const item = src[key];
                        return (
                            <option key={key} value={key}>{item}</option>
                        )
                    }
                )}
            </select>
        );
    }
}
