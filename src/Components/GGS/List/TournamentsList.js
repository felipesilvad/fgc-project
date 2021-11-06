import React, { useState, useEffect } from 'react';
import firebase from '../../../firebase';
import {Link} from 'react-router-dom';
import {Table} from 'react-bootstrap';

function useTournament() {
  const [tournament, setTournament] = useState([])

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('games')
      .doc('Guilty Gear Strive')
      .collection('Tournaments')
      .orderBy('start_date', 'desc')
      .onSnapshot((snapshot) => {
        const newTournament = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))

        setTournament(newTournament)
      })
    return () => unsubscribe()
  }, [])

  return tournament;
}

const TournamentsList = () => {
  const tournaments = useTournament();

  return (
    <div>
      <h4>Match List</h4>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Date</th>
            <th>Tournament</th>
            <th>Entrants</th>
            <th>Type</th>
            <th>Format</th>
          </tr>
        </thead>
        <tbody>
          {!! tournaments &&(
            tournaments.map((tournament) => (
              <tr>
                <td>{tournament.start_date.toDate().toLocaleDateString()}</td>
                <td>
                  <Link to={`/GGS/tournaments/${tournament.id}`}>
                    {tournament.title}
                  </Link>
                </td>
                <td>{tournament.entrants}</td>
                <td>{tournament.type}</td>
                <td>{tournament.format}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      
    </div>
  )
}

export default TournamentsList;