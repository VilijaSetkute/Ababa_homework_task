import React, { useContext, useRef } from 'react';
import http from '../../plugins/http';
import mainContext from '../../context/mainContext';

function Register({ setAuthMessage }) {
  const { setAuthOption } = useContext(mainContext);
  const regEmail = useRef();
  const regPass = useRef();
  const regPassRepeat = useRef();

  async function handleRegister() {
    const registerInfo = {
      email: regEmail.current.value,
      pass: regPass.current.value,
      passRepeat: regPassRepeat.current.value,
    };
    const data = await http.post('/register', registerInfo);
    if (data.success) {
      setAuthOption('login');
    }
    setAuthMessage(data);
  }

  return (
    <div className="d-flex flex-column">
      <input
        ref={regEmail}
        type="text"
        className="p-2 my-1 rounded-pill border-0 text-center"
        placeholder="enter your email"
      />
      <input
        ref={regPass}
        type="password"
        className="p-2 my-1 rounded-pill border-0 text-center"
        placeholder="enter password (min 8 symbols)"
      />
      <input
        ref={regPassRepeat}
        type="password"
        className="p-2 my-1 rounded-pill border-0 text-center"
        placeholder="repeat password"
      />
      <div
        className="auth-btn cursor p-2 my-1 rounded-pill border-0 text-center"
        onClick={handleRegister}
        aria-hidden="true"
      >
        Register
      </div>
    </div>
  );
}

export default Register;
