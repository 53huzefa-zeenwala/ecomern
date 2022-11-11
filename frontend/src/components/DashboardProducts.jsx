import React from 'react'
import { useSelector } from 'react-redux'
import { Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import "./style/DashboardProducts.css";
import { useDeleteProductMutation } from '../services/appApi'

export default function DashboardProducts() {
    const products = useSelector(state => state.products)
    const user = useSelector(state => state.user)
    const [deleteProuct, {isLoading, isSuccess}] = useDeleteProductMutation()
    // removing the product
    const handleDeleteProduct = (id) => {
        if(window.confirm('Are you Sure?')) {
            deleteProuct({product_id: id,user_id: user._id})
        }

    }
    return (
        <Table striped bordered hover responsive >
            <thead>
                <tr>
                    <th></th>
                    <th>Product Id</th>
                    <th>Product Name</th>
                    <th>Product Price</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product, i) => (
                    <tr key={i}>
                        <td><img src={product.pictures[0].url} alt="" className="dashboard-product-preview"/></td>
                        <td>{product._id}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>
                            <Button style={{marginRight: '0.5rem'}} onClick={() => handleDeleteProduct(product._id)} className='btn btn-danger' disabled={isLoading}>Delete</Button>
                            <Link to={`/products/${product._id}/edit`} className='btn btn-warning'>Edit</Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}
