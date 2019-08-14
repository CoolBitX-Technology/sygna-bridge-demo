import React from "react";
import Originator from "./Originator";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import LogoImg from "../../assets/img/logo.png";
import Beneficiary from "./Beneficiary";
import Bridge from "./Bridge";

const marginTop = {
    marginTop: '60px'
};
const marginTopSm = {
    marginTop: '10px'
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
            <div className="col-md offset-md m-2">
                <h2>Originator</h2>
                <div style={marginTopSm}>
                    <Originator/>
                </div>
            </div>
            <div className="col-md offset-md m-2">
                <h2>Beneficiary</h2>
                <div style={marginTopSm}>
                    <Beneficiary/>
                </div>
            </div>
        </div>
        <div className="row mt-5">
            <div className="col-md offset-md m-2">
                <h2>Bridge</h2>
                <div style={marginTopSm}>
                    <Bridge/>
                </div>
            </div>
        </div>
    </Container>
);

export default App;
