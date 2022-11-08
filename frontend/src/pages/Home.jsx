import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import categories from '../categories'
import './style/Home.css'
import axios from '../axios'
import { useDispatch, useSelector } from 'react-redux'
import { updateProducts } from '../features/productSlice'
import ProductPreview from '../components/ProductPreview'

export default function Home() {
  const dispatch = useDispatch()
  const products = useSelector(state => state.products)
  const lastProducts = products.slice(0, 8)
  useEffect(() => {
    axios.get('products').then(({ data }) => dispatch(updateProducts(data)))
  }, [])

  return (
    <div>
      <img src=" https://res.cloudinary.com/learn-code-10/image/upload/v1653947013/yqajnhqf7usk56zkwqi5.png" className="home-banner" />
      <div className='featured-products-container container mt-4'>
        <h2>Last Products</h2>
        {/* last product from backend */}
        <div className='d-flex justify-content-center flex-wrap'>
          {lastProducts.map((product) => (
            <ProductPreview {...product} key={product._id} />
          ))}
        </div>
        <div>
          <Link to="/category/all" style={{ textAlign: "right", display: "block", textDecoration: "none" }}>See more {">>"}</Link>
          <div className="sale_banner--container mt-4">
            <img src="https://res.cloudinary.com/learn-code-10/image/upload/v1654093280/xkia6f13xxlk5xvvb5ed.png" />
          </div>
          <div className="recent-products-container container mt-4">
            <h2>Categories</h2>
            <Row>
              {categories.map((category, i) => (
                <LinkContainer to={`/category/${category.name.toLocaleLowerCase()}`} key={i}>
                  <Col md={4}>
                    <div style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${category.img})`, gap: "10px" }} className="category-tile">
                      {category.name}
                    </div>
                  </Col>
                </LinkContainer>
              ))}
            </Row>
          </div>
        </div>
      </div>
    </div>
  )
}
