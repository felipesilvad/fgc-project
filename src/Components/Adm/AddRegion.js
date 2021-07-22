import React, { useState } from 'react';
import firebase from '../../firebase';

const AddRegion = () => {
  const [title, setTitle] = useState('');
  const [flag, setFlag] = useState('');

  function onSubmit(e) {
    e.preventDefault()

    const regionRef = firebase.firestore().collection('Regions');

    regionRef.add({
      title, flag
    })

  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label><h4 id="stat">Add Region</h4></label>
          <input type="text" name="title" placeholder="Title"
            onChange={e => setTitle(e.currentTarget.value)}
          />
          <input type="text" name="Flag" placeholder="Flag"
            onChange={e => setFlag(e.currentTarget.value)}
          />
        <button className="button add-button">Add</button>
      </form>
    </div>
  )
}

export default AddRegion;
