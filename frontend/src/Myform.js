import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

function Myform (props) {
  
  const Navigate = useNavigate();
    function postform(){
        var email=document.getElementById("email").value
        var dept=document.getElementById("department").value
        var comp=document.getElementById("complaint").value
        var empid=document.getElementById("empid").value
        axios.post('http://localhost:5000/data',{
          params:{
          "empid":empid,
          "email":email,
          "dept":dept,
          "comp":comp
          }
        })
        .then(function (response) {
            console.log(response);
            window.location.reload(true)
        })
        
        Navigate('/ticket');
        
    }
  return (
      <Container className="mt-3">
        <h2 className="text-center">Complaint Details</h2>
        <Form onSubmit={postform}>
          <Form.Group className="mb-2">
            <Form.Label>Employee ID</Form.Label>
            <Form.Control
              placeholder="Enter your EmpID"
              id="empid" required
              value={props.myCookie.empid}
              readOnly
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter the email"
              id="email" required
              value={props.myCookie.username}
              readOnly
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Department</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the Department"
              id="department" required
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Complaint</Form.Label>
            <Form.Control
              as="textarea"
              style={{ height: '250px' ,marginBottom:10,marginTop:10}}
              placeholder="Enter the Complaint"
              id="complaint" required
            />
            <Form.Text className="text-muted">
              Elaborate your complaint well, this will help us to better
              understand the problem
            </Form.Text>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    
  );
}

export default Myform;