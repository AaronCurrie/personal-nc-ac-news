import ArticlesDisplay from './ArticlesDisplay'
import TopicsNav from './TopicNav'

const MainPage = ({searchObj, setSearchObj}) => {

    return (
        <main className='flex-col'>
            <TopicsNav setSearchObj={setSearchObj} searchObj = {searchObj}/>
            <ArticlesDisplay searchObj={searchObj} setSearchObj={setSearchObj}/>
        </main>
    )
}

export default MainPage