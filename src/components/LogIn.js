import React from 'react'

const LogIn = ({ username, setUsername, password, setPassword, handleLogin }) => {

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label>username</label>
        <input id='username' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>password</label>
        <input id='password' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button id='login' type="submit">login</button>
    </form>
  )
}

export default LogIn