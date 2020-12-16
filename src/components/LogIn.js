import React from 'react'

const LogIn = ({ username, setUsername, password, setPassword, handleLogin }) => {

    return (
        <form onSubmit={handleLogin}>
            <div>
                <label>username</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
                <label>password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit">login</button>
        </form>
    )
}

export default LogIn