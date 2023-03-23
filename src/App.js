// eslint-disable-next-line
import logo from './logo.svg';
import './App.css';

import { Container, Nav, Navbar } from 'react-bootstrap';
import { useState } from 'react';
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import Detail from './page/Detail';
import axios from 'axios';

function App() {
  let [title, setTitle] = useState(data);
  let navigate = useNavigate(); //페이지 이동을 도와주는 함수 

  return (
    <div className="App">
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/" className='shopName'>W A V E</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/" className='menu'>Home</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/detail')}} className='menu'>Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route path='/' element={
          <Main title={title} setTitle={setTitle}></Main>
        }></Route>

        <Route path='/detail/:id' element={
          <Detail title={title} ></Detail>
        }></Route>

        <Route path= '/about' element={<About></About>}>
          <Route path='member' element={<div>and member</div>}></Route>
          <Route path='location' element={<div>and location</div>}></Route>
        </Route>

        <Route path='/event' element={<Event></Event>}>
          <Route path='one' element={<div>free delivery for first order</div>}></Route>
          <Route path='two' element={<div>birthdat coupon</div>}></Route>
        </Route>


        <Route path='*' element={
          <h4>404</h4>
        }>
        </Route>
      </Routes>
      <div>
        <Link to='/'>home</Link>
      </div>
      <div>
        <Link to='/detail'>detail</Link>
      </div>
    </div>
  );

  function Main(props) {
    return (
      <>
        <div className='main-bg'> </div>
        <div className="container">
          <div className="row">
            {
              [...props.title].map((a, i) => {
                return (
                  <Card title={props.title[i]} key={i}></Card>
                )
              })
            }
          </div>
        </div>
        <button onClick={()=>{
          axios.get('/data.json') //url 
          .then((result)=>{ //result : 위 url로 요청해서 받아온 데이터 
            //console.log(result.data)
            // let copy = [...props.title];
            // for(let i = 0; i < result.data.length; i++){
            //   copy.push(result.data[i]);
            // }
            let copy = [...props.title, ...result.data];
            props.setTitle(copy); 
            console.log(copy)
          })
          .catch(()=>{  //요청 실패시 동작 할 코드 
            console.log('요청 실패')
          })

          // Promise.all([ axios.get('/url1', '/url2')])
          // .then(()=>{
          //   //위 두 get 요청이 완료 시 시작될 코드 
          // })
           
        }}>view more</button>
      </>
    )
  }

  function Card(props) {
    return (
      <div className="col-md-4">
        <img src={props.title.img} width='80%' onClick={()=>{
          window.location.href='/detail/' + props.title.id;
        }}></img>
        <h4>{props.title.title}</h4>
        <p>{props.title.price}</p>
      </div>
    )
  }

  function About(){
    return (
      <>
      <h4>
        about page 
      </h4>
      <Outlet></Outlet>
      </>
    )
  }

  function Event(){
    return(
      <>
      <h4>EVENT!</h4>
      <Outlet></Outlet>
      </>
    )
  }
}

export default App;
