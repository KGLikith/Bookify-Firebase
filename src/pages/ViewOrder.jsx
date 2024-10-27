import React, { useEffect, useState } from 'react'
import { usefirebase } from '../context/firebase'
import { useParams } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/esm/Button';
import { useNavigate } from 'react-router-dom';


const ViewOrders = () => {
    const firebase=usefirebase();
    const params=useParams();
    const navigate=useNavigate()
    const [orders, setorders] = useState([])
    const [bookname, setbookname] = useState("")

    useEffect(()=>{
        const user=firebase.getUser;
        if(user){
            firebase.fetchMyOrders(params.bookId).then(result=>{
                console.log("success")
                console.log(result.docs);
                setorders(result.docs)
            })
            firebase.getBookById(params.bookId).then((book)=>{
              setbookname(book.data().name)
            })
          }
    },[firebase])

    const handlesuccess=async(id)=>{
      firebase.updatestatus(params.bookId,id).then(result=>{
        console.log(result)
        window.location.reload(); 
      })
  }
    const handleReject=async(id)=>{
      firebase.deleteOrder(params.bookId,id).then(result=>{
        console.log(result)
        window.location.reload(); 
      })
    }
  return (
    <>
      <div className="container">
        <h1 style={{textAlign:"center",margin:"10px"}}>{bookname}</h1>
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>User Id</th>
              <th>Quantity</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
          {
            orders.map((order,id)=>{
              const data=order.data()
              
              return <tr key={id}>
                <td>{id+1}</td>
                <th>{data.displayName || "Unknown"}</th>
                <td>{data.email}</td>
                <td>{data.userId}</td>
                <td>{data.qty}</td>
                {data.approved? <td>Approved</td> :
                <td><Button onClick={e=>handlesuccess(order.id)} variant='success'>Accept</Button> or <Button onClick={e=>handleReject(order.id)} variant='danger'>Reject</Button></td>
                }
              </tr>
            })
          }
          </tbody>
        </Table>
      </div>
    </>
  )
}

export default ViewOrders