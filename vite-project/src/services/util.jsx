import {toast } from 'react-toastify';

//Structures fetched data to format display to client
//Returns [{id:"", version: "", name:"", description: "", children: "", numberOfChildren: {no}, parentId: {no}},..]
const createArr = (json, data) => {
    var initialArr = []
  
    for (var i=0; i < json[0]?.results?.length || 0; i++){
      initialArr.push({ 
        "id": data[i].id,
        "version": data[i].version,
        "name": data[i].name,
        "description": data[i].description,
        "children": [],
        "numberOfChildren": data[i].numberOfChildren,
        "parentId": data[i].parentId || ""
      })
    }
    return initialArr;
}
  
//Creates a tree array structure from findChildren() method
const createTree = (json) => {
var data = json[0]?.results || []
const itemsArr = createArr(json, data)

itemsArr.forEach(item => {
    if (item.numberOfChildren > 0){
    findChildren(item, data)
    }
})

return itemsArr;
}

//Returs a formated array of the fetch categories
const findChildren = (parent, data) => {
data.forEach(item => {
    if (item.parentId && item.id != parent.id){
        item.ancestors.forEach(ancestor => {
        if (ancestor.id == parent.id){
            parent.children.push({"id": item.id, "name": item.name, "description": item.description, "parentId": parent.id, "numberOfChildren": item.numberOfChildren}) 
        }
        });
    }
})
}
  
//Displays notification upon user action on a category
const displayNotification = (message) => {
    notify(message)
}

//Service that handles notifcations
const notify = (message) => toast(message)

//Function handles navigation to nextPage content
// Parameters (currentPage=currentpageNumber, dataLimit=Amount of data to display, data=formated data from the database, setCureenPage=function that sets the state of the currentpage of the application)
export function goToNextPage(currentPage,dataLimit, data, setCurrentPage) {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    if (data.slice(endIndex, endIndex + dataLimit).length <= 0){
        return
    }
    setCurrentPage((page) => page + 1);
}

//Navigates to the next page
//Parameters (currentPage=currentpageNumber, setCurrentPage=function that sets the state of the currentpage of the application)
export function goToPreviousPage(setCurrentPage, currentPage) {
    if (currentPage == 1){
        return
    }
    setCurrentPage((page) => page - 1);
}


//Returns data to be displayed after applying datalimit for pagination effect
export const getPaginatedData = (data, currentPage, dataLimit) => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return data.slice(startIndex, endIndex);
};

//TOogles the view between table and list
export const getView = (setView, view) => {
    setView(view)
  }

export {createTree, displayNotification}
  
  