import React, {useState, useEffect} from "react";
import Modal from "./Modal";


// Represents each business category item
const Item = ({tree, name, id, description, parentId, changeTogler}) => {

    const [operation, setOperation] = useState({type: "", data: ""})
    const [parentName, setParentName] = useState("N/A")
    
    useEffect(()=>{
            tree.map(node => {
                if (node.id === parentId){
                    setParentName(node.name)
                }
            })
        }, [changeTogler])

    const changeTogler2 = () => {
        changeTogler()
    }   

    return (
        <>
            <Modal changeTogler2={changeTogler2} operation={operation} tree={tree}/>
            <div id={id} className="grid grid-cols-3 w-full py-4 px-4 my-1">
                <p className='font-medium text-sm '>{name || ""}</p>
                <p className='font-medium text-sm text-center'>{parentName}</p>
                <div className='font-medium text-sm flex items-center space-x-4'>
                    <img src="https://img.icons8.com/fluency-systems-filled/48/null/ball-point-pen.png" className="w-5 h-5 cursor-pointer" onClick={()=>setOperation({type:'edit', data:{name:name, id:id, description: description, parentId: parentId}})}/>
                    <img src="https://img.icons8.com/material-outlined/24/FF0000/settings--v1.png" className="w-5 h-5 cursor-pointer" onClick={()=>setOperation({type:'delete', data:{id:id}})}/>
                </div>
            </div>
        </>
    )
}

export default Item



