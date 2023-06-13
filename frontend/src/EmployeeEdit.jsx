import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function EmployeeEdit() {

    const [data,setData] = useState({
        name: '',
        email: '',
        password:'',
        address:'',
        salary: '',
        
        })
        const navigate = useNavigate()

        const {id} = useParams();

        useEffect(()=> {   
            axios.get('http://localhost:8081/get/'+id)
            .then(res => {
                setData({...data, name: res.data.Result[0].name,
                                  email: res.data.Result[0].email,
                                  address: res.data.Result[0].address,
                                  salary: res.data.Result[0].salary,        
                        })
            })
            .catch(err => console.log(err));
        }, [])
        
        const handleSubmit = (event) => {
            event.preventDefault();
            axios.put('http://localhost:8081/update/'+id, data)
            .then( res => {
                if(res.data.Status === 'sucesso'){
                    navigate('/employee')
                }
            })
            .catch(err => console.log(err));
        }
        
    return (
        <div className='d-flex flex-column align-items-center pt-4'>
        <h2>Update Employee</h2>
        <form className="row g-3 w-50" onSubmit={handleSubmit}>
           <div className="col-12">
                <label for="inputName" className="form-label">Name</label>
                <input type="text" className="form-control" id="inputName" placeholder='Nome' autoComplete='off'
                onChange={e => setData({...data, name: e.target.value})} value={data.name}/>
           </div>
            <div className="col-12">
                <label for="inputEmail4" className="form-label">Email</label>
                <input type="email" className="form-control" id="inputEmail4" placeholder='Email' autoComplete='off'
                onChange={e => setData({...data, email: e.target.value})} value={data.email}/>
            </div>
             <div className="col-12">
                <label for="inputSalary" className="form-label">Salary</label>
                <input type="text" className="form-control" id="inputSalary" placeholder="Salario" autoComplete='off'
                  onChange={e => setData({...data, salary: e.target.value})} value={data.salary}/>
            </div>
            <div className="col-12">
                <label for="inputAddress" className="form-label">Address</label>
                <input type="text" className="form-control" id="inputAddress" placeholder="address" autoComplete='off'
                  onChange={e => setData({...data, address: e.target.value})} value={data.address}/>
            </div>
            <div className="col-12 mb-3">
                <label className="form-label" for="inputGroupFile01">Imagem</label>
                <input type="file" className="form-control" id="inputGroupFile01"
                onChange={e => setData({...data, image: e.target.files[0]})}/>     
            </div>
            <div className="col-12">
                <button type="submit" className="btn btn-primary">Atualizar</button>
            </div>
        </form>
    </div>
    
      )
    }

export default EmployeeEdit