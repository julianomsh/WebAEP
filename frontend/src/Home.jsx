
import axios from 'axios'
import React, { useEffect, useState } from 'react'


function Home() {
  const [adminCount, setAdminCount] = useState()
  const [employeeCount, setemployeeCount] = useState()

  useEffect(()=> {
		axios.get('http://localhost:8081/adminCount')
		.then(res => {
			setAdminCount(res.data[0].admin)
		}).catch(err => console.log(err))

    axios.get('http://localhost:8081/employeeCount')
		.then(res => {
			setemployeeCount(res.data[0].employee)
		}).catch(err => console.log(err));
	}, [])

  return (
    <div>
      <div className='p-3 d-flex justify-content-around mt-3'>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Contas Cadastradas</h4>
          </div>
          <hr />
          <div className=''>
            <h5>Total:{adminCount}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Solicitações</h4>
          </div>
          <hr />
          <div className=''>
            <h5>Total:{employeeCount}</h5>
          </div>
        </div>
       
      </div>
      {/* lista de admin*/}
      <div className='mt-4 px-5 pt-3'>
        <h3>Lista de Usuarios Cadastrados</h3>
        <table className='table'>
          <thead>
          <tr>
              <th>Email</th>
              <th>Situação</th>
              </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              </tr>
              <tr>
              <td></td>
              <td></td>
              </tr>
          </tbody>
        </table>
      </div>
    </div>

  )
}

export default Home