import Form from "react-bootstrap/Form";
import Container from 'react-bootstrap/Container';
import Button from "react-bootstrap/Button";

import Cookies from 'universal-cookie';


function Login(props) {
  const cookies = new Cookies();
  async function loginuser(event){
    event.preventDefault();
    var username=document.getElementById("email").value
    var password=document.getElementById("pass").value
    var data={
      "username":username,
      "password":password,

    }
    await fetch('http://localhost:5000/login',{
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        let expiry=data.cookie.expires
        cookies.set('cred', data, { path: '/'},{expires:expiry});
        if(data.msg==="Successfull Login"){
          alert("Login Successfull")
          window.location.href="/"
        }
        else{
          console.log(props.myCookie.username)
          alert("Incorrect Username or Password")
        }
    });  
  }
    return (
      <Container className="mt-3">
          <h2 className="text-center">Login Details</h2>
          <Form  onSubmit={loginuser}>
              <Form.Group className="mb-2">
                <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter the email"
                    id="email" required
                  />
             </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    placeholder="Enter your password"
                    id="pass" required
                    type="password"
                  />
              </Form.Group>
                <Button className="mt-3" variant="primary" type="submit" >
                Login
                </Button>
            </Form>
        </Container>
    );
  }
  
export default Login;
  