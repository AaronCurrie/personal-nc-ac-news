import football1 from '../Images/football1.jpg';
import cooking1 from '../Images/cooking1.jpg';
import coding1 from '../Images/coding1.jpg';
import football2 from '../Images/football2.jpg';
import cooking2 from '../Images/cooking2.jpg';
import coding2 from '../Images/coding2.jpg';
import football3 from '../Images/football3.jpg';
import cooking3 from '../Images/cooking3.jpg';
import coding3 from '../Images/coding3.jpg';
import football4 from '../Images/football4.jpg';
import cooking4 from '../Images/cooking4.jpg';
import coding4 from '../Images/coding4.jpg';
import football5 from '../Images/football5.jpg';
import cooking5 from '../Images/cooking5.jpg';
import coding5 from '../Images/coding5.jpg';
import football6 from '../Images/football6.jpg';
import cooking6 from '../Images/cooking6.jpg';
import coding6 from '../Images/coding6.jpg';
import defaultImg from '../Images/default.jpg';

const football = [football1, football2, football3, football4, football5, football6]
const cooking = [cooking1, cooking2, cooking3, cooking4, cooking5, cooking6]
const coding = [coding1, coding2, coding3, coding4, coding5, coding6]

export function imageSelctor(topic, id) {
    const random = Math.round(id % 6)
    switch (topic) {
        case 'football':
            return football[random];
        case 'coding':
            return coding[random];
        case 'cooking':
            return cooking[random];
        default:
            return defaultImg;
    }
}