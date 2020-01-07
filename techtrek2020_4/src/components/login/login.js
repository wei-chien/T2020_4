// import external modules
import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import {
  Row,
  Col,
  Input,
  Form,
  FormGroup,
  Button,
  Label,
  Card,
  CardBody,
  CardFooter
} from "reactstrap";
import axios from "axios";
import Logo from "../../assets/img/dbs_logo.png"

class Login extends Component {
  constructor() {
    super();
    this.persons = [
        {user: "marytan",
         password: "1234"},
         {user: "limzeyang",
         password: "12345"},
         {user: "ahmadfarhan",
         password: "123456"}   
    ]
    this.state = {
      isChecked: true,
      loginUser: "",
      loginPassword: "",
      customerID: 0,
    };
  }

  handleChecked = e => {
    this.setState(prevState => ({
      isChecked: !prevState.isChecked
    }));
  };

 authenticated(username, password) {
    
    for (let i = 0; i < this.persons.length; ++i)
    {
        console.log(this.persons[i].user, this.persons[i].password)
        if(this.persons[i].user.trim() === username && this.persons[i].password === password)
        {
            return true;
        }
    }
    return false;
 }

  loginClick = e => {
    console.log(this.state.loginUser, this.state.loginPassword)
    if (this.authenticated(this.state.loginUser, this.state.loginPassword)) {
      console.log("authenticated")
      try {
        // retrieve customer id via api call once authenticated
        axios({
          url: 'http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/customers/'+this.state.loginUser,
          method: 'get',
          headers: {
              'Identity': 'T34',
              'Token': 'd79274df-a679-4b34-9aa9-7a857c22c48a'
          }
       }).then(response => {
             console.log(response.data.customerId);
             this.customerID = response.data.customerId;
             console.log(this.customerID);
          });
      } catch(e) {
          console.log(e);
      }  
      this.props.history.push("/home");
    } else if (this.state.loginUser == "" || this.state.loginPassword == "") {
      alert("Missing login information");
    }
  };

  handleUserChange = e => {
    this.setState({ loginUser: e.target.value });
  };

  handlePasswordChange = e => {
    this.setState({ loginPassword: e.target.value });
  };

  render() {
    return (
      <div className="container">
        <Row className="full-height-vh">
          <Col
            xs="12"
            className="d-flex align-items-center justify-content-center"
          >
            <Card className="gradient-celestial text-center width-400">
              <CardBody>
                <img src={Logo} height="42px" width="100px" alt="logo"></img>
                <h2 className="white py-4">Login</h2>

                <Form className="pt-2">
                  <FormGroup>
                    <Col md="12">
                      <Input
                        onChange={this.handleUserChange}
                        type="user"
                        className="form-control"
                        name="inputUser"
                        id="inputUser"
                        placeholder="User"
                        required
                      />
                    </Col>
                  </FormGroup>

                  <FormGroup>
                    <Col md="12">
                      <Input
                        onChange={this.handlePasswordChange}
                        type="password"
                        className="form-control"
                        name="inputPass"
                        id="inputPass"
                        placeholder="Password"
                        required
                      />
                    </Col>
                  </FormGroup>

                  <FormGroup>
                    <Row>
                      <Col md="12">
                        <div className="custom-control custom-checkbox mb-2 mr-sm-2 mb-sm-0 ml-3">
                          <Input
                            type="checkbox"
                            className="custom-control-input"
                            checked={this.state.isChecked}
                            onChange={this.handleChecked}
                            id="rememberme"
                          />
                          <Label
                            className="custom-control-label float-left white"
                            for="rememberme"
                          >
                            Remember Me
                          </Label>
                        </div>
                      </Col>
                    </Row>
                  </FormGroup>
                  <FormGroup>
                    <Col md="12">
                      <Button
                        color="danger"
                        block
                        className="btn-pink btn-raised"
                        onClick={this.loginClick}
                      >
                        Submit
                      </Button>
                      <Button
                        type="button"
                        color="secondary"
                        block
                        className="btn-raised"
                      >
                        Cancel
                      </Button>
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
              <CardFooter>
                <div className="float-left">
                  <NavLink to="/pages/forgot-password" className="text-white">
                    Forgot Password?
                  </NavLink>
                </div>
                <div className="float-right">
                  <NavLink to="/pages/register" className="text-white">
                    Register Now
                  </NavLink>
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Login;