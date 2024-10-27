import React, { useEffect, useState } from 'react'
import { usefirebase } from '../context/firebase'
import Bookcard from '../components/Bookcard'
import CardGroup from 'react-bootstrap/CardGroup';

const UserBookList = () => {

    const firebase=usefirebase();
    const [books,setBooks]=useState([])

    useEffect(()=>{
      const user=firebase.getUser;
      if(user)
        firebase.getUserbooks(user.email).then(docs=>{
            setBooks(docs.docs)
        })
    else{
        setBooks([])
    }
      
    },[firebase])

  return (
    <>
      <div className="container mt-5">
      <h1>UserBookList</h1>
      <div style={{display:'flex',gap:'10px'}}>
      {
        books.map((book)=>{
          return <Bookcard key={book.id} id={book.id} url={`${book.id}`} txt={"check Orders"} {...book.data()}/>
        })
      }
      </div>
        </div>
    </>
  )
}

export default UserBookList