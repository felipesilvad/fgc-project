import React, { useState } from 'react';
import firebase, {storage} from '../../firebase';

const AddSeries = () => {
  const [title, setTitle] = useState('');

  const handleChangeIcon = async (e) => {
    if (e.target.files[0]) {
      const icon = e.target.files[0]
      const imgRef = storage.ref("Series");
      const iconRef = imgRef.child(`${title}_icon`)
      await iconRef.put(icon)
      const seriesRef = firebase.firestore().collection('Series');
      await iconRef.getDownloadURL().then((icon_url) => {
        seriesRef.add({
          title, icon_url
        })
      })
    }
  }

  function onSubmit(e) {
    e.preventDefault()

    const teamsRef = firebase.firestore().collection('Teams');

    teamsRef.add({
      title
    })

  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label><h4 id="stat">Add Series</h4></label>
          <input type="text" name="title" placeholder="Title"
            onChange={e => setTitle(e.currentTarget.value)}
          />
          <label>Icon</label>
          <input type="file" onChange={handleChangeIcon} />
        <button className="button add-button">No Icon</button>
      </form>
    </div>
  )
}

export default AddSeries;