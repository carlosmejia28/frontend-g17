import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import Inicio from '../pages/Inicio';
import Contacto from '../pages/Contacto';
import Nosotros from '../pages/Nosotros';
import Clientes from "../pages/Clientes";
import Layout from "../containers/Layout";
import NotFound from "../pages/NotFound";
import NewCliente from "../pages/NewCliente";


function App() {
  return (
    <BrowserRouter>
      <Layout>              
     <Switch>
       <Route exact path="/contacto" component={Contacto}/>
       <Route exact path="/nosotros" component={Nosotros}/>
       <Route exact path="/cliente" component={Clientes}/>
       <Route exact path="/nuevo_cliente" component={NewCliente}/>
       <Route exact path="/" component={Inicio}/>
       <Route path="*" component={NotFound}/>
     </Switch>
     </Layout>
    </BrowserRouter>
  );
}

export default App;
