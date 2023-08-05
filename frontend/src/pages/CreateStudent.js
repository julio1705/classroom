import React from "react";
import Loader from "../components/Loader";
import { Link } from 'react-router-dom';
import config from '../config';

function StudentRegistration() {

    // const showComponents = (page, idStudent) => {
    //     setShareState({
    //         page: page, data: { idStudent }
    //     })
    // }

    function saveStudent() {
        const student = {
            name: document.querySelector('#name').value,
            date: document.querySelector('#date').value,
            sex: document.querySelector('select[name="sex"]').value
        };
        <Loader />
        fetch(`${config.apiUrl}/students`, {
            method: 'POST',
            body: JSON.stringify(student),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                alert(res.message);
                window.location.href = "http://localhost:3000/";
            }).catch(error => console.error(error))
    };

    return (
        <>
            <div className="header">
                <h1>Cadastrar Aluno</h1>
                <Link to={'/'}>
                <button>Voltar</button>
                </Link>
                
            </div>
            <div className="form">
                <form>
                    <label htmlFor="name">Nome do aluno:</label>
                    <input type="text" id="name"></input>
                    <br />

                    <label htmlFor="date">Data de nascimento:</label>
                    <input type="date" id="date"></input>
                    <br />

                    <label htmlFor="sex">Sexo:</label>
                    <select name="sex" id="sex">
                        <option value="0">...</option>
                        <option value="M" id="male">Masculino</option>
                        <option value="F" id="women">Feminino</option>
                    </select>
                    <br />
                    <input type="button" id="btnAdd" value="Salvar" onClick={saveStudent}></input>
                </form>
            </div>
        </>
    )
};

export default StudentRegistration;