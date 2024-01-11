import { useState } from "react";

//SignupView function componenent
export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState ("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {};

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username: 
        <input
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            e.target.setCustomValidity("");
          }}
          required
          minLength="5"
          pattern="[a-zA-Z0-9]+"
          onInvalid={(e) =>
            e.target.setCustomValidity(
              "Username must have at least 5 characters and be alphanumeric."
            )
          }
        />
      </label>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Birthday:
        <input
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  )
}