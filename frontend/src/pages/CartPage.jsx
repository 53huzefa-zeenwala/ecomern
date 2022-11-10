import React from 'react'
import { Alert, Col, Container, Row, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import './style/CartPage.css'
import { useDecreaseCartProductMutation, useIncreaseCartProductMutation, useRemoveFromCartMutation } from '../services/appApi'
export default function CartPage() {
    const user = useSelector(state => state.user)
    const products = useSelector(state => state.products)
    const userCartObj = user.cart
    let cart = products.filter((product) => userCartObj[product._id] != null)
    const [increaseCart] = useIncreaseCartProductMutation()
    const [decreaeCart] = useDecreaseCartProductMutation()
    const [removeFromCart, {isLoading}] = useRemoveFromCartMutation()

    const handleDecrease = ( product) => {
        const quantity = user.cart.count
        if (quantity <= 0) {
            return alert("can't proceed")
        }
        decreaeCart(product)
    }

    return (
        <Container style={{ minHeight: '95vh' }} className='cart-container'>
            <Row>

                <Col md={7}>
                    <h1 className='pt-2 h3'>Shopping cart</h1>
                    {cart.length === 0 ? (
                        <Alert variant='info' >Shopping cart is empty. Add products to your cart</Alert>
                    ) : (
                        <div>Payment here</div>
                    )}
                </Col>
                <Col md={5}>
                    {cart.length > 0 && (
                        <>
                        <Table responsive='sm' className='cart-table' >
                            <thead>
                                <tr>
                                    <th>&nbsp;</th>
                                    <th>Products</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* loop for card product  */}
                                {cart.map(item => (
                                    <tr>
                                        <td>&nbsp;</td>
                                        <td>
                                            {!isLoading && <i className="fa fa-times" style={{marginRight: 10, cursor: 'pointer'}} onClick={() => removeFromCart({ productId: item._id, price: item.price, userId: user._id })}></i>}
                                        <img src={item.pictures[0].url} style={{width: 100, height: 100, objectFit: 'cover'}} alt="" />
                                        </td>
                                        <td>{item.price}</td>
                                        <td>
                                            <span className="quantity-indicator">
                                                <i className="fa fa-minus-circle" onClick={() => handleDecrease({productId: item._id, price: item.price, userId: user._id})}></i>
                                                <span className='px-1'>{user.cart[item._id]}</span>
                                                <i className="fa fa-plus-circle" onClick={() => increaseCart({ productId: item._id, price: item.price, userId: user._id })}></i>
                                            </span>
                                        </td>
                                        <td>${item.price * user.cart[item._id]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <div>
                            <h3 className="h4 pt-4">Total: ${user.cart.total}</h3>
                        </div>
                        </>
                    )}
                </Col>

            </Row>
        </Container>
    )
}
