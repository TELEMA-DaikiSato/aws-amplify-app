import React , {useState, useEffect}from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from "./style/App.module.css";
import Spinner from 'react-bootstrap/Spinner';

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


const Detail: React.FC  = () => {

  // API通信を行いデータを取得する
  const { id } = useParams();
  const BASE_URL = "https://jsonplaceholder.typicode.com/users/";
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    axios.get(BASE_URL + id)
      .then((response) => {
        // console.log(response.data)
        setUser(response.data);
      })
      .catch((error) => {
        console.log('失敗', error);
      });
  }, []);

  if (!user) {
    return <Spinner animation="grow" />
  }

  return (
    <div>
      <div className="container">
        <div className="col-md-12">
          <h1 className="text-center mt-5 mb-5">ユーザー詳細情報</h1>
          <div className="row">
            <div className="col-md-3">
              <h3>User Name：</h3>
            </div>
            <div className="col-md-9">
              <h3>{user.name}</h3>
            </div>
            <div className="col-md-3">
              <h3>email：</h3>
            </div>
            <div className="col-md-9">
              <h3>{user.email}</h3>
            </div>
            <div className="col-md-3">
              <h3>companyName：</h3>
            </div>
            <div className="col-md-9">
              <h3>{user.company.name}</h3>
            </div>
            <div className="col-md-3">
              <h3>catchPhrase：</h3>
            </div>
            <div className="col-md-9">
              <h3>{user.company.catchPhrase}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detail