import { useState } from "react";

//LoginView function component
export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //Verify login data
  const handleSubmit = (event) => {
    // this prevents the default behavior of the form which is to reload the entire page
    event.preventDefault();
  
  //create data object with values from the form
  const data = {
    username: username,
    password: password,
  };

  //POST request send to the specified URL with the form data in JSON format
  fetch("https://anime-eiga-84a0980bd564.herokuapp.com/login", {
    method: "POST",
    body: JSON.stringify(data)
  })
    //onLoggedIn prop
    .then((response) => {
      if (response.ok) {
        onLoggedIn(username);
      } else {
        alert ("Login failed");
      }
    });
  };
  
  return (
    <form>
      <label>
        Username:
        <input 
        type="text" 
        value = {username}
        onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input 
        type="password" 
        value = {password}
        onchange={(e) => setPassword(e.target.value)} />
      </label>
      <button type="submit">Submit</button>
    </form>
    )
}