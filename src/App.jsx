import { useState } from 'react'
import { usefirebase } from './context/firebase'
import { Route,Routes,Link } from 'react-router-dom';
import Register from './pages/register';
import Login from './pages/login';
import Home from './pages/Home';
import NavBar from './components/Navbar';
import Listing from './pages/Listing';
import UserBookList from './pages/userBookList';
import BookDetail from './pages/BookDetail';
import ViewOrders from './pages/ViewOrder';

function App() {

  const firebase=usefirebase();

  return (
    <>
      <NavBar></NavBar>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/register' element={<Register/>}> </Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/book/list' element={<Listing/>}></Route>
        <Route path='/book/userlist' element={<UserBookList/>}></Route>
        <Route path='/book/view/:bookId' element={<BookDetail/>}></Route>
        <Route path='/book/userlist/:bookId/' element={<ViewOrders/>}></Route>
      </Routes>
    </>
  )
}

export default App
