import React, {useEffect , useState} from 'react'
import axios from 'axios'
import { Modal, ModalBody, ModalFooter, ModalTitle } from 'react-bootstrap'
import * as ReactBootStrap from "react-bootstrap";
import Swal from 'sweetalert2'


const TableCliente = () => {
    const baseURL="http://132.226.214.88:8080/cliente/"
    const [data , setData] = useState([])

    const peticionGet = async () => {
            await axios(baseURL)
            .then(response=>{
              setData(response.data);
            }).catch(error=>{
              console.log(error)
            })}
           useEffect(() =>{
        peticionGet();
        },[setData]);

    const peticionPost = async () =>{
      await axios.post(baseURL,clienteSeleccionado)
      .catch(error=>{
        console.log(error);
      })
      peticionGet();
      setModalEditar(false);
    }

    const peticionDelete=async()=>{
      await axios.delete(baseURL+clienteSeleccionado.id)
      .then(response =>{
        setData(data.filter(cliente=>cliente.id!==clienteSeleccionado.id));
        setModalEliminar(false);
        Swal.fire(
          "confirmado",
          response.data,
          "warning"
        )
      }).catch(error =>{
        console.log(error);
      })
    }

    const[modalEditar, setModalEditar]=useState(false);
    const[modalEliminar , setModalEliminar]=useState(false);
    const[clienteSeleccionado, setClienteSeleccionado]=useState({
      nombre:"",
      apellido:"",
    })

    const seleccionarCliente=(elemento)=>{
      setClienteSeleccionado(elemento);
      setModalEditar(true);
    }

    const seleccionarClienteDelete=(elemento)=>{
      setClienteSeleccionado(elemento);
      setModalEliminar(true);
    }

    const handleChange=e=>{
      const{name,value}=e.target;
      setClienteSeleccionado((prevState)=>({
        ...prevState,
        [name]:value
      }));
    }

    const [datosBusqueda,setDatosBusqueda]=useState(
      {
        caja:"",
        filtro:"1"
      }
    )
    const handleInputChange=e=>{
      const{name,value}=e.target;
      setDatosBusqueda((prevState)=>({
        ...prevState,
        [name]:value
      }));
    }

    const buscarClientes = async ()=>{

      switch (datosBusqueda.filtro) {
        case "1":
          await axios.get(baseURL+datosBusqueda.caja)
          .then(response=>{
            if(response.data !==null && !Array.isArray(response.data)){
              setData([response.data])}           
            else{
                Swal.fire(
                  "No hay resultado",
                  "",
                  "info")}
          }).catch(error=>{
            console.log(error);
          })
          break;

        case "2":
          await axios.get(baseURL+"nombre/"+datosBusqueda.caja)
          .then(response =>{
            if(response.data !==null){
              if(response.data.length !==0){
                setData(response.data);
              }else{
                Swal.fire(
                  "No hay resultado",
                  "",
                  "info")
            }              
            }else{
              Swal.fire(
                "No hay resultado",
                "",
                "info")
            }
          })
          break;

        case "3":

          if(!isNaN(datosBusqueda.caja) && datosBusqueda.caja!==""){
            await axios.get(baseURL+"puntos/"+datosBusqueda.caja)
            .then(response=>{
              if(response.data.length !==0){
                setData(response.data);
              }else{
                Swal.fire(
                  "No hay resultado",
                  "",
                  "info")
              }
            }).catch(error =>{
              console.log(error);
            })
          }else{
            Swal.fire(
              "No introdujo un valor numerico",
              "",
              "info")
          }

          break;         
      
        default:
          break;
      }

    }
    return (
        <div>

<ReactBootStrap.Form>
                <ReactBootStrap.Row>

                    <ReactBootStrap.Col xs="auto" className="my-1">
                        <ReactBootStrap.Form.Control  name="caja" onChange={handleInputChange} placeholder="Ingresa Busqueda"/>
                    </ReactBootStrap.Col>

                    <ReactBootStrap.Col xs="auto" className="my-1">
                        <ReactBootStrap.Form.Select name="filtro" onChange={handleInputChange}>
                            <option value="1">Id</option>
                            <option value="2">Nombre</option>
                            <option value="3">Puntos</option>
                        </ReactBootStrap.Form.Select>
                    </ReactBootStrap.Col>

                    <ReactBootStrap.Col xs="auto" className="my-1">
                        <ReactBootStrap.Button onClick={()=>buscarClientes()}>Buscar</ReactBootStrap.Button>
                    </ReactBootStrap.Col>

                    <ReactBootStrap.Col className="my-1 d-md-flex justify-content-md-end">
                        <ReactBootStrap.Button className="btn-success" href="/nuevo_cliente">Nuevo Cliente</ReactBootStrap.Button>
                    </ReactBootStrap.Col>

                </ReactBootStrap.Row>
            </ReactBootStrap.Form>

           <table className="table table-hover">
  <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Nombre</th>
      <th scope="col">Apellido</th>
      <th scope="col">Telefono</th>
      <th scope="col">Puntos</th>
      <th scope="col">Fecha</th>
      <th scope="col">Departamento</th>
      <th scope="col">Ciudad</th>
      <th scope="col">Acciones</th>
    </tr>
  </thead>
  <tbody>
        {
        data.map((cliente) =>(
        <tr key={cliente.id}>
            <td>{cliente.id}</td>
            <td>{cliente.nombre}</td>
            <td>{cliente.apellido}</td>
            <td>{cliente.telefono}</td>
            <td>{cliente.puntos}</td> 
            <td>{cliente.fRegistro}</td>
            <td>{cliente.address !==null ? cliente.address.departamento : "sin definir" }</td>
            <td>{cliente.address !==null ? cliente.address.ciudad : "sin definir" }</td>
            <td><button className="btn btn-primary" onClick={()=>seleccionarCliente(cliente)} >Editar</button> {"   "} 
              <button className="btn btn-danger"onClick={()=>seleccionarClienteDelete(cliente)}>Eliminar</button></td>       
        </tr>
        ))
        }    
  </tbody>
</table>
            <Modal show={modalEditar}>
              <ModalTitle>
                <h2>Editar Cliente</h2>
              </ModalTitle>
              <ModalBody>
                <div className="form-group">
                  <label>Id</label>
                  <input className="form-control"
                  readOnly
                  type="text"
                  value={clienteSeleccionado.id}
                  />
                  <br/>
                  <label>Nombre</label>
                  <input className="form-control"
                  type="text"
                  name="nombre"
                  value={clienteSeleccionado.nombre}
                  onChange={handleChange}
                  />
                  <br/>
                  <label>Apellido</label>
                  <input className="form-control"
                  type="text"
                  name="apellido"
                  value={clienteSeleccionado.apellido}
                  onChange={handleChange}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <button className="btn btn-primary" onClick={()=>peticionPost()}>Actualizar</button>
                <button className="btn btn-danger" onClick={()=>setModalEditar(false)}>Cancelar</button>
              </ModalFooter>
            </Modal>

            <Modal show={modalEliminar}>
              <ModalBody>
                ¿Esta seguro que desea eliminar al cliente {clienteSeleccionado.nombre}?
              </ModalBody>
              <ModalFooter>
                <button className="btn btn-danger" onClick={()=>peticionDelete()}>Si</button>
                <button className="btn btn-secundary" onClick={()=>setModalEliminar(false)}>No</button>
              </ModalFooter>

            </Modal>

        </div>
    )
}

export default TableCliente
