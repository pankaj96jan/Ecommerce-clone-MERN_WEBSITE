import React, { Fragment, useState } from 'react'
import "./Search.css"

const Search = ({ history }) => {
    const [keyword, setKeyword] = useState("")
    const searchSubmitHandler = (e) => {
        // console.log("hi");
        e.preventDefault();
        if (keyword.trim()) {
            history.push(`/products/${keyword}`)
        }
        else {
            history.push("/products")
        }
    }



    return (
        <Fragment>
            <form className='searchBox' onSubmit={searchSubmitHandler}>
                <input
                    type="text"
                    placeholder='Search a Product...'
                    onChange={e => setKeyword(e.target.value)}
                />
                <button type='submit'>Search</button>
            </form>
        </Fragment>
    )
}

export default Search