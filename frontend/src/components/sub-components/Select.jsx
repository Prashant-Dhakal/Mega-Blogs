import React, { useId } from "react";

const Select = ({ options, label }, ref) => {
  const id = useId();
  return (
    <>
      <div className="w-full">
        {label && <label htmlFor={id}></label>}
        <select 
        className="px-3" 
        id={id} 
        ref={ref}>
        
        {options?.map((option)=>{
            return <option key={option} value={option}>{option}</option>
        })}

        </select>
      </div>
    </>
  );
};

export default React.forwardRef(Select);
