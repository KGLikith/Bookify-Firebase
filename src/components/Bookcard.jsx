import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { usefirebase } from '../context/firebase';
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Bookcard(props) {
    const [url, seturl] = useState("")
    const navigate=useNavigate();

    const firebase=usefirebase();
    useEffect(()=>{
        firebase.getImageurl(props.imageURL).then(url=>{
            seturl(url)
        })
    },[])

  return (
    <Card style={{ width: '18rem',display:'flex', flexDirection:"column", justifyContent:"space-between",margin:'10px', padding:'10px' }}>
      <Card.Img variant="top" style={{minHeight:"50%"}} src={url}  />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>${props.price}</Card.Text>
        <Card.Text>This book has a text</Card.Text>
        <Button variant="primary" onClick={e=>navigate(props.url)}>{props.txt}</Button>
      </Card.Body>
    </Card>
  );
}

export default Bookcard;