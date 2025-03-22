import { useState } from 'react';

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    login({ username, password });
    setUsername('');
    setPassword('');
  };

  return (
    <div>
      <h2>Please login</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor='username'>Username: </label>
        <input
          id='username'
          type='text'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <br />
        <label htmlFor='password'>Password: </label>
        <input
          id='password'
          type='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <br />
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
