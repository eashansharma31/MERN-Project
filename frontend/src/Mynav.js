import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Myform from './Myform';
import Ticket from './Ticket';
import Container from 'react-bootstrap/Container';
import Admin from './Admin';
import Cookies from 'universal-cookie';
import { useState,useEffect } from 'react';
function Mynav(props) {
  const [myCookie, setMyCookie] = useState('');
  const cookies = new Cookies();
  useEffect(() => {
    const cred = cookies.get('cred');
    if (cred) {
      setMyCookie(cred);
    }
  }, []);
  function logoutuser(){
    cookies.remove('cred')
    setMyCookie('')
    
  }
  console.log(myCookie)
    return (
        <BrowserRouter>
          <Navbar bg="dark" variant="dark" style={{padding:0}}>
              <Container>
                <Navbar.Brand href="/">MERN</Navbar.Brand>
                <Nav className="me-auto">
                  {myCookie.username ?
                  <>
                   {myCookie.type ==='user' ?
                   <>
                    <Nav.Link href='/'>Home </Nav.Link> 
                    <Nav.Link href="/form">Form</Nav.Link>  
                    <Nav.Link href="/ticket">Mytickets</Nav.Link> 
                    <Nav.Link onClick={logoutuser} >Logout</Nav.Link> 
                  </>
                  :
                  <>
                    <Nav.Link href='/'>Home </Nav.Link>  
                    <Nav.Link href="/Admin" >Admin</Nav.Link>
                    <Nav.Link onClick={logoutuser}>Logout</Nav.Link>
                  </> 
                  }
                  </>:
                  <>
                    <Nav.Link href='/'>Home </Nav.Link> 
                    <Nav.Link href='/login'>Login </Nav.Link>
                  </>
                  }
                </Nav>
              </Container>
          </Navbar>
            <Routes>
              {myCookie.username ?
              <>
                {myCookie.type ==='user' ?
                  <>
                    <Route index element={<Home />} />
                    <Route exact path="/form" element={<Myform myCookie={myCookie} />} />
                    <Route exact path="/ticket" element={<Ticket myCookie={myCookie} />} />
                  </>
                  :
                  <>
                    <Route index element={<Home />} />
                    <Route exact path="/admin" element={<Admin myCookie={myCookie} />} />
                  </>
                }
              </>
              :
              <>
                <Route index element={<Home />} />
                <Route exact path="/login" element={<Login setMyCookie={setMyCookie} myCookie={myCookie}/>} />
              </>
              }  
            </Routes>
        </BrowserRouter>
      );
}
export default Mynav;