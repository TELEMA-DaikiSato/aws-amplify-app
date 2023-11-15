import React , {useState, useEffect} from 'react'
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

type InputData = {
  name: string;
  email: string;
  companyName: string;
  catchPhrase: string;
} 

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


interface FormAreaProps {
  setIputData: React.Dispatch<React.SetStateAction<InputData[]>>;
}

const  FormArea: React.FC<FormAreaProps> = ({ setIputData }) => {
  // パラメータ情報取得
  const { id } = useParams();

  // API通信でデータを取得
  const BASE_URL = "https://jsonplaceholder.typicode.com/users/";
  const [user, setUser] = useState<User | null>(null); 
  useEffect(() => {
    axios.get(BASE_URL + id)
      .then((response) => {
        console.log(response.data)
        setUser(response.data);
      })
      .catch((error) => {
        console.log('失敗', error);
      });
  }, []);

  const  {
    register,
    handleSubmit,
  } = useForm<InputData>({ mode: 'onChange' });
  
  const onSubmit = (data: InputData) => {
    console.log(data);
  }

  if (!user) {
    return <Spinner animation="grow" />
  }

  return (
    <div className="container">
        <div className="row">
          <h1 className="text-center">送信フォームテスト</h1>
          <div className="col-md-12 mt-5">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-md-3">
                    <Form.Label htmlFor="inputPassword5">ユーザー名</Form.Label>
                  </div>
                  <div className="col-md-6">
                    <Form.Control
                      {...register("name", {
                        required: "名前を入力してください",
                      })}
                      defaultValue={user.name}
                    />
                  </div>
                </div>
                <div className="row mt-5">
                  <div className="col-md-3">
                    <Form.Label htmlFor="inputPassword5">email</Form.Label>
                  </div>
                  <div className="col-md-6">
                    <Form.Control
                      {...register("email", {
                        required: "emailを入力してください",
                      })}
                      aria-describedby="passwordHelpBlock"
                      defaultValue={user.email}
                    />
                  </div>
                </div>
                <div className="row mt-5">
                  <div className="col-md-3">
                    <Form.Label htmlFor="inputPassword5">会社名</Form.Label>
                  </div>
                  <div className="col-md-6">
                    <Form.Control
                      {...register("companyName", {
                        required: "companyNameを入力してください",
                      })}
                      aria-describedby="passwordHelpBlock"
                      defaultValue={user.company.name}
                    />
                  </div>
                </div>
                <div className="row mt-5">
                  <div className="col-md-3">
                    <Form.Label htmlFor="inputPassword5">メッセージ</Form.Label>
                  </div>
                  <div className="col-md-6">
                    <Form.Control 
                      {...register("catchPhrase", {
                        required: "メッセージを入力してください",
                      })}
                      as="textarea" 
                      defaultValue={user.company.catchPhrase}
                      rows={6}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <Button variant="primary" type="submit">送信</Button>
                </div>
            </form>
          </div>
        </div>
    </div>
  )
}

export default FormArea