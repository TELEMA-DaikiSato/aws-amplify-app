import React , {useState} from 'react';
import './style/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import List from './componets/List';
import Detail from './pages/Detail';
import FormArea from './pages/FormArea';

type InputData = {
  name: string;
  email: string;
  companyName: string;
  catchPhrase: string;
}

const App: React.FC = () => {
  const [inputData, setIputData] = useState<InputData[]>([]);
  return (
    <Router>
      <div className="App-header">
        <Routes>
          <Route path="/" element={<List />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/edit/:id" element={<FormArea setIputData={setIputData}/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;