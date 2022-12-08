import React,{ useState } from "react";
import {getPaginatedData, goToNextPage, goToPreviousPage} from "../services/util"


//Component controls the pagination of the document
const Pagination = ({ data, RenderComponent, dataLimit,tree, changeTogler, notify}) => {
    const [pages] = useState(Math.round(data.length / dataLimit));
    const [currentPage, setCurrentPage] = useState(1);
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);
  
    return (
        <div>
          <div className="dataContainer">
            {getPaginatedData(data, currentPage, dataLimit).map((d, idx) => (
              <RenderComponent 
                forceUpdate= {forceUpdate}
                tree={tree}
                key={d.id}
                id={d.id}
                name={d.name}  
                description={d.description}
                parentId={d.parentId}
                changeTogler={changeTogler}
                notify={notify}
              />
            ))}
          </div>
      
          <div className="flex items-center justify-end py-6 space-x-4">
            <button
              onClick={()=> {goToPreviousPage(setCurrentPage, currentPage)}}
              className={`prev bg-white border-2  p-2 font-medium px-5 rounded-md border-black text-sky-600 shadow-lg  mx-5 ${currentPage === 1 ? 'disabled' : ''}`}
            >
              prev
            </button>
            <button
              onClick={()=>{goToNextPage(currentPage, dataLimit, data, setCurrentPage)}}
              className={`next bg-white border-black border-2 rounded-md p-2 font-medium px-5 text-sky-600 shadow-lg mx-5 ${currentPage === pages ? 'disabled' : ''}`}
            >
              next
            </button>
          </div>
        </div>
    )
}

export default Pagination