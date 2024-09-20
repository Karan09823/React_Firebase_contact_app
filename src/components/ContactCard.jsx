import { HiOutlineUserCircle } from "react-icons/hi";
import { IoMdTrash } from "react-icons/io";
import { RiEditCircleLine } from "react-icons/ri";
import useDisclouse from "../hooks/useDisclouse";
import {db} from "../config/firebase";
import { deleteDoc,doc } from "firebase/firestore";
import AddAndUpdateContact from "./AddAndUpdateContact";

const ContactCard = ({contact}) => {

  //custom hook
  const{isOpen,onClose,onOpen}=useDisclouse();

  const deleteContact= async (id)=>{
    try{
      await deleteDoc(doc(db,"contacts",id));
    }catch(error){
      console.log(error);
    }
  }



  return (
    <>
    <div
      className="flex bg-yellow-200 items-center justify-around rounded-lg p-2 mt-2 max-w-96 cursor-pointer"
      key={contact.id}
    >
      <HiOutlineUserCircle className="text-orange-500 text-4xl" />
      <div className="">
        <h2 className="font-medium">{contact.name}</h2>
        <p className="text-sm">{contact.email}</p>
      </div>

      <div className="flex gap-1 text-4xl">
        <RiEditCircleLine onClick={onOpen} className="text-orange-400 cursor-pointer" />
        <IoMdTrash onClick={()=> deleteContact(contact.id)} className="text-red-500 cursor-pointer" />
      </div>
    </div>

    <AddAndUpdateContact contact={contact} isUpdate isOpen={isOpen} onClose={onClose}/>
    </>
    
  );
};

export default ContactCard;