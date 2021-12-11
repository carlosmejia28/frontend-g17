import React from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <Navbar bg="light" expand="lg"  className="my-2">
  <Container fluid>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      <Nav
        className="me-auto my-2 my-lg-0"
        style={{ maxHeight: '100px' }}
        navbarScroll
      >
        <Link to="/" className="nav-link" >Inicio</Link>
        <Link to="/cliente" className="nav-link">Cliente</Link>
        <NavDropdown title="Link" id="navbarScrollingDropdown">
          <NavDropdown.Item ><Link to="/contacto" className="nav-link">Contacto</Link>  </NavDropdown.Item>
          <NavDropdown.Item ><Link to="/nosotros" className="nav-link">Nosotros</Link></NavDropdown.Item>
          <NavDropdown.Item href="/nuevo_cliente">Nuevo Cliente</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#">
            Salir
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>


    )
}
export default NavBar
