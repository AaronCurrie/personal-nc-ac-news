import { useState } from "react"

import { patchArticleVotes } from "../utils/api"

const Voter = ({votes, id}) => {

    const [votesUp, setVotesUp] = useState(0)
    const [voted, setVoted] = useState(false)

    function handleVote() {
        if(voted === false) {
            setVotesUp((currentVotes) => currentVotes + 1) 
            setVoted(true)
            patchArticleVotes(id, 'up').catch(err => {
                setVotesUp((currentVotes)=> currentVotes - 1)
                setVoted(false)
            })
        } else {
            setVotesUp((currentVotes) => currentVotes - 1) 
            setVoted(false)
            patchArticleVotes(id, 'down').catch(err => {
                setVotesUp((currentVotes)=> currentVotes + 1)
                setVoted(true)
            })
        }
    }


    if(voted===true) return (<aside className="vote flex-row"><h4>Votes</h4><button aria-label="unvote-button" onClick={handleVote} className="heart">&#128150;</button><p>{votes + votesUp}</p></aside>)
    else return (<aside className="vote flex-row"><h4>Votes</h4><button aria-label="vote-button" onClick={handleVote} className="heart">&#129293;</button><p>{votes + votesUp}</p></aside>)
}

export default Voter