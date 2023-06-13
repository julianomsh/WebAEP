import React, {useState} from 'react'
import './style.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function EmployeeLogin() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
        axios.defaults.withCredentials = true;
        const navigate = useNavigate()
        axios.defaults.withCredentials = true;   
        const [error, setError] = useState('')

    
        const handleSubmit = (event) => {
          event.preventDefault();
          axios.post('http://localhost:8081/employeelogin', values)
          .then(res => {
              if(res.data.Status === 'sucesso') {
                const id = res.data.id;
                  navigate('/employeedetail/'+id);
              } else {
                  setError(res.data.Error);
              }
          })
          .catch(err => console.log(err));
      }
    

  return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
    <div className='p-3 rounded w-25 border loginForm'>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
            <div className='mb-3'>
                <label htmlFor="email"><strong>Email:</strong></label>
                <input type="email" placeholder='Enter Email' name='email' 
                  onChange={e => setValues({...values, email: e.target.value})} className='form-control' autoComplete='on' required/>
            </div>
            <div className='mb-3'>
                <label htmlFor="password"><strong>Password:</strong></label>
                <input type="password" placeholder='Enter Password' name='password' 
                  onChange={e => setValues({...values, password: e.target.value})} className='form-control' required  autoComplete='on' />
            </div>
            <button type='submit' className='btn-login' >Login</button>
            <p className='p-login'>Ads Unicesumar</p>
        </form>
    <div className='grid-error'>
        <div className='text-erro'>
            {error && error}
        </div>
    </div>

    </div>
</div>
  )
}

export default EmployeeLogin