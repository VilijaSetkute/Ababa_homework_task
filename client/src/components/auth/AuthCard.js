import React, { useContext, useState } from 'react';
import './styles.css';
import Login from './Login';
import Register from './Register';
import mainContext from '../../context/mainContext';

function AuthCard() {
  const { authOption } = useContext(mainContext);

  const [authMessage, setAuthMessage] = useState(null);

  return (
    <div className="position-absolute auth-card">

      <div className="w-100">
        {authMessage
        && (
        <div className={`auth-message ${authMessage.success ? 'text-success' : 'text-danger'}`}>
          {authMessage.message}
        </div>
        )}
        {authOption === 'login' && <Login setAuthMessage={setAuthMessage} />}
        {authOption === 'register' && <Register setAuthMessage={setAuthMessage} />}
      </div>
    </div>
  );
}

export default AuthCard;
