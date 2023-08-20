import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//user must start with upper to lowercase letters, must be followed by characters between 4-24
//of upper to lowercase letters, digits and/or "-" and/or "_"
//password requires to contain at least a lowercase, a uppercase letter, a number along with a special character
//and can be anywhere between 8-24 characters
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  return (
    <div>
        Register
    </div>
  )
}

export default Register
