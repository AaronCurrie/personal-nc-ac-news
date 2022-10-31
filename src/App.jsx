import './App.css';

import { useState } from 'react'

import Header from './Components/Header';
import MainPage from './Components/MainPage';

function App() {

  const [searchObj, setSearchObj] = useState({})

  return (
    <div className="App">
      <Header/>
      <MainPage searchObj={searchObj} setSearchObj={setSearchObj}/>
    </div>
  );
}

export default App;
