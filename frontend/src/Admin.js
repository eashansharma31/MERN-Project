import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Mycard from './Mycard';
import { useEffect, useState } from 'react';

function Admin(props) {
  var len=0; 
  var i=0;  
  var plist=[]
  var rlist=[]
  const [resolved,setresolve]=useState([])
  const [pending,setpending]=useState([])
  useEffect(()=>{
    axios.get('http://localhost:5000/alldata')
    .then(response => {
      len=response['data'].length
      for (i;i<len;i++){
        if (response['data'][i]['resolved']===true){
            rlist.push(<Mycard key={i} email={response['data'][i]['email']} complaint={response['data'][i]['complaint']} 
            empid={response['data'][i]['empid']}
            comment={response['data'][i]['response']}
            resolved={response['data'][i]['resolved']}
            dept={response['data'][i]['dept']}
            id={response['data'][i]['_id']} 
            myCookie={props.myCookie}/>)

        }
        else{
            plist.push(<Mycard key={i} email={response['data'][i]['email']} complaint={response['data'][i]['complaint']} 
            empid={response['data'][i]['empid']}
            comment={response['data'][i]['response']}
            resolved={response['data'][i]['resolved']}
            dept={response['data'][i]['dept']}
            id={response['data'][i]['_id']} 
            myCookie={props.myCookie}/>)
        }
      }
      setpending(plist)
      setresolve(rlist)
  })
  },[]);
  
    
  return (
    <Container id="container" className='mb-2'>
      <h1 className='text-center mt-2'>Pending Tickets</h1>
      {pending}
      <h1 className='text-center mt-2'>Resolved Tickets</h1>
      {resolved}
    </Container>
  );
  }

export default Admin;