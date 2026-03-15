import React, { useState } from 'react';
import firedb from "./firebase"


const Register = () => {

 const[user,setUser]= useState({
  email:"",
  password:"",
  status:"0"
 })

 function set(e)
 {
   setUser({...user,[e.target.name]:e.target.value})
 }
   

  function save()
  {
     firedb.child("Owner").push(user)
  }
  return (
    <div>
      <h2>Register / Login</h2>
      
        <input
         name="email"
          type="email"
          placeholder="Email"
          value={user.email}
          onChange={set}
          required
        />
        <input
        name="password"
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={set}
          required
        />
        <button onClick={save} type="submit">Register</button>
     
    </div>
  );
};

export default Register;