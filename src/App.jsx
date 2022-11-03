import './CSS/App.css';
import './CSS/Components.css'

import { useState, useEffect } from 'react'
import { Routes, Route} from 'react-router-dom';

import { getAllTopics } from './utils/api';

import Header from './Components/Header';
import MainPage from './Components/Pages/MainPage';
import SingleArticle from './Components/Pages/SingleArticle';
import Loading from './Components/Patterns/Loading';
import { UserContext } from './Components/Contexts/UserContext';

function App() {

  const [topics, setTopics] = useState([])
  const [currTopic, setCurrTopic] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [userName, setUserName] = useState(null)

  useEffect(() => {
    setIsLoading(true)
    getAllTopics().then(({topics}) => {
      setTopics(topics)
      setIsLoading(false)
    })
  }, [])

  if(isLoading) return <Loading/>
  return (
    <UserContext.Provider value={{userName, setUserName}}>
    <div className="App">
      <Header topics={ topics } currTopic={currTopic}/>
        <Routes>
          <Route path='/' element ={<MainPage setTopics={setTopics} setCurrTopic={setCurrTopic}/>}/>
          <Route path='/:topic' element={<MainPage setTopics={setTopics} setCurrTopic={setCurrTopic}/>}/>
          <Route path='/articles/:article_id' element={<SingleArticle setCurrTopic={setCurrTopic}/>}/>
        </Routes>
    </div>
    </UserContext.Provider>
  );
}

export default App;
