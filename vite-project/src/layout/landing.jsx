import {useState, useEffect, useRef } from 'react'

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomizedcreateTree from '../components/Demo'

import {fetch} from "../services/http-common"
import Item from '../components/Item';
import Modal from '../components/Modal';
import {createTree, getView} from '../services/util';
import Pagination from '../components/Pagination';

function Landing() {
  const [items, setItems] = useState({})
  const prevRef = useRef()
  const [searchInput, setSearchInput] = useState('')
  const [tree, setTree] = useState({})
  const [togler, setTogler] = useState(false) 
  const [view, setView] = useState('table') 
  const [operation, setOperation] = useState({type: "", data: ""})

  //Fetches initial data to display
  useEffect(() => {
    fetch(setItems, setTree, false)
  }, [togler])
 
  //handles search functionality for business category
  //Returns all business categories matching the search
  const search = (event) => {
    console.log('here ')
    if((searchInput.length < 1)){
      setItems(prevRef.current)
      setTree((createTree([prevRef.current])))
    }
    if (event.key === "Enter"){
      var searchResult = [];
      (items?.results || []).map(result => {
        console.log(result)
        if (result.name.toLowerCase().includes(searchInput.toLowerCase())){
          searchResult.push(result)
        }
      })
      prevRef.current = items
      setItems({...items, results:searchResult})
      setTree(createTree([{...items, results:searchResult}]))
    }
  }
  
// Triggers reload of the page after database operation by the user
  const changeTogler = () => {
    setTogler((prev)=>!prev)
  }
 
  return (
    <section className='px-10'>
    <Modal
      tree={tree}
      changeTogler2={changeTogler} 
      operation={operation}
    />
    <header className='text-4xl font-bold mb-10'>Sample pages</header>
    <p className='text-xl pb-4'>Business Categories</p>
    <div className='space-y-3 flex justify-between flex-wrap md:space-y-0'>
      <form onSubmit={(e)=>e?.preventDefault()} className=''>   
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg aria-hidden="true" className="w-3 h-3 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
              <input  onKeyUp={(e)=>search(e)}  onChange={(e)=>{setSearchInput((e.target.value))}} type="text" name='search' id="default-search" className="block w-full p-1 px-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500500"  />
          </div>
      </form>
      <div className='flex items-center space-x-4 '>
        <div className='flex items-center space-x-2 order-2 md:order-1'>
          <div className=''>
            <img data-tooltip-target="table" data-tooltip-trigger="hover" src="https://img.icons8.com/ios-filled/50/null/data-sheet.png" className='w-5 h-5 cursor-pointer' onClick={()=>{getView(setView,"table")}}/>
            <div id="table" role="tooltip" className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                Table view
                <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
          </div>
          <div className=''>
            <img data-tooltip-target="list" data-tooltip-trigger="hover" src="https://img.icons8.com/ios-glyphs/30/null/bulleted-list.png" className='w-5 h-5 cursor-pointer' onClick={() =>{getView(setView,"list")}}/>
            <div id="list" role="tooltip" className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                List View
                <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
          </div>
        </div>
        <button className='order-1 md:order-2 px-6 py-2 bg-blue-900 text-white rounded-md' onClick={()=>setOperation({type:'create'})}>Add Business Category</button>
      </div>
    </div>
    
    {/* table */}
    {view === "table" ? 
      ([items].length > 0 ? 
        <>
          <div className='pt-7'>
            <div className="shadow-md grid grid-cols-3 w-full py-4 px-4">
              <p className='font-semibold  '>Business category</p>
              <p className='font-semibold  text-center'>Parent</p>
              <p className='font-semibold '>Action</p>
            </div>
          </div>
          <Pagination
            data={items.results || []}
            RenderComponent={Item}
            pageLimit={5}
            dataLimit={4}
            tree={tree}
            changeTogler={changeTogler}
          >
          </Pagination>
        </>
       : <></>)
     :  
      <div className='pt-7'>    
        <CustomizedcreateTree tree={tree}/>
      </div>  
    }
     
    
    <ToastContainer />
   </section>
  )
}

export default Landing
