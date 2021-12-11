import axios from 'axios'
import React, { useState } from 'react'
import { Container, Form } from 'react-bootstrap'
import { useHistory } from 'react-router'
import Swal from 'sweetalert2'
import NavBar from '../components/NavBar'

const NewCliente = () => {

    const history = useHistory();

    const [data, setData] = useState({
        nombre:"",
        apellido:"",
        fRegistro:new Date().toISOString(),
        telefono:"",
        puntos:""})

    const handleChange =  ({target}) => {
        setData({
            ...data,
            [target.name]:target.value
        })
    }

    const URL="http://132.226.214.88:8080/cliente";
    const handleSubmit = async (e) =>{
        e.preventDefault();
        const response = await axios.post(URL,data);

        if(response.status===200){
            Swal.fire(
                "Guardado!",
                `El cliente con id: ${response.data.id} ha sido guardado!`,
                "success"
            )
            history.push("/cliente")
        }else{
            console.log(response.status,response)
            Swal.fire(
                "Error",
                "Problemas al crear el registro",
                "error"
            )
        }
    }
    return (
        <Container>
            <NavBar/>
            <h1 className="text-center">Nuevo Cliente</h1>
            <Container className="col-md-5 mx-auto">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Control
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    required
                    value={data.nombre}
                    onChange={handleChange}
                    >
                    </Form.Control >
                </Form.Group >
                <Form.Group className="mb-3">
                    <Form.Control
                    type="text"
                    name="apellido"
                    placeholder="Apellido"
                    required
                    value={data.apellido}
                    onChange={handleChange}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control
                    type="text"
                    name="telefono"
                    placeholder="Telefono"
                    required
                    value={data.telefono}
                    onChange={handleChange}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control
                    type="number"
                    name="puntos"
                    placeholder="Puntos"
                    required
                    value={data.puntos}
                    onChange={handleChange}
                    >
                    </Form.Control>
                </Form.Group>
                <button className="btn btn-success">Guardar</button>
            </Form>
            
        </Container>
        </Container>
    )
}

export default NewCliente
