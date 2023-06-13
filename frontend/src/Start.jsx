import React from 'react'
import { useNavigate } from 'react-router-dom'

function Start() {

    const navigate = useNavigate()

  return (
      <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
          <div className='p-3 rounded w-25 border loginForm text-center'>
              <h2>Tipo de Login:</h2>
              <div className='d-flex justify-content-between mt-5'>
                <button className='btn btn-primary btn-lg' onClick={e => navigate('/employeeLogin')}>Universidade</button>
                <button className='btn btn-success btn-lg' onClick={e => navigate('/login')}>Autarquia</button>
              </div>

    </div>
</div>
  )
}

export default Start