import React, { useEffect } from 'react'
import { useState } from 'react'
import './style/NewProduct.css'
import { useNavigate } from 'react-router-dom'
import { useUpdateProductMutation } from '../services/appApi'
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap'
import axios from '../axios'
import { useParams } from 'react-router-dom'
export default function EditProductPage() {
    const { id } = useParams()
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")
    const [images, setImages] = useState([])
    const [imgToRemove, setImgToRemove] = useState(null)
    const navigate = useNavigate()
    const [updateProduct, { isError, isLoading, error, isSuccess }] = useUpdateProductMutation()

    useEffect(() => {
        axios.get(`/products/${id}`)
            .then(({ data }) => {
                const product = data.product
                setName(product.name)
                setPrice(product.price)
                setCategory(product.category)
                setDescription(product.description)
                setImages(product.pictures)
            })
            .catch((e) => console.log(e))
    }, [id])


    const showWidget = () => {
        const widget = window.cloudinary.createUploadWidget(
            {
                cloudName: 'indvidual',
                uploadPreset: 'bqly13tv',
            },
            (error, result) => {
                if (!error && result.event === "success") {
                    setImages((perv) => [
                        ...perv, { url: result.info.url, public_id: result.info.public_id }
                    ])
                }
            }
        )
        widget.open()
    }

    const handleRemoveImg = (imgObj) => {
        setImgToRemove(imgObj.public_id)
        axios.delete(`/images/${imgObj.public_id}/`)
            .then((res) => {
                setImgToRemove(null)
                setImages(prev => prev.filter((img) => img.public_id !== imgObj.public_id))
            })
            .catch(err => console.log(err))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!name || !description || !price || !category || !images.length) {
            return alert('please fill out all the fields')
        }
        updateProduct({ id, name, description, price, category, images }).then(({ data }) => {
            if (data.length > 0) {
                setTimeout(() => {
                    navigate(`/${id}`)
                }, 1500);
            }
        })
    }
    return (
        <Container>
            <Row>
                <Col md={6} className="new-product__form--container">
                    <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
                        <h1 className="mt-4">Edit product</h1>
                        {isSuccess && <Alert variant="success">Product updated with succcess</Alert>}
                        {isError && <Alert variant="danger">{error.data}</Alert>}
                        <Form.Group className="mb-3">
                            <Form.Label>Product name</Form.Label>
                            <Form.Control type="text" placeholder="Enter product name" value={name} required onChange={(e) => setName(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Product description</Form.Label>
                            <Form.Control as="textarea" placeholder="Product description" style={{ height: "100px" }} value={description} required onChange={(e) => setDescription(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Price($)</Form.Label>
                            <Form.Control type="number" placeholder="Price ($)" value={price} required onChange={(e) => setPrice(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" onChange={(e) => setCategory(e.target.value)} >
                            <Form.Label>Category</Form.Label>
                            <Form.Select value={category}>
                                <option disabled selected>
                                    -- Select One --
                                </option>
                                <option value="technology">Technology</option>
                                <option value="tablets">Tablets</option>
                                <option value="phones">Phones</option>
                                <option value="laptops">Laptops</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Button type="button" onClick={showWidget}>
                                Upload Images
                            </Button>
                            <div className="images-preview-container">
                                {images.map((image, i) => (
                                    <div className="image-preview" key={i}>
                                        <img src={image.url} style={{ border: "1px solid #000" }} />
                                        {imgToRemove !== image.public_id && <i className="fa fa-times-circle" onClick={() => handleRemoveImg(image)}></i>}
                                    </div>
                                ))}
                            </div>
                        </Form.Group>

                        <Form.Group>
                            <Button type="submit" disabled={isLoading || isSuccess}>
                                Update Product
                            </Button>
                        </Form.Group>
                    </Form>
                </Col>
                <Col md={6} className="new-product__image--container"></Col>
            </Row>
        </Container>
    )
}

