import React, { useState } from "react";
import ProfileInfo from "../Cards/ProfileInfo";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";


const Navbar = ({userInfo,  onSearchNote}) => {
    const [searchQuery, setSearchQueary] = useState("") 
   
    const navigate = useNavigate
   
    const onLogout = () =>{
        localStorage.clear()
        navigate("/login")
    }
    
    const handleSearch =() =>{
        if (searchQuery){
            onSearchNote(searchQuery)
        }
    }


    return (
        <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
            <h2 className="text-xl font-medium text-black py-2">Notes</h2>

        <SearchBar value={searchQuery} 
        onChange={({target}) => {
            setSearchQueary(target.value)
        }}
        handleSearch={handleSearch}
        
        />

        <ProfileInfo onLogout={onLogout}/>
        </div>
    )
    
}

export default Navbar