import React, { useState, useEffect } from "react";
import * as service from "./omdb-service";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaUserSecret } from "react-icons/fa";
import "./home-screen/search-to-review.css";
import { AiOutlineSearch } from "react-icons/ai";

function SearchScreen() {
    const {searchTerm} = useParams();
    const navigate = useNavigate();
    const [results, setResults] = useState();
    const [query, setQuery] = useState(searchTerm);

    const search = async () => {
        const response = await service.fullTextSearch(query);
        setResults(response);
    };
    useEffect(() => {
        if (searchTerm) {
            setQuery(searchTerm);
            search();
        }
    }, [searchTerm]);
    return (
        <div>
            {/* <li className="search-header">Search</li> */}
        <div className="row sticky-top">
            <div className="col-auto">
                <i className="user-icon"><FaUserSecret/></i>
            </div>
        {/* <div> */}
        <div className="col-10">
            {/* <h1>Search Screen</h1> */}
            <button className="w-20 float-end btn btn-primary rounded-pill search-button mt-3"
                onClick={() => navigate(`/filmdom/search/${query}`)}>
                    Search
                </button>
            <input className="rounded-pill search-box form-control rounded-pill ps-5 mt-3" type="text" placeholder="Search a title to review!"
            value={query} 
            onChange={(e) => setQuery(e.target.value)}
            />
            {/* <AiOutlineSearch className="fs-3 mb-6 
                       wd-nudge-up"/> */}
            </div>
            
            <ul className="list-group">
                {results && 
                    results.Search.map((movie) => (
                        <li className="list-group-item" key={movie.imdbID}>
                          <h2> 
                            <Link to={`/filmdom/details/${movie.imdbID}`}>{movie.Title}</Link>
                          </h2>
                          <img src={movie.Poster} />
                          {/* <pre>{JSON.stringify(movie,null,2)}</pre> */}
                           
                        </li>
                    ))}
            </ul>
             
            {/* <pre>{JSON.stringify(results.Search,null,2)}</pre> */}
        </div>
         </div>
    );

        // <div className="row">
        // <div className="col-auto">
        // <i className="user-icon"><FaUserSecret/></i>

        //     {/* <img src="/images/nasa.png" width={60}/> */}
        //     {/* <span className="user-icon" width={60}>{FaUserSecret}</span> */}
        // </div>
        // <div className="col-10">
        // <button className="w-25 float-end btn btn-primary rounded-pill"
        //         onClick={() => navigate(`/filmdom/search/${query}`)}>
        //             Search
        //         </button>
        //     <input type="text" 
        //     value={query} 
        //     onChange={(e) => setQuery(e.target.value)}
        //     />
        // </div>
        // <div className="col-12"><hr/></div>
        // </div>
        // );
}

export default SearchScreen;