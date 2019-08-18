import React from "react";
import Originator from "./Originator";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import LogoImg from "../../assets/img/logo.png";
import Beneficiary from "./Beneficiary";
import Bridge from "./Bridge";

const marginTop = {
    marginTop: '60px',
    marginLeft: '2px',
    marginRight: '2px'
};
const marginTopSm = {
    marginTop: '10px',
};

const App = () => (
    <Container fluid={true}>
        <Navbar fixed="top" expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="#">
                <img
                    src={LogoImg}
                    width="120"
                    height="30"
                    className="d-inline-block align-top"
                    alt="Sygna Bridge"
                />
            </Navbar.Brand>
        </Navbar>

        <div className="row" style={marginTop}>
            <div className="col-md-6 order-md-1 order-sm-1 order-1 pt-md-3 pl-md-3 pr-md-3 p-0 pt-3">
                <h2>Originator VASP</h2>
                <div style={marginTopSm}>
                    <Originator/>
                </div>
            </div>
            <div className="col-md-6 order-md-2 order-sm-3 order-3 pt-md-3 pl-md-3 pr-md-3 p-0 pt-3">
                <h2>Beneficiary VASP</h2>
                <div style={marginTopSm}>
                    <Beneficiary/>
                </div>
            </div>
            <div className="col-md-12 order-md-3 order-sm-2 order-2 pt-md-3 pl-md-3 pr-md-3 p-0 pt-3">
                <h2>Bridge</h2>
                <div style={marginTopSm}>
                    <Bridge/>
                </div>
            </div>
        </div>
    </Container>
);

export default App;
