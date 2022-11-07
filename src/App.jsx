import './CSS/App.css';
import './CSS/Components.css'
import './CSS/Hero.css'
import './CSS/Cards.css'
import './CSS/Buttons.css'
import './CSS/Nav.css'
import './CSS/AnimationsStates.css'

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
import Hero from './Components/Hero/Hero';
import Error from './Components/Patterns/PostError';

function App() {

  const [topics, setTopics] = useState([])
  const [currTopic, setCurrTopic] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [userName, setUserName] = useState(null)
  const [userInfo, setUserInfo] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

  useEffect(() => {
    setIsLoading(true)
    getAllTopics().then(({topics}) => {
      setTopics(topics)
      setIsLoading(false)
    }).catch(err => {
      setErrorMsg({ status: err.response.status, msg:err.response.data.msg, method:'getting'})
      setIsLoading(false)
  })
  }, [])

  useEffect(() => {
    if(userName) {
        getUserByUserName(userName).then(({user}) => {
        setUserInfo(user)
      }).catch(err => {
        setErrorMsg({ status: err.response.status, msg:err.response.data.msg, method:'getting'})
        setIsLoading(false)
    })
    } else {
      setUserInfo(null)
    }
  }, [userName])


  if(isLoading) return <Loading/>
  if(errorMsg) return <Error errorMsg={errorMsg}/>
  return (
    <UserContext.Provider value={{userName, setUserName}}>
    <div className="App">
      <Header topics={ topics } userInfo = {userInfo} setCurrTopic={setCurrTopic} currTopic={currTopic}/>
        <Routes>
          <Route path='/' element ={<><Hero/><MainPage setTopics={setTopics} setCurrTopic={setCurrTopic}/></>}/>
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
