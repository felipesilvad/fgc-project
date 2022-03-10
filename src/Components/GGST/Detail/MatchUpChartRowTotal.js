import React, {useState, useEffect} from 'react';
import firebase from '../../../firebase';

function useMatches() {
  const [matches, setMatches] = useState([])

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('games')
      .doc('Guilty Gear Strive')
      .collection('Matches')
      .onSnapshot((snapshot) => {
        const newMatches = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))

        setMatches(newMatches)
      })
    return () => unsubscribe()
  }, [])

  return matches;
}

const MatchUpChartRowTotal = ({character_id}) => {
  const matches = useMatches();
  const [isShown, setIsShown] = useState(false);

  const CharWins = []
  const CharMatches = []

  matches.forEach((singleMatch) => {
    singleMatch.sets.forEach((set) => {
      if (set.Char1 === character_id) {
        CharMatches.push(set)
      }
      if (set.Char2 === character_id) {
        CharMatches.push(set)
      }
      if (set.WChar === character_id) {
        CharWins.push(set)
      }
    })
  })
  
  const CharWinRate = Math.round(((CharWins.length/CharMatches.length) * 100 + Number.EPSILON) * 100) / 100

  return (
    <>
      {CharWinRate > 50 &&(
        <td 
          className="p-0 text-center"
          style={{background: `rgba(51, 170, 51, ${Math.round(CharWinRate)/100 - 0.2})`}}
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
        >
          {isShown && (
            <div className='hover_detail_bg'>
              {CharWins} Wins
              of {CharMatches} Matches
            </div>
          )}
          <b style={{background: `none`}}>{CharWinRate}%</b>
        </td>
      )}
      {CharWinRate < 50 &&(
        <td className="p-0 text-center" style={{background: `rgba(225, 49, 51, ${Math.abs(Math.round(CharWinRate - 100)/100)- 0.2})`}}>
          <b style={{background: `none`}}>{CharWinRate}%</b>
        </td>
      )}
      {CharWinRate == 50 &&(
        <td className="p-0 text-center">
          <b style={{background: `none`}}>{CharWinRate}%</b>
        </td>
      )}
      {!CharWinRate &&(
        CharWinRate != 0 &&(
          <td className="p-0 text-center">
            <b style={{background: `none`}}>{CharWinRate}</b>
          </td>
        )
      )}
    </>
  )
}

export default MatchUpChartRowTotal;