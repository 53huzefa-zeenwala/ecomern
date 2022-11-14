import React from 'react'
import './style/AdminDashboard.css'
import axios from '../axios'
import { Col, Container, Nav, Row, Tab } from 'react-bootstrap'
import DashboardProducts from '../components/DashboardProducts'
import OrdersAdminPage from '../components/OrdersAdminPage'
import ClientsAdminPage from '../components/ClientsAdminPage'

export default function AdminDashboard() {
    return (
        <Container>
            <Tab.Container>
                <Row>
                    <Col md={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="products">Products</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="orders">Orders</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="clients">Clients</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="products">
                                <DashboardProducts />
                            </Tab.Pane>
                            <Tab.Pane eventKey="orders">
                                <OrdersAdminPage />
                            </Tab.Pane>
                            <Tab.Pane eventKey="clients">
                                <ClientsAdminPage />
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
    )
}
