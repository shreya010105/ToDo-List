import React from 'react'
import ItemsList from './ItemsList';
const Content = ({items,setItems,handleCheck,handleDelete}) => {
      
  return (
    <>
      {(items.length) ? (
        <ItemsList 
        items = {items}
        setItems = {setItems}
        handleCheck = {handleCheck}
        handleDelete = {handleDelete}
          />
      ) : (
        <h1 style={{color:'red'}}>Your List is Empty</h1>
      )
    }
    </>
  );
};

export default Content