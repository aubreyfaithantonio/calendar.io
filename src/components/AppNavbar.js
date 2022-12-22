import { Navbar } from "react-bootstrap";
import {Link} from "react-router-dom";
import '../css/AppNavbar.css'

export default function AppNavbar() {
    return(
        <>
            <Navbar className="appBar py-4 fixed-top">
                <Navbar.Brand className="brand" as={Link} to="/">
                    <img
                    src="../logo.png"
                    width="50"
                    height="50"
                    className="d-inline-block align-top"
                    alt="logo.png"
                    />calendar.io
                </Navbar.Brand>
            </Navbar>
        </>
    )
}