import Content from './Content';
import Footer from './Footer';
import Header from './Header';
import React, { useEffect } from 'react'
import './App.css';
import { useState } from 'react';
import AddItem from './AddItem';
import SearchItem from './SearchItem';
import apiRequest from './apiRequest';

function App() {
  const API_URL = 'http://localhost:3500/items';
  const [items, setItems] = useState([]);
  const [fetchError, setFetchError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

    
    useEffect(() => {
       const fetchItems = async ()=>{
        try{
          const response = await fetch(API_URL);
          // console.log(response);
          if(!response.ok) throw Error("Data not recevied") // ok na 200k error apo above 200 to 404 error vantha intha error throw ppannga nu artham
          
          const ListItems = await response.json();
          // console.log(ListItems);
          
          setItems(ListItems);
          setFetchError(null)
        }catch(err){
          setFetchError(err.message); 
        }finally{
          setIsLoading(false)
        }
       }
       setTimeout(() => {
        (async ()=>fetchItems())()
       }, 2000);

       
    },[])  

      const addItem = async (item) => {
      const id = items.length ? items[items.length-1].id + 1 : 1;
      const addNewItem = {id,checked:false,item}
      const addInArray = [...items,addNewItem]
      setItems(addInArray)

      const postOptions = { // object
        method: 'POST',
        headers:{ 
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(addNewItem)
      }
      const result = await apiRequest(API_URL,postOptions)
      if(result) setFetchError(result)
    }

      const handleCheck = async(ids) => {
      const listItems = items.map((it)=> 
        it.id === ids ?{...it,checked:!it.checked} : it)
      setItems(listItems)

      const myItem = listItems.filter((i) => i.id === ids) // update panna item matu filter pani edukurom
      const updateOptions = {
        method :'PATCH',
        headers :{
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({checked:myItem[0].checked})
      }
      const reqUrl = `${API_URL}/${ids}` // entha id ah update pananum nu kudukanum orelse athuku threriyathu
      const result = await apiRequest(reqUrl,updateOptions)
      if(result) setFetchError(result)
    }

     
      const handleDelete = async(ids) => {
      const deleteItems = items.filter((it)=>
      it.id!==ids);
      setItems(deleteItems)

      const deleteOptions = {
        method :'DELETE'
      }
      const reqUrl = `${API_URL}/${ids}` // entha id ah update pananum nu kudukanum orelse athuku threriyathu
      const result = await apiRequest(reqUrl,deleteOptions)
      if(result) setFetchError(result)
    }


    const [newItem, setNewItem] = useState('')
    const handleSubmit = (e)=>{
      e.preventDefault()
      // console.log(newItem)
      addItem(newItem)
      setNewItem('')
      
    }

    const [search, setSearch] = useState('')
  
  return (
    <div> 
      <Header title={"ToDO List"}/>
      <AddItem
        newItem = {newItem}
        setNewItem = {setNewItem}
        handleSubmit = {handleSubmit}
      />
      <SearchItem 
      search = {search}
      setSearch = {setSearch}
      />
      <main>
        {isLoading && <p>{`Loading Items...`}</p>}
        {fetchError && <p>{`Error: ${fetchError}`}</p>}
        {!isLoading && !fetchError && <Content
        items = {items.filter((i)=>(i.item).toLowerCase().includes(search.toLowerCase()))}
        setItems = {setItems}
        handleCheck = {handleCheck}
        handleDelete = {handleDelete}
      />}
      </main>
     
      <Footer
      length = {items.length}
      /> 
    </div>
  );
}

export default App