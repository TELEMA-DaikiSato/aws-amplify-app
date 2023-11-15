import React , {useState, useEffect} from 'react'
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import icon from "../images/icon.jpg"


interface Geo {
  lat: string;
  lng: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

const List: React.FC  = () => {
  const BASE_URL = "https://jsonplaceholder.typicode.com/users";
  const [usersData, setUsersData] = useState<User[] | null>(null);

  useEffect(() => {
    axios.get(BASE_URL)
      .then((response) => {
        setUsersData(response.data);
      })
      .catch((error) => {
        console.log('失敗', error);
      });
  }, []);


  return (
    <div>
      {usersData !== null ? (
          <div className="container">
            <h1 className="text-center">ユーザー情報リスト</h1>
            <div className="col-md-12">
              <div className="row">
                {usersData.map((user) => (
                  <div className="col-md-3 h-100" key={user.id}>
                    <Card style={{ width: '18rem', height:'100%' }}>
                      <Card.Img variant="top" src={icon} />
                      <Card.Body>
                        <Card.Title> <h3>人物情報</h3> </Card.Title>
                          <Card.Text>{user.name}</Card.Text>
                          <Card.Text>{user.email}</Card.Text>
                          <Card.Text>{user.phone}</Card.Text>
                        <Card.Title> <h3>会社情報</h3> </Card.Title>
                          <Card.Text>{user.company.name}</Card.Text>
                          <Card.Text>{user.company.catchPhrase}</Card.Text>
                        <Button variant="primary">
                          <Link to={`/detail/${user.id}`}>詳細</Link>
                        </Button>
                        <Button variant="success">
                          <Link to={`/edit/${user.id}`}>編集</Link>
                        </Button>
                      </Card.Body>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>        
        
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default List