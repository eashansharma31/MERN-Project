import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
function Mycard(props) {
  const [showChildComponent, setShowChildComponent] = useState(false);
  var email=props.email;
  var complaint=props.complaint;
  var comment=props.comment;
  var resolved=props.resolved;
  var empid=props.empid;
  var dept=props.dept
  var id=props.id
  var type=props.myCookie.type
  function postcomment(){
    var comment=document.getElementById("myInput").value
    axios.post('http://localhost:5000/respond',{
      params:{
        "id":id,
        "response":comment,
      }
    })
    .then(response => {
      console.log(response)
    })
    window.location.reload(true);
  }
  function respond(){
    setShowChildComponent(true);
  }
  function resolve(){
    axios.post('http://localhost:5000/alldata',{
      params:{
        "id":id,
      }
    })
    .then(response => {
      console.log(response)
    })
    window.location.reload(true);
  }
  if (type==="admin"){
    return(
    <Container className='mt-2'>
    <Card>
    <Card.Body>
    <Card.Title>ID: {id}</Card.Title>
      <Card.Title>Empid: {empid}</Card.Title>
      <Card.Title >email: {email}</Card.Title>
      <Card.Title>Department: {dept}</Card.Title>
      <Card.Text>

        Complaint: {complaint}<br />
        Comment: {comment} <br />
         {resolved ?
          <p>Resolved:True</p>
        :
          <>
          <p>Resolved:False</p>
          <Button variant="warning mx-1 my-1" id="btn2"  value={id} onClick={respond} >Respond </Button>
          <Button variant="success  mx-1 my-1" id="btn"  value={id} onClick={resolve}>Resolve </Button>
          </>
        }
      </Card.Text>
      {showChildComponent && (
        <>
        <Form onSubmit={postcomment}>
        <InputGroup className="mb-3" >
        <Form.Control
          placeholder="Add comment"
          aria-label="Username"
          aria-describedby="basic-addon1"
          required
          id="myInput"
        />
      </InputGroup>
      <Button variant="success  mx-1 my-1"  id="btn3" type="submit" value={id}>Comment </Button>
      </Form>
      
      </>
      )}
      
    </Card.Body>
  </Card>
  </Container>)
  }
  else{
    return(
    <Container className='mt-2'>
      <Card>
      <Card.Body>
        <Card.Title>{email}</Card.Title>
        <div>
          Complaint: {complaint}<br />
          Comment: {comment} <br />
           {resolved ?
            <div>Resolved:True</div>
          :
          
            <div>Resolved:False</div>
          
          }
        </div>
      </Card.Body>
    </Card>
    </Container>
    );
  }
  }
export default Mycard;
