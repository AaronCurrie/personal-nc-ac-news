import './App.css';

import { useState, useEffect } from 'react'
import { Routes, Route} from 'react-router-dom';

import { getAllTopics } from './utils/api';

import Header from './Components/Header';
import MainPage from './Components/MainPage';
import SingleArticle from './Components/SingleArticle';

function App() {

  const [topics, setTopics] = useState([])
  const [currTopic, setCurrTopic] = useState('')
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    setIsLoading(true)
    getAllTopics().then(({topics}) => {
      setTopics(topics)
      setIsLoading(false)
    })
  }, [])

  if(isLoading) return <h2>Loading</h2>
  return (
    <div className="App">
      <Header topics={ topics } currTopic={currTopic}/>
        <Routes>
          <Route path='/' element ={<MainPage setTopics={setTopics} setCurrTopic={setCurrTopic}/>}/>
          <Route path='/:pageNo' element ={<MainPage setTopics={setTopics} setCurrTopic={setCurrTopic}/>}/>
          <Route path='/:topic/:pageNo' element={<MainPage setTopics={setTopics} setCurrTopic={setCurrTopic}/>}/>
          <Route path='/articles/:article_id' element={<SingleArticle setCurrTopic={setCurrTopic}/>}/>
        </Routes>
    </div>
  );
}

export default App;
