import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import {MdAdd} from "react-icons/md"
import AddEditNotes from "./AddEditNotes"
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import axiosInstance from "../../utility/axiosInstance";
import EmptyCard from "../../components/Cards/EmptyCard";
//import AddNotesImg from "../../src/assets/note.svg";


const Home = () => {
    const [openAddEditModal, setOpenAddEditModal] = useState({
        isShown: false,
        type:"add",
        data:null,
    });

 const navigate = useNavigate();

    const [allNotes, setAllNotes] = useState([])
    const [userInfo, setUserInfo] = useState(null);

    const [isSearch, setIsSearch] = useState(false);
                                  
   

    const handleEdit = (noteDetails) => {
        setOpenAddEditModal({isShown: true, data: noteDetails, type: "edit"});
    }

    
// Get User Info
    const getUserInfo = async() => {
       try {
        const response = await axiosInstance.get("/get-user");
        if (response.data && response.data.user){
            setUserInfo(response.data.user);
        }
    } catch (error)  {
        if (error.response.statis === 401) {
            localStorage.clear();
            navigate("/login");
        }
    }
    };

//Get all notes
const getAllNotes = async () => {
    try {
        const response = await axiosInstance.get("/get-all-notes");
       
        if (response.data && response.data.notes) {
            setAllNotes(response.data.notes);
    }
}   catch (error) {
    console.log("an unexpected error occured,Please try again");
}
};

//delete notes
const deleteNote = async (data) => {
    const noteId = data._id
    
    try {
        const response = await axiosInstance.delete("/delete-note" + noteId)

    if (response.data && response.data.error){
        
        getAllNotes()
        onClose()
    }
} catch (error){
    if (
        error.response && error.response.data && error.response.data.message
    ){
        console.log("an unexpected error occured,Please try again");
    }
}
}

// Search for note
const onSearchNote = async (query) => {
    try {
        const response = await axiosInstance.get("/search-notes", {
            params: {query},
        })
        if (response.data && response.data.notes) {
            setIsSearch(true);
            setAllNotes(response.data.notes)}
    } catch (error) {
        console.log(error);

    }
};
useEffect (() => {
    getUserInfo();
    return () => {

    }
},[] )

    return (
        <>
        <Navbar userInfo={userInfo} onSearchNote={onSearchNote}/>


        <div className="container mx-auto">
        {allNotes.length > 0 ? (<div className="grid grid-cols-3 gap-4 mt-8">
                {allNotes.map((item,index)=> (
                    <NoteCard 
                    key={item._id}
                    title={item.title}
                    date={item.createdOn}
                    content={item.content}
                    tags={item.tags}
                    isPinned={item.isPinned}
                    onEdit={()=> handleEdit(item)}
                    onDelete={()=> deleteNote(item)}
                    onPinNote={()=> {}}
                    /> 
                ))}
                </div>
                ): (
                 <EmptyCard imgSrc={imgSrc} message={`Star creating your first notes!
                     Click the ADD button to write some notes down`} />
             ) }
               
                <div>
            <NoteCard 
            title="Meeting on 10th of September"
            date="5th of May"
            content="Buissiness meeting on September 10th at 10am."
            tags="#Meeting"
            isPinned={true}
            onEdit={()=> {}}
            onDelete={()=> {}}
            onPinNote={()=> {}}
            /> 
            <NoteCard 
            title="Meeting on 10th of September"
            date="5th of May"
            content="Buissiness meeting on September 10th at 10am."
            tags="#Meeting"
            isPinned={true}
            onEdit={()=> {}}
            onDelete={()=> {}}
            onPinNote={()=> {}}
            /> 
            
        </div>
</div>

        <button className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10" 
        onClick={()=> {
            setOpenAddEditModal({isShown:true,type:"add",data:null});
        }}>
            <MdAdd className="text=[32px] text-white"/>
        </button>
        
        <Modal 
        isOpen={openAddEditModal.isShown}
        onRequestClose={() =>{}}
        style={{
            overlay: {
                backgroundColor: "rgba(0,0,0,0.2)",
            }   
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll">
        <AddEditNotes 
        type={openAddEditModal.type}
        noteData={openAddEditModal.data}
        onClose={() => {
            setOpenAddEditModal({isShown: false, type: "add", data: null})
        }}/>
        getAllNotes={getAllNotes}
        </Modal>
       
       
       
        </>
    )
}

export default Home