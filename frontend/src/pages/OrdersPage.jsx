import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from '../axios'
import { Badge, Container, Table } from 'react-bootstrap'
import Loading from '../components/Loading'

export default function OrdersPage() {
    const user = useSelector(state => state.user)
    const products = useSelector(state => state.products)
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)
    const [orderToShow, setOrderToShow] = useState([])
    const [show, setShow] = useState(false)
    useEffect(() => {
        setLoading(true)
        axios.get(`/users/${user._id}/orders`)
            .then(({ data }) => {
                setLoading(false)
                setOrders(data)
            })
            .catch((err) => {
                setLoading(false)
                console.log(err)
            })

    }, [])

    if (loading) {
        return <Loading />
    }
    if (orders.length === 0) {
        return <h1 className='text-center pt-3'>No Orders Yet</h1>
    }
    return (
        <Container>
            <h1 className="text-center">Your orders</h1>
            <Table responsive striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, i) => (
                        <tr key={i}>
                            <td>{order._id}</td>
                            <td>
                                <Badge bg={`${order.status == "processing" ? "warning" : "success"}`} text="white">
                                    {order.status}
                                </Badge>
                            </td>
                            <td>{order.date}</td>

                            <td>${order.total}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    )
}
