import { Link, NavLink, useLocation } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";

import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';
import { ReactComponent as Logo} from '../logo.svg'
import { useState, useEffect } from "react";

function Header(){
    const location = useLocation();
    const [currentUrl, setCurrentUrl] = useState(null);
    
    useEffect(() => {
        setCurrentUrl(location.pathname);
    }, [location]);

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">
                    <Logo width={35} height={35}/>
                </Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/squad" className={currentUrl === '/squad' ? 'active' : ''}>Squad</Nav.Link>
                    {/* <Nav.Link href="/results" className={currentUrl === '/results' ? 'active' : ''}>Results</Nav.Link> */}
                    <Nav.Link href="/employees" className={currentUrl === '/employees' ? 'active' : ''}>Employees</Nav.Link>
                    <Nav.Link href="/trainers" className={currentUrl === '/trainers' ? 'active' : ''}>Trainers</Nav.Link>
                </Nav>
            </Container>
      </Navbar>
    );
}

export default Header;