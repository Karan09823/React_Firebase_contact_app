import { addDoc, collection, updateDoc, doc } from "firebase/firestore";
import Modal from "./Modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { db } from "../config/firebase";
import { toast } from "react-toastify";

const contactSchemaValidation=Yup.object().shape( {name:Yup.string().required("Name is Required"),
email:Yup.string().email("Invalid Email").required("Email is Required"),

});


const AddAndUpdateContact = ({ isOpen, onClose, isUpdate, contact }) => {
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

  const addContact = async (contact) => {
    try {
      const contactRef = collection(db, "contacts");
      await addDoc(contactRef, contact);
      onClose();
      toast.success("Contact Added successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Formik validationSchema={ contactSchemaValidation}
          initialValues={
            isUpdate
              ? {
                  name: contact.name,
                  email: contact.email,
                }
              : {
                  name: "",
                  email: "",
                }
          }
          onSubmit={(values) => {
            isUpdate ? updateContact(values, contact.id) : addContact(values);
          }}
        >
          {() => (
            <Form>
              <div className="flex flex-col gap-1">
                <label htmlFor="name">Name</label>
                <Field name="name" className="h-10 border" />
                <div className="text-red-600">
                  <ErrorMessage  name="name"/>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="email">Email</label>
                <Field name="email" type="email" className="h-10 border" />
                <div className="text-red-600">
                  <ErrorMessage name="email"/>
                </div>
              </div>

              <button
                type="submit"
                className="self-end border  bg-orange-400 px-3 py-1.5"
              >
                {isUpdate ? "Update" : "Add "} contact
              </button>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export default AddAndUpdateContact;
