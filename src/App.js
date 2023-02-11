import React from 'react'
import axios from 'axios'
import Button from '@mui/material/Button';
import { useState,useEffect } from 'react'
import './App.css';
import   Reactpaginate from 'react-paginate';

function App() {
  const[User,setUser]=useState([]);
  const[pageNumber,setpageNumber]=useState(0)
  const[show,setshow]=useState(false)
  const[filter,setfilter]=useState('');


  const searchText=(event)=>{
    setfilter(event.target.value);
  }
   console.log(filter);
 
  const usersperpage=1
  const pagevisited=pageNumber*usersperpage
  const diplayUsers=User.slice(pagevisited,pagevisited+usersperpage)

  
  .map(u=>{
    return(
      
      <div className="App">
        
         <p> id={u.id}</p>
         <p>{u.title}</p>
         <p>price={u.price}</p>
         <p>category={u.category}</p>
         <img className='img' src={u.image}/><br/> 
         <Button  variant="outlined" type="button"  onClick={()=>setshow(!show)} >Details</Button> 
    {
      show && <p>description={u.description}</p>
    }
      </div>
      )})

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
    .then(res => setUser(res.data))   
    } ,"")

   const pageCount=Math.ceil(User.length / usersperpage);
   const changepage=({selected})=>{
    setpageNumber(selected)
   };
  return (
    <div className="main" >
      <input className="search" type="text" placeholder='search' value={filter}
      onChange={searchText.bind(this)}
      ></input>
    {diplayUsers}
    <Reactpaginate
    previousLabel={"previous"}
    nextLabel={"Next"}
    pageCount={pageCount}
    onPageChange={changepage}
    containerClassName={"paginationBTTn"}
    nextLinkClassName={"nextBttn"}
    disabledClassName={"paginationDisabled"}
    activeClassName={"paginationActive"}

    />
      <div >
        
        {User.map(u=>{
          return(
            <div className='row'>
            
              <h2>Mens</h2>
              <div className='posters'>
             
              <img  className="poster" alt="poster" src={u.image}/>
            </div>
            </div>
            
          )
        })}
        <img src={User.image}/>
        

      </div>
    </div>
  )
}

export default App


