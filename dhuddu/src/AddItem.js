import React, { useRef } from 'react'
import { FaPlus } from 'react-icons/fa'

const AddItem = ({newItem,setNewItem,handleSubmit}) => {
  const inputRef = useRef()
  return (
    <form className='form' onSubmit={handleSubmit}>
        <label >Add Item</label>
        <input 
        ref = {inputRef}
        type="text"
        id = 'addItem'
        placeholder='addItem'
        required
        value= {newItem}
        onChange={(e)=> setNewItem(e.target.value)}
         />
         <button 
         type='submit'
         onClick={()=>inputRef.current.focus()}
         >
            <FaPlus/>
        </button>
    </form>
  )
} 

export default AddItem