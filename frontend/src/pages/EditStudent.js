import React, { useEffect, useState } from "react";
import Loader from '../components/Loader';
import { Link, useParams } from 'react-router-dom';

function EditStudent() {

    let student = useParams();

    async function getStudent() {
        const students = await fetch(`http://localhost:3001/students/${student.id}`);
        return students.json();
    };

    const [studentData, setstudentData] = useState('');
    const [name, setName] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        getStudent().then(res => {
            setstudentData(res)
            setName(res.name)
            setDate(res.date.slice(0, -14))
        });
        // eslint-disable-next-line
    }, []);

    // const showComponents = (page, idStudent) => {
    //     setShareState({
    //         page: page, data: { idStudent }
    //     })
    // }

    function saveStudent() {
        const date = {
            name: document.querySelector('#name').value,
            date: document.querySelector('#date').value,
            sex: document.querySelector('select[name="sex"]').value
        };
        <Loader />
        fetch(`http://localhost:3001/students/${student.id}`, {
            method: 'PUT',
            body: JSON.stringify(date),
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
            {!studentData && (<Loader />)}
            {studentData && (
                <>
                    <div className="header">
                        <h1>Editar Aluno</h1>
                        <Link to={'/'}>
                            <button>Voltar</button>
                        </Link>
                    </div>
                    <div className="form">
                        <form>
                            <label htmlFor="name">Nome do aluno:</label>
                            <input type="text" id="name" value={name} onChange={(event) => setName(event.target.value)}></input>
                            <br />
                            <label htmlFor="date">Data de nascimento:</label>
                            <input type="date" id="date" value={date} onChange={(event) => setDate(event.target.value)}></input>
                            <br />
                            <label htmlFor="sex">Sexo:</label>
                            <select name="sex" id="sex" defaultValue={studentData.sex}>
                                <option value="0">...</option>
                                <option value="M" id="male">Masculino</option>
                                <option value="F" id="women">Feminino</option>
                            </select>
                            <br />
                            <input type="button" id="btnAdd" value="Salvar" onClick={saveStudent}></input>
                        </form>
                    </div>
                </>
            )}
        </>
    )
};

export default EditStudent;