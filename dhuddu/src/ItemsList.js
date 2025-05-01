import React from 'react'
import {FaTrashAlt} from "react-icons/fa";

const ItemsList = ({items,handleCheck,handleDelete}) => {
  return (
    <ul>
        {items.map((i) => (
          <li className='item' key={i.id}>
            <input type="checkbox"
            onChange={()=>handleCheck(i.id)}
             checked = {i.checked} />
            <label 
            style={i.checked?{textDecoration:'line-through'} : null }
            onDoubleClick={()=>handleCheck(i.id)}>{i.item}</label>
            <FaTrashAlt role='button' tabIndex="0" 
            onClick={()=>handleDelete(i.id)}/>
          </li>
        ))}
      </ul>
  )
}

export default ItemsList