import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'



function Employee() {
const [data,setData] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8081/getEmployee')
    .then(res => {
      if(res.data.Status === "sucesso"){
        setData(res.data.Result);
      }else {
        alert("Error")
      }
    })
    .catch(err => console.log(err))
  }, [])


  const handleDelete = (id) => {
    axios.delete('http://localhost:8081/delete/'+id)
    .then(res => {
      if(res.data.Status === "sucesso"){
        window.location.reload(true);
      }else {
        alert("Error")
      }
    })
    .catch(err => console.log(err))
  }

  return (
   <div className='px-5 py-3'> 
      <div className='d-flex justify-content-center mt-2'>
        <h3>Lista de Solicitações</h3>
      </div>
      <Link to='/AddEmployee' className='btn btn-primary btn-sm me-2'> Adicionar Solicitacao Estagio</Link>
      <div className='mt-3'>
      <table className='table'>
        <thead>
          <tr>
            <th>Universidade</th>

            <th>Documento</th>

            <th>Cuso/Area</th>

            <th>Quantidade de Vagas</th>

            <th>Período</th>

            <th>Editar / Excluir Solicitação</th>
          </tr>
        </thead>
        <tbody>
          {data.map((employee, index) => {
            return <tr key={index}>
              <td>{employee.name}</td>
              <td>{
                <img src={`http://localhost:8081/images/`+ employee.image} alt="" className='employee_image' />
                }</td>
              <td>{employee.email}</td>
              <td>{employee.address}</td>
              <td>{employee.salary}</td>
              <td>
                <td>
                  <Link to={`/employeeEdit/` + employee.id} className='btn btn-primary btn-sm me-2'>edit</Link>
                  <button onClick={e => handleDelete(employee.id)} className='btn btn-sm btn-danger'>delete</button>
                </td>
              </td>
            </tr>
          })}
        </tbody>
      </table>
   </div>
   </div>
  )
}

export default Employee