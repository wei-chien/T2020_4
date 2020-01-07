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
    this.state = {
      isChecked: true,
      loginEmail: "",
      loginPassword: "",
      persons: []
    };
  }

  handleChecked = e => {
    this.setState(prevState => ({
      isChecked: !prevState.isChecked
    }));
  };

  loginClick = e => {
    if (
      this.state.loginEmail == "test@hotmail.com" &&
      this.state.loginPassword == "12345678"
    ) {
      this.props.history.push("/home");
    } else if (this.state.loginEmail == "" || this.state.loginPassword == "") {
      alert("Missing login information");
    } else if (this.state.loginEmail !== "test@hotmail.com") {
      alert("Incorrect email address");
    } else if (this.state.loginPassword !== "12345678") {
      alert("Incorrect password");
    }
  };

  handleEmailChange = e => {
    this.setState({ loginEmail: e.target.value });
  };

  handlePasswordChange = e => {
    this.setState({ loginPassword: e.target.value });
  };

  //API call
  async componentDidMount() {
    try {
       //Api call with parameters.
       //axios.get('https://site.com/?name=Flavio')
      // axios.get("https://site.com/", {
      //   params: {
      //     name: "Flavio"
      //   }
      // });
      axios
        .get("http://dummy.restapiexample.com/api/v1/employees")
        .then(res => {
          //check value
          const persons = res.data;
          this.setState({ persons });
        });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    if (this.state.persons.length > 0) {
      console.log(this.state.persons[0]);
    }
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
                        onChange={this.handleEmailChange}
                        type="email"
                        className="form-control"
                        name="inputEmail"
                        id="inputEmail"
                        placeholder="Email"
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