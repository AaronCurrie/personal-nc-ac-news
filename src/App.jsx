import './CSS/App.css';
import './CSS/Components.css'

import { useState, useEffect } from 'react'
import { Routes, Route} from 'react-router-dom';

import { getAllTopics, getUserByUserName } from './utils/api';

import { UserContext } from './Components/Contexts/UserContext';
import Header from './Components/Header';
import MainPage from './Components/Pages/MainPage';
import SingleArticle from './Components/Pages/SingleArticle';
import Loading from './Components/Patterns/Loading';
import ProfilePage from './Components/Pages/ProfilePage';
import LoginPage from './Components/Pages/LoginInPage';

function App() {

  const [topics, setTopics] = useState([])
  const [currTopic, setCurrTopic] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [userName, setUserName] = useState(null)
  const [userInfo, setUserInfo] = useState(null)

  useEffect(() => {
    setIsLoading(true)
    getAllTopics().then(({topics}) => {
      setTopics(topics)
      setIsLoading(false)
    })
  }, [])

  useEffect(() => {
    if(userName) {
        getUserByUserName(userName).then(({user}) => {
        setUserInfo(user)
      })
    } else {
      setUserInfo(null)
    }
  }, [userName])

  if(isLoading) return <Loading/>
  return (
    <UserContext.Provider value={{userName, setUserName}}>
    <div className="App">
      <Header topics={ topics } userInfo = {userInfo} currTopic={currTopic}/>
        <Routes>
          <Route path='/' element ={<MainPage setTopics={setTopics} setCurrTopic={setCurrTopic}/>}/>
          <Route path='/:topic' element={<MainPage setTopics={setTopics} setCurrTopic={setCurrTopic}/>}/>
          <Route path='/articles/:article_id' element={<SingleArticle setCurrTopic={setCurrTopic}/>}/>
          <Route path='/user/login' element={<LoginPage/>}/>
          <Route path='/user/:username' element={<ProfilePage/>}/>
        </Routes>
    </div>
    </UserContext.Provider>
  );
}

export default App;
