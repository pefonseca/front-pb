import React from 'react';
import './Login.css';

const Login = () => {
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form>
        <div className="form-group">
          <label>Email</label>
          <input type="email" required />
        </div>
        <div className="form-group">
          <label>Senha</label>
          <input type="password" required />
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
