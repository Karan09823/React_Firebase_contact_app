import Navbar from "./components/Navbar";
import { FiSearch } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";
import {useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import {db} from "./config/firebase";
import ContactCard from "./components/ContactCard";
import useDisclouse from "./hooks/useDisclouse";
import AddAndUpdateContact from "./components/AddAndUpdateContact";

const App = () => {

  const[contacts,setContacts]=useState([]);

 const{isOpen,onClose,onOpen}=useDisclouse();

  useEffect(()=>{
    const getContacts=async ()=>{

      try{
        
       // fetch collection
        const contactsRef=collection(db,"contacts");
        
        //contact snapshot
        const contactsSnapshot=await getDocs(contactsRef);
       
        //get contact list from snapshot
        const contactLists=contactsSnapshot.docs.map((doc)=>{
          return {
            id:doc.id,
            ...doc.data(),
          };
        });
        
        setContacts(contactLists);

      }catch(error){
        console.log(error);
      }
    };

    getContacts();
  },[]);
 
  return (
    <>
      <div className=" m-auto max-w-[370px] px-4">
        <Navbar />
        <div className="flex gap-2">
          <div className="relative flex flex-grow items-center">
            <FiSearch className="absolute ml-1 text-3xl text-white" />
            <input
             
              type="text"
              className=" h-10 flex-grow rounded-md border border-white bg-transparent pl-9 text-white"
            />
          </div>

          <AiFillPlusCircle 
          onClick={onOpen} className="cursor-pointer text-5xl text-white"
          />
        </div>

        <div className="flex flex-col gap-2">
        {
          contacts.map(contact=> 
            <ContactCard key={contact.id} contact={contact}/>
          )
        }
        
      </div>


      </div>

      
      <AddAndUpdateContact onClose={onClose} isOpen={isOpen}/>
     
    </>
  );
};

export default App;