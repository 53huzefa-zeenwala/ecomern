import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { LinkContainer } from "react-router-bootstrap";
import './style/Navigation.css'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from "react-bootstrap";
import { logout } from "../features/userSlice";

export default function Navigation() {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logout())
  }
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Ecomern</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {!user && <LinkContainer to="/login">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
            }
            {user && !user.isAdmin && <LinkContainer to="/cart" style={{paddingRight: '2rem'}}>
              <Nav.Link>
                <i className="fas fa-shopping-cart"></i>
                {user?.cart.count > 0 && (
                  <span className="badge badge-warning" id="cartcount">{user.cart.count}</span>
                )}
              </Nav.Link>
            </LinkContainer>
            }
            {user && (
              <NavDropdown title={user.name} id="basic-nav-dropdown">
                {user.isAdmin && (
                  <>
                    <LinkContainer to={'/dashboard'}>
                      <NavDropdown.Item>Dashboard</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to={'/new-product'}>
                      <NavDropdown.Item>Create Product</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                  </>
                )}
                {!user.isAdmin && (
                  <>
                    <LinkContainer to={'/cart'}>
                      <NavDropdown.Item>Cart</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to={'/orders'}>
                      <NavDropdown.Item>My orders</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                  </>
                )}
                <Button variant="danger" onClick={handleLogout} className="logout-btn">Logout</Button>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
