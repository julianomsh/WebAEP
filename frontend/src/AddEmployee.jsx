import React, {useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddEmployee() {

const [data,setData] = useState({
name: '',
email: '',
password:'',
address:'',
salary: '',
image:''

})


const navigate = useNavigate()

const handleSubmit = (event) => {
    event.preventDefault();
    const formdata = new FormData();
    formdata.append("name", data.name);
    formdata.append("email", data.email);
    formdata.append("password", data.password);
    formdata.append("address", data.address);
    formdata.append("salary", data.salary);
    formdata.append("image", data.image);
    axios.post('http://localhost:8081/create', formdata)
    .then( res => {
        navigate('/employee')
    })
    .catch(err => console.log(err));
}

  return (
    <div className='d-flex flex-column align-items-center pt-4'>
    <h2>Solicitação de Estagio</h2>
    <form className="row g-3 w-50" onSubmit={handleSubmit}>
       <div className="col-12">
            <label for="inputName" className="form-label">Universidade:</label>
            <input type="text" className="form-control" id="inputName" placeholder='Universidade' autoComplete='off' required
            onChange={e => setData({...data, name: e.target.value})}/>
       </div>
        <div className="col-12">
            <label for="inputEmail4" className="form-label">E-mail:</label>
            <input type="email" className="form-control" id="inputEmail4" placeholder='Email para Contato' autoComplete='off' required
            onChange={e => setData({...data, email: e.target.value})}/>
        </div>

         <div className="col-12">
            <label for="inputSalary" className="form-label">Quantidade de Vagas:</label>
            <input type="text" className="form-control" id="inputSalary" placeholder="Quantidade" autoComplete='off' required
              onChange={e => setData({...data, salary: e.target.value})}/>
        </div>
        <div className="col-12">
            <label for="inputAddress" className="form-label">Curso/Periodo:</label> 
            <input type="text" className="form-control" id="inputAddress" placeholder="Curso/Periodo:" autoComplete='off' required
              onChange={e => setData({...data, address: e.target.value})}/>
        </div>
        <div className="col-12 mb-3">
            <label className="form-label" for="inputGroupFile01" >Folha Solicitação:</label>
            <input type="file" className="form-control" id="inputGroupFile01" required
            onChange={e => setData({...data, image: e.target.files[0]})}/>     
        </div>
        <div className="col-12">
            <button type="submit" className="btn btn-primary">Criar</button>
        </div>
    </form>
</div>

  )
}

export default AddEmployee