import ArticlesDisplay from './ArticlesDisplay'
import TopicsNav from './TopicNav'

import { Routes, Route} from 'react-router-dom';

const MainPage = ({searchObj, setSearchObj}) => {

    return (
        <main className='flex-col'>
            <TopicsNav setSearchObj={setSearchObj} searchObj = {searchObj}/>
            <Routes>
                <Route path='/' element={ <ArticlesDisplay searchObj={searchObj} setSearchObj={setSearchObj}/> }/>
                <Route path='/:topic' element={ <ArticlesDisplay searchObj={searchObj} setSearchObj={setSearchObj}/>}/>
            </Routes>
           
        </main>
    )
}

export default MainPage