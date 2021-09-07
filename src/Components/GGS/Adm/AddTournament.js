import React, { useState, useEffect } from 'react';
import firebase from '../../../firebase';
import Options from '../../Options';
import moment from 'moment';

function useRegions() {
  const [regions, setRegions] = useState([])

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('Regions')
      .onSnapshot((snapshot) => {
        const newRegions = snapshot.docs.map((doc) => ({
          id: doc.id, title: doc.data().title
        }))

        setRegions(newRegions)
      })
    return () => unsubscribe()
  }, [])

  return regions;
}

function useSeries() {
  const [series, setSeries] = useState([])

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('Series')
      .onSnapshot((snapshot) => {
        const newSeries = snapshot.docs.map((doc) => ({
          id: doc.id, title: doc.data().title
        }))

        setSeries(newSeries)
      })
    return () => unsubscribe()
  }, [])

  return series;
}


const AddTournament = () => {
  const regions = useRegions();
  const series = useSeries();

  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [serie, setSerie] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [smashgg, setSmashgg] = useState('');
  const [tonamel, setTonamel] = useState('');
  const [type, setType] = useState('');
  const [format, setFormat] = useState('');
  const [entrants, setEntrants] = useState('');


  function onSubmit(e) {
    e.preventDefault()
    
    const tournamentsRef = firebase.firestore().collection('games').doc('Guilty Gear Strive').collection('Tournaments')
    tournamentsRef.add({
      title, serie, location, smashgg, tonamel, type, format, entrants,
      start_date: firebase.firestore.Timestamp.fromDate(new Date(moment(startDate).format('MMMM D YYYY'))),
      end_date: firebase.firestore.Timestamp.fromDate(new Date(moment(endDate).format('MMMM D YYYY')))
    })

  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label><h4 id="stat">Add Tournament</h4></label>
          <input type="text" name="title" placeholder="Title"
            onChange={e => setTitle(e.currentTarget.value)}
          />
          Series
          <select name="Series" id="Series"
            onChange={e => setSerie(e.currentTarget.value)}
          >
            <option value=""></option>
            {series.map((serie) => (
              <Options
                id={serie.id}
                title={serie.title}
              />
            ))}
          </select>
          Location
          <select name="Location" id="Location"
            onChange={e => setLocation(e.currentTarget.value)}
          >
            <option value=""></option>
            {regions.map((region) => (
              <Options
                id={region.id}
                title={region.title}
              />
            ))}
          </select>
          Entrants
          <input type="number" onChange={e => setEntrants(e.currentTarget.value)} />
          Start Date
          <input type="date" onChange={e => setStartDate(e.currentTarget.value)} />
          End Date
          <input type="date" onChange={e => setEndDate(e.currentTarget.value)} />
          <p>
            <input type="text" name="Smashgg" placeholder="Smashgg"
              onChange={e => setSmashgg(e.currentTarget.value)}
            />
            <input type="text" name="Tonamel" placeholder="Tonamel"
              onChange={e => setTonamel(e.currentTarget.value)}
            />
            Type
            <select name="Type" id="Type"
              onChange={e => setType(e.currentTarget.value)}
            >
              <option value=""></option>
              <option value="Online">Online</option>
            </select>
            Format
            <select name="Format" id="Format"
              onChange={e => setFormat(e.currentTarget.value)}
            >
              <option value=""></option>
              <option value="Double-elimination">Double-elimination</option>
            </select>
          </p>
        <button className="button add-button">Add</button>
      </form>
    </div>
  )
}

export default AddTournament;