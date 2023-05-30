import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Mycard from './Mycard';
import { useEffect, useState } from 'react';

function Ticket(props) {
  var email="eashansharma31@gmail.com";
  var len=0; 
  var i=0;  
  var list=[]
  const [myarray,setarray]=useState([])
  useEffect(()=>{
    axios.get('http://localhost:5000/getdata/'+email)
    .then(response => {
      len=response['data'].length
      for (i;i<len;i++){
        list.push(<Mycard key={i} email={response['data'][i]['email']} complaint={response['data'][i]['complaint']} 
        empid={response['data'][i]['empid']}
        comment={response['data'][i]['response']}
        resolved={response['data'][i]['resolved']}
        dept={response['data'][i]['dept']}
        id={response['data'][i]['_id']} 
        myCookie={props.myCookie}/>)
      }
      setarray(list)
  })

  },[]);
  
    
  return (
    <Container id="container">
      <h1 className='text-center'>Mytickets</h1>
      {myarray}
    </Container>
  );
  }

export default Ticket;