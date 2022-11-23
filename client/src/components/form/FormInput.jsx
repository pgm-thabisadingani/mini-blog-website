import React from "react";

const FormInput = ({ type, name, id, title, onChange, checked }) => {
  return (
    <div className="cat flex items-center gap-0.5">
      <input
        type={type}
        name={name}
        value={id}
        id={id}
        onChange={onChange}
        checked={checked}
      />
      <label className="capitalize" htmlFor={id}>
        {title}
      </label>
    </div>
  );
};

export default FormInput;
