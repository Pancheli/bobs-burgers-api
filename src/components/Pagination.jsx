import React from "react";

const paginate = ({currentPage, setCurrentPage}) => {

    const handleOnClick = (next=true) => {
        if (next){
            if (currentPage === 33) {
                return setCurrentPage(33)
            }
            setCurrentPage(currentPage + 1)
        } else {
            if (currentPage === 1){
                return setCurrentPage(1)
            }
            setCurrentPage(currentPage - 1)
        }
    }

    return (
        <div className="pagination">
            <button onClick={() => {handleOnClick(false)}}>
                <span className="TxtEffect">Anterior</span>
            </button>
            <p>{currentPage}</p>
            <button onClick={handleOnClick}>
            <span className="TxtEffect">Siguiente</span>
            </button>
        </div>
    )
}

export default paginate;