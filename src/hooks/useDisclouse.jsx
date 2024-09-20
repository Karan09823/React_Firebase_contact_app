import { useState } from "react";
//custom hooks
const useDisclouse=()=>{

  const[isOpen,setOpen]=useState(false);

  const onOpen=()=>{
    setOpen(true);
  }

  const onClose=()=>{
    setOpen(false);
  }
  return({isOpen,onOpen,onClose});
};

export default useDisclouse;