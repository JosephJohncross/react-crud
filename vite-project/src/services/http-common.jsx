import axios from "axios"
import {displayNotification, createTree} from "../services/util"

//Performs PUT operation on the database for an item
//Parameters( id = id of item to perform update operation on)
export const update = async (event, id) => {
    event.preventDefault()
    const form = event.currentTarget.closest('form')
    const url = `api/items/${id}`
    const data = new FormData(form)

    axios.put(url, {
                name: data.get('name'),
                description: data.get('description'),
                parentId: data.get('parentId')
            })
    .then()
    .catch(error =>
        console.log(error)
    )
    displayNotification("Category updated successfully")
}

//Performs DELETE operation on the database for an item
//Parameters( id = id of item to perform update operation on)
export const remove =(e,id, name) => {
    e.preventDefault()

    axios.delete(`api/items/${id}`)
    .then()
    .catch(error=> console.log(error))
    displayNotification(`Category ${name} successfully removed`)
}

//Performs POST operation on the database for an item
//Request format ({name: "", description, "", parentId= ""})
export const add = async (event) => {
    event.preventDefault()
    const form = event.currentTarget.closest('form')
    const url = form.action
    const data = new FormData(form)
    console.log(data)

    axios.post(url, {
                name: data.get('name'),
                description: data.get('description'),
                parentId: data.get('parentId')
            })
    .then()
    .catch(error =>
        console.log(error)
    )
    displayNotification(`Category ${data.get("name")} added successfully`)
    form.reset()
}

//Performs POST operation on the database for an item
//Request format ({name: "", description, "", parentId= ""})
export const fetch = (setItems, setTree, root) => {
    axios.get(`/api/items?limit=10&rootOnly=${root}`).then(resp => {return resp.data})
    .then(data => {
    setItems(data);
    setTree(createTree([data]))
})
}

