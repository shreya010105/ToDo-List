import React from 'react'

const SearchItem = ({search,setSearch}) => {
  return (
    <form className='form' onSubmit={(e) => e.preventDefault()}>
        <label>Search</label>
        <input 
            type="text"
            id = 'search'
            placeholder='search Items...'
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
        /> 
    </form>
  )
}

export default SearchItem