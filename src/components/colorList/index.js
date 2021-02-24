import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEntry, startEditEntry } from '../../redux/actionCreators'
import ReactModal from 'react-modal'
import EditForm from '../editForm'
import 'rc-color-picker/assets/index.css';
import './style.css';

function ColorList() {
  const isOpen = useSelector((state) => state.data.isOpen)
  const dispatch = useDispatch();
  const allEntries = useSelector((state) => state.data.allEntries);


  function handleEdit(event, id, name, type, color) {
    event.preventDefault();
    dispatch(startEditEntry({ id, name, type, color }))
  }

  function handleDelete(event, id) {
    event.preventDefault();
    dispatch(deleteEntry({ id }))
  }

  //---------------------------------------------------------DnD part
  useEffect(() => { //костыль для работы с useSelector
    setList(allEntries)
  }, [allEntries])
  const [list, setList] = useState(allEntries);
  const [dragAndDrop, setDragAndDrop] = useState({
    draggedFrom: null,
    draggedTo: null,
    isDragging: false,
    originalOrder: [],
    updatedOrder: []
  });

  // onDragStart fires when an element
  // starts being dragged
  const onDragStart = (event) => {
    const initialPosition = Number(event.currentTarget.dataset.position);

    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: initialPosition,
      isDragging: true,
      originalOrder: list
    });

    // Note: this is only for Firefox.
    // Without it, the DnD won't work.
    // But we are not using it.
    event.dataTransfer.setData("text/html", '');
  }

  // onDragOver fires when an element being dragged
  // enters a droppable area.
  // In this case, any of the items on the list
  function onDragOver(event) {

    // in order for the onDrop
    // event to fire, we have
    // to cancel out this one
    event.preventDefault();

    let newList = dragAndDrop.originalOrder;

    // index of the item being dragged
    const draggedFrom = dragAndDrop.draggedFrom;

    // index of the droppable area being hovered
    const draggedTo = Number(event.currentTarget.dataset.position);

    const itemDragged = newList[draggedFrom];
    const remainingItems = newList.filter((item, index) => index !== draggedFrom);

    newList = [
      ...remainingItems.slice(0, draggedTo),
      itemDragged,
      ...remainingItems.slice(draggedTo)
    ];

    if (draggedTo !== dragAndDrop.draggedTo) {
      setDragAndDrop({
        ...dragAndDrop,
        updatedOrder: newList,
        draggedTo: draggedTo
      })
    }

  }

  function onDrop(event) {

    setList(dragAndDrop.updatedOrder);

    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: null,
      draggedTo: null,
      isDragging: false
    });
  }


  function onDragLeave() {
    setDragAndDrop({
      ...dragAndDrop,
      draggedTo: null
    });

  }
  //---------------------------------------------------------DnD part

  return (
    <>
      <div className='table-wrap'>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Color</th>
              <th>Color Template</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>

            {allEntries.length ? list.map((el, index) => {
              return (
                <tr
                  className='cell'
                  key={index}
                  data-position={index}
                  draggable='true'
                  onDragStart={onDragStart}
                  onDragOver={onDragOver}
                  onDrop={onDrop}
                  onDragLeave={onDragLeave}
                >
                  <td className='name'  data-label='name'>{el.name}</td>
                  <td className='type'  data-label='type'>{el.type}</td>
                  <td className='color' data-label='color'>{el.color}</td>
                  <td className='colorTemplate' style={{ backgroundColor: `${el.color}` }}  data-label='colorTemplate'></td>
                  <td className='options' data-label='options'>
                    <div className='btnWrapper'>
                      <button className='editBtn btn' onClick={(event) => handleEdit(event, el.id, el.name, el.type, el.color)}>Edit</button>
                      <button className='deleteBtn btn' onClick={(event) => handleDelete(event, el.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              )
            }) : <></>}
          </tbody>
        </table>
      </div>
      <ReactModal
        isOpen={isOpen}
        ariaHideApp={false}
        // contentLabel="Inline Styles Modal Example"
        style={{
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.75)',
          },
          content: {
            position: 'absolute',
            top: '40px',
            left: '40px',
            right: '40px',
            bottom: '40px',
            border: '1px solid #ccc',
            background: '#fff',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '4px',
            outline: 'none',
            padding: '20px',
          },
        }}
      >
        <EditForm />
      </ReactModal>
    </>
  );
}

export default ColorList;
