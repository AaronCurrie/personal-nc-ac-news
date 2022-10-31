import './App.css';

import { useState } from 'react'

import { Routes, Route} from 'react-router-dom';

import Header from './Components/Header';
import MainPage from './Components/MainPage';
import SingleArticle from './Components/SingleArticle';

function App() {

  return (
    <div className="App">
      <Header/>
        <Routes>
          <Route path='/' element ={<MainPage/>}/>
          <Route path='/:topic' element={<MainPage/>}/>
          <Route path='/:article_id' element={<SingleArticle/>}/>
        </Routes>
    </div>
  );
}

export default App;
