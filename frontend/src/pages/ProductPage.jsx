import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { Badge, Button, ButtonGroup, Col, Container, Form, Row } from 'react-bootstrap'
import AliceCarousal from 'react-alice-carousel'
import { useEffect } from 'react'
import axios from '../axios'
import Loading from '../components/Loading'
import SimilarProduct from '../components/SimilarProduct'
import './style/ProductPage.css'
import "react-alice-carousel/lib/alice-carousel.css";
import { LinkContainer } from 'react-router-bootstrap'

export default function ProductPage() {
    const { id } = useParams()
    const user = useSelector(state => state.user)
    const [product, setProduct] = useState(null)
    const [similar, setSimilar] = useState(null)

    const handleDrag = e => {
        e.preventDefault()
    }

    useEffect(() => {
        axios.get(`/products/${id}`).then(({ data }) => {
            setProduct(data.product)
            setSimilar(data.similarProducts)
        })
    }, [id])


    if (!product) {
        return <Loading />
    }

    const images = product.pictures.map((picture, i) => <img className='product_carousel--image' src={picture.url} onDragStart={handleDrag} key={i} />)

    const responsive = {
        0: { items: 1 },
        568: { items: 2 },
        1024: { items: 3 },
    };

    let similarProducts = []
    if (similar) {
        similarProducts = similar.map((product, idx) => (
            <div className='item' data-value={idx} key={product._id} >
                <SimilarProduct {...product} />
            </div >
        ))
    }
    console.log(similar, similarProducts)
    return (
        <Container className='pt-4' style={{ position: 'relative' }}>
            <Row>
                <Col lg={6}>
                    <AliceCarousal mouseTracking items={images} controlsStrategy="alternate" />
                </Col>
                <Col lg={6} className='pt-4'>
                    <h1>{product.name}</h1>
                    <p>
                        <Badge bg='primary'>{product.category}</Badge>
                    </p>
                    <p className="prodcut__price">${product.price}</p>
                    <p style={{ textAlign: 'justify' }} className="py-3">
                        <strong>Description:</strong> {product.description}
                    </p>
                    {user && !user.isAdmin && (
                        <ButtonGroup style={{ width: '90%' }}>
                            <Form.Select size='lg' style={{ width: '40%', borderRadius: '0' }}  >
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                                <option value='4'>4</option>
                                <option value='5'>5</option>
                            </Form.Select>
                            <Button size='lg' disabled={!user}>
                                Add to cart
                            </Button>
                        </ButtonGroup>
                    )}
                    {user && user.isAdmin && (
                        <LinkContainer to={`/product/${id}/edit`}>
                            <Button size='lg' >Edit Prouct</Button>
                        </LinkContainer>
                    )}
                </Col>
            </Row>
            <div className="my-4">
                <h2>Similar Products</h2>
                <div className="d-flex justify-content-center align-items-center flex-wrap">
                    <AliceCarousal mouseTracking items={similarProducts} responsive={responsive} controlsStrategy="alternate" />
                </div>
            </div>
        </Container>
    )
}
