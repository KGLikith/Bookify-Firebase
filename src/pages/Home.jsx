import React, { useEffect, useState } from 'react'
import { usefirebase } from '../context/firebase'
import Bookcard from '../components/Bookcard'
import CardGroup from 'react-bootstrap/CardGroup';

const Home = () => {

    const firebase=usefirebase();
    const [books,setBooks]=useState([])

    useEffect(()=>{
      firebase.getListAllBooks().then((docs)=>{
        
        setBooks(docs.docs)
      })
      
    },[])

  return (
    <>
      <div className="container mt-5">
      <h1>Home</h1>
      <div style={{display:'flex',gap:'10px'}}>
      {
        books.map((book)=>{
          return <Bookcard key={book.id} id={book.id} url={`/book/view/${book.id}`} txt={"Check Out"} {...book.data()}/>
        })   
      }
        </div>
        </div>
    </>
  )
}

export default Home