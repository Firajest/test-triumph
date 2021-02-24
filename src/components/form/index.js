import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEntry } from '../../redux/actionCreators'
import ColorPicker from 'rc-color-picker';
import 'rc-color-picker/assets/index.css';

function AddEntryForm() {
  const dispatch = useDispatch();
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [color, setColor] = useState('')

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(addEntry({ name, type, color, id: Math.random() }))
    setName('');
    setType('');
    setColor('');
  }

  function changeHandler(colors) {
    setColor(colors.color);
  }
  // const colorPattern = /^(#[\da-f]{3}|#[\da-f]{6}|rgba\(((\d{1,2}|1\d\d|2([0-4]\d|5[0-5]))\s*,\s*){2}((\d{1,2}|1\d\d|2([0-4]\d|5[0-5]))\s*)(,\s*(0\.\d+|1))\)|rgb\(((\d{1,2}|1\d\d|2([0-4]\d|5[0-5]))\s*,\s*){2}((\d{1,2}|1\d\d|2([0-4]\d|5[0-5]))\s*))$/s
  return (
    <>
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
          <label htmlFor="type">Type</label>
          <input required name="type" placeholder="Type" value={type} onChange={(event) => setType(event.target.value)} />
        </div>
        <div className='rowWrapper'>
          <label htmlFor="color">Color</label>
          <input
            // pattern={colorPattern}
            required
            name="color"
            placeholder="Color"
            value={color}
            onChange={(event) => setColor(event.target.value)
            } />
        </div>
        <div className='rowWrapper'>
          <button type="submit" className='addButton'>Add entry</button>
        </div>
      </form>
    </>
  );
}

export default AddEntryForm;