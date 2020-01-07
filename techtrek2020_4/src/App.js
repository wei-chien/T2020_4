import React, { Component } from "react"
import "./App.css"
import Login from "./components/login/login"
import Home from "./components/home/home"
import ProtectedRoute from './protected.route/protected.route'
import {BrowserRouter, Route, Switch} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';


function App(){
    // var app = express()
    // app.use(function(req, res, next) {
    //   res.header("Access-Control-Allow-Origin", "*");
    //   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //   next();
    // });
    return (
      <div align="center" className="backGround">
        <nav>Some nav bar</nav>
         <BrowserRouter>
         
         <Switch>
        <Route exact path ="/" component = {Login}/>
        <ProtectedRoute exact path ="/home" component = {Home}/>
        <Route path ="*" component = {()=>"404 Not Found"}/>
        </Switch>
        </BrowserRouter>
      </div>
    )
  
}

export default App;