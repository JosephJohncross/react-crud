import React, {useEffect, useState, useRef} from "react"
import {add,remove,update} from "../services/http-common"


// Modal overlay containing form for edit, delete and update item 
const Modal = ({operation, changeTogler2, tree}) => {
    const [showModal, setShowModal] = useState(false)
    const [outerVal, setOuterVal] = useState({})
    const [description, setDescription] = useState('')
    const [name, setName] = useState('')
    const [id, setId] = useState('')
    const backdrop = useRef()

    // Gets all business category
    useEffect(()=>{
        if((operation?.type?.length || '') > 0 ){
            setShowModal(true)
            setOuterVal(operation)
            if(operation?.type == 'edit'){
                setName(operation?.data?.name || '')
                setId(operation?.data?.id || '')
                setDescription(operation?.data?.description || '')
            }else if(operation?.type == 'delete'){
                setId(operation?.data?.id || '')
            }
        }
    },[operation])

    return (
    <>
            {/* Modal content for edit form */}
            {(outerVal?.type == 'edit') && <>
            <form className="form" method="put" encType="multipart/formdata">
                <div className={showModal? "absolute top-0 left-0 right-0 bottom-0 z-10 justify-center items-center flex" : "hidden"}>
                    <div className="bg-white w-6/7 md:w-1/3 px-4 md:px-7 block rounded-lg py-6 z-20">
                        <p className="pb-5 text-blue-900 font-bold">Update Business Category | {operation?.data?.name || ''}</p>
                        <div className="flex flex-col space-y-3">
                            <div className="">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                <input value={name} name="name" onChange={(e)=>setName(e?.target?.value || '')} type="text" id="name" className="bg-gray-50 border border-white text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  outline-blue-400" placeholder="Name" required/>
                            </div>
                            <div>
                                <label htmlFor="description" name="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                <input value={description} onChange={(e)=>setDescription(e?.target?.value || '')} type="text" id="description" name="description" className="bg-gray-50 border border-white text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-blue-400" placeholder="Description" required/>
                            </div>
                            <div>
                                <label htmlFor="parentId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select parent id</label>
                                <select name="parentId" defaultValue="" id="parentId" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value="">Select a parent</option>
                                    {
                                        tree.map(node => {
                                            if ((node.id !== id) && (node.parentId != id) ){
                                                return <option key={node["id"]} value={node["id"]}>{node["name"]}</option>
                                            }
                                        })
                                    }
                                </select>
                            </div>
                            <div className="flex justify-end">
                                <button className="text-white bg-sky-400 rounded-sm px-4 py-1 mt-4" onClick={(e)=>{update(e, id); changeTogler2(); setShowModal(false)}}>Edit</button>
                            </div>
                        </div>
                    </div>  
                    <div ref={backdrop} className={showModal? "bg-black/25 absolute top-0 left-0 right-0 bottom-0 z-10 justify-center items-center flex" : "hidden"} onClick={(e)=>{setShowModal(false)}}>
                    </div>
                </div>
            </form>
            </>
            }
            
            {/* Modal content for delete form */}
            {outerVal?.type == 'delete' && <>
                <form className="" method="delete" action="">
                <div className={showModal? "absolute top-0 left-0 right-0 bottom-0 z-10 justify-center items-center flex" : "hidden"}>
                    <div className="bg-white w-2/3 md:w-1/3 px-4 md:px-7 block rounded-lg py-6 z-20">
                        <p className="pb-5 text-blue-900 font-bold">Remove Business Category</p>
                        <p className="text-sm">Delete business category {name}. <span className="font-medium">This action cannot be reversed</span></p>
                        <div className="flex justify-end space-x-3 pt-4">
                            <button className="text-sky-500 uppercase text-sm" onClick={()=>{setShowModal(false)}}>cancel</button>
                            <button className="text-sky-500 uppercase text-sm" onClick={(e)=> {remove(e, id, name); changeTogler2(); setShowModal(false)}}>remove</button>
                        </div>
                    </div>
                    <div ref={backdrop} className={showModal? "bg-black/25 absolute top-0 left-0 right-0 bottom-0 z-10 justify-center items-center flex" : "hidden"} onClick={(e)=>{setShowModal(false)}}>
                    </div>
                </div>
                </form> 
            </>}

            {/* Modal content for delete form */}
            {outerVal?.type == 'create' && <>
                <form className="form"  action="api/items" encType="multipart/formdata">
                    <div className={showModal? "absolute top-0 left-0 right-0 bottom-0 z-10 justify-center items-center flex" : "hidden"}>
                    <div className="bg-white w-2/3 md:w-1/3 px-4 md:px-7 block rounded-lg py-6 z-20">
                        <p className="pb-5 text-blue-900 font-bold">New Business Category</p>
                        <div className="flex flex-col space-y-3">
                            <div className="">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                <input type="text" id="name" name="name" className="bg-gray-50 border border-white text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  outline-blue-400" placeholder="Name" required/>
                            </div>
                            <div>
                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                <input type="text" id="description" name="description" className="bg-gray-50 border border-white text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-blue-400" placeholder="Description" required/>
                            </div>
                            <div>
                                <label htmlFor="parentId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select parent id</label>
                                <select name="parentId" defaultValue="" id="parentId" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value="">Select a parent</option>
                                    {
                                        tree.map(node => {
                                            return <option key={node["id"]} value={node["id"]}>{node["name"]}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div className="flex justify-end">
                                <button className="text-white bg-sky-400 rounded-sm px-4 py-1 mt-4" onClick={(e)=>{add(e); changeTogler2(); setShowModal(false)}}>Add</button>
                            </div>
                        </div>
                    </div>  
                    <div ref={backdrop} className={showModal? "bg-black/25 absolute top-0 left-0 right-0 bottom-0 z-10 justify-center items-center flex" : "hidden"} onClick={(e)=>{setShowModal(false)}}>
                    </div>
                    </div>
                </form>
            </>}
    </>
    )
}

export default Modal