import React from 'react';
import './Cadastro.css';

const Cadastro = () => {
  return (
    <div className="cadastro-container">
      <h2>Cadastro</h2>
      <form>
        <div className="form-group">
          <label>Nome</label>
          <input type="text" required />
        </div>
        <div className="form-group">
          <label>Sobrenome</label>
          <input type="text" required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" required />
        </div>
        <div className="form-group">
          <label>Confirmar Email</label>
          <input type="email" required />
        </div>
        <div className="form-group">
          <label>Senha</label>
          <input type="password" required />
        </div>
        <div class="form-group">
          <label>Confirmar Senha</label>
          <input type="password" required />
        </div>
        <div className="form-group">
          <label>Foto</label>
          <input type="file" />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default Cadastro;
