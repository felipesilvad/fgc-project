import React, { useState, useEffect } from 'react';
import firebase, {storage} from '../firebase';
import Options from './Options';

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

const AddPlayer = () => {
  const regions = useRegions();
  
  const [title, setTitle] = useState('');
  const [title2, setTitle2] = useState('');
  const [twitter, setTwitter] = useState('');
  const [region, setRegion] = useState('');

  const handleChangeIcon = async (e) => {
    if (e.target.files[0]) {
      const icon = e.target.files[0]
      const imgRef = storage.ref("players");
      const iconRef = imgRef.child(`${title}_icon`)
      await iconRef.put(icon)
      const playerRef = firebase.firestore().collection('Players');
      await iconRef.getDownloadURL().then((icon_url) => {
        playerRef.add({
          title, title2, twitter, region, icon_url
        })
      })
    }
  }

  function onSubmit(e) {
    e.preventDefault()

    const playerRef = firebase.firestore().collection('Players');

    playerRef.add({
      title, title2, twitter, region
    })

  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label><h4 id="stat">Add Player</h4></label>
          <input type="text" name="title" placeholder="Title"
            onChange={e => setTitle(e.currentTarget.value)}
          />
          <input type="text" name="title" placeholder="Title2"
            onChange={e => setTitle2(e.currentTarget.value)}
          />
          <input type="text" name="Twitter" placeholder="Twitter"
            onChange={e => setTwitter(e.currentTarget.value)}
          />
          Region
          <select name="Region" id="Region"
            onChange={e => setRegion(e.currentTarget.value)}
          >
            <option value=""></option>
            {regions.map((region) => (
              <Options
                id={region.id}
                title={region.title}
              />
            ))}
          </select>
          <label>Icon</label>
          <input type="file" onChange={handleChangeIcon} />
        <button className="button add-button">No Icon</button>
      </form>
    </div>
  )
}

export default AddPlayer;
