import { addDoc, collection,updateDoc,doc } from "firebase/firestore";
import Modal from "./Modal";
import { Formik,Form,Field } from "formik";

import {db} from "../config/firebase";
const AddAndUpdateContact=({isOpen,onClose,isUpdate,contact})=>{


  const updateContact = async (contact, id) => {
    try {
      const contactRef = doc(db, "contacts", id);
      await updateDoc(contactRef, contact);
      onClose();
      toast.success("Contact Updated Successfully");
    } catch (error) {
      console.log(error);
    }
  };


  const addContact=async (contact)=>{

    try{

      const contactRef=collection(db,"contacts");
      await addDoc(contactRef,contact);

    }catch(error){
      console.log(error);
    }

  };


  return(<div>
    <Modal isOpen={isOpen} onClose={onClose}>
    
    <Formik
      initialValues={
        isUpdate ?{
          name:contact.name,
          email:contact.email,
        }:
        {
          name:"",
          email:"",

        }

      }
      onSubmit={(values) =>{isUpdate? updateContact(values,contact.id): addContact(values)}}
    >
      {() => (
        <Form>
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name</label>
            <Field name="name" className="h-10 border" />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <Field name="email" type="email" className="h-10 border" />
          </div>

          <button type="submit" className="self-end border  bg-orange-400 px-3 py-1.5">
           { isUpdate? "Update": "Add "} contact
          </button>
        </Form>
      )}
    </Formik>
    </Modal>
  </div>);
};

export default AddAndUpdateContact;