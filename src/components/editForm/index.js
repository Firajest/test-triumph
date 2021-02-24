import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { endEditEntry } from '../../redux/actionCreators';
import ColorPicker from 'rc-color-picker';
import 'rc-color-picker/assets/index.css';
import './style.css'

function EditForm() {
  const dispatch = useDispatch();
  const currentEntry = useSelector((state) => state.data.currentEntry);

  const [name, setName] = useState(currentEntry.name);
  const [type, setType] = useState(currentEntry.type);
  const [color, setColor] = useState(currentEntry.color);

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(endEditEntry({ name, type, color }));
  }

  function changeHandler(colors) {
    setColor(colors.color);
  }
  return (
    <div className='wrapper'>
      <ColorPicker
        color={'#8ecfff'}
        onChange={changeHandler}
      >
        <span className="react-custom-trigger">color template - click me!!</span>
      </ColorPicker>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className='rowWrapper'>
            <label htmlFor="name">Name</label>
            <input required name="name" placeholder="Name" value={name} onChange={(event) => setName(event.target.value)} />
          </div>
          <div className='rowWrapper'>
            <label htmlFor="type">Type </label>
            <input required name="type" placeholder="Type" value={type} onChange={(event) => setType(event.target.value)} />
          </div>
          <div className='rowWrapper'>
            <label htmlFor="color">Color </label>
            <input required name="color" placeholder="Color" value={color} onChange={(event) => setColor(event.target.value)} />
          </div>
          <div className='rowWrapper'>
            <button type="submit" className='editButton'>Edit entry and close form</button>
          </div>
        </form>
    </div>
  );
}

export default EditForm;