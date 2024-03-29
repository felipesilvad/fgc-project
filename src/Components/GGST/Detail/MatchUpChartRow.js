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

const MatchUpChartRow = ({character_id, char_id}) => {
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

  const WinRate = Math.round(((
      CharWins.filter( x => 
        x.LChar === char_id
      ).length
      /
      CharMatches.filter( x => 
        x.Char1 === char_id ||
        x.Char2 === char_id
      ).length
    ) * 100 + Number.EPSILON) * 100) / 100

  const CharWinsChar = CharWins.filter( x => x.LChar === char_id).length
  const CharMatchesChar = CharMatches.filter( x => 
    x.Char1 === char_id ||
    x.Char2 === char_id
  ).length


  return (
    <>
      {WinRate > 50 &&(
        <td 
          className="p-0 text-center" 
          style={{background: `rgba(51, 170, 51, ${Math.round(WinRate)/100 - 0.2})`}}
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
        >
          {isShown && (
            <div className='hover_detail_bg'>
              <h6 className='hover_detail_txt'>
                {!! CharWins &&(CharWinsChar)} Wins <br />
                of {!! CharMatches &&(CharMatchesChar)} Matches
              </h6>
            </div>
          )}
          {WinRate}%
        </td>
      )}
      {WinRate < 50 &&(
        <td 
          className="p-0 text-center" 
          style={{background: `rgba(225, 49, 51, ${Math.abs(Math.round(WinRate - 100)/100)- 0.2})`}}
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
        >
          {isShown && (
            <div className='hover_detail_bg'>
              <h6 className='hover_detail_txt'>
                {!! CharWins &&(CharWinsChar)} Wins <br />
                of {!! CharMatches &&(CharMatchesChar)} Matches
              </h6>
            </div>
          )}
          {WinRate}%
        </td>
      )}
      {WinRate == 50 &&(
        <td 
          className="p-0 text-center"
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
        >
          {isShown && (
            <div className='hover_detail_bg'>
              <h6 className='hover_detail_txt'>
                {!! CharWins &&(CharWinsChar)} Wins <br />
                of {!! CharMatches &&(CharMatchesChar)} Matches
              </h6>
            </div>
          )}
          {WinRate}%
        </td>
      )}
      {!WinRate &&(
        WinRate != 0 &&(
          <td className="p-0 text-center">
            {WinRate}
          </td>
        )
      )}
    </>
  )
}

export default MatchUpChartRow;