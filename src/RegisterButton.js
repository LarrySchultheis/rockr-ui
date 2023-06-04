import React from "react";
function handleClick() {
    /* */
}

const RegisterButton = () => {
    return (
      <button
        className="btn btn-danger btn-block"
        onClick={() =>
            handleClick()
        }
      >
        <b>Register</b>
      </button>
    );
  };
  
  export default RegisterButton;