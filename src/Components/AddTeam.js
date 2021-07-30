import React, { useState } from 'react';
import firebase, {storage} from '../firebase';

const AddTeam = () => {
  const [title, setTitle] = useState('');
  const [twitter, setTwitter] = useState('');

  const handleChangeIcon = async (e) => {
    if (e.target.files[0]) {
      const icon = e.target.files[0]
      const imgRef = storage.ref("images/DRPG/characters");
      const iconRef = imgRef.child(`${title}_icon`)
      await iconRef.put(icon)
      const teamsRef = firebase.firestore().collection('Teams');
      await iconRef.getDownloadURL().then((icon_url) => {
        teamsRef.add({
          title, twitter, icon_url
        })
      })
    }
  }

  function onSubmit(e) {
    e.preventDefault()

    const teamsRef = firebase.firestore().collection('Teams');

    teamsRef.add({
      title, twitter
    })

  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label><h4 id="stat">Add Team</h4></label>
          <input type="text" name="title" placeholder="Title"
            onChange={e => setTitle(e.currentTarget.value)}
          />
          <input type="text" name="Twitter" placeholder="Twitter"
            onChange={e => setTwitter(e.currentTarget.value)}
          />
          <label>Icon</label>
          <input type="file" onChange={handleChangeIcon} />
        <button className="button add-button">No Icon</button>
      </form>
    </div>
  )
}

export default AddTeam;
