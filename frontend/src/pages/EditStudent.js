import React, { useEffect, useState } from "react";
import Loader from '../components/Loader';

function EditStudent({ setShareState, shareData }) {

    async function getStudent() {
        const students = await fetch(`http://localhost:3001/students/${shareData.idStudent}`)
        return students.json();
    };

    const [student, setStudent] = useState('');
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    //const [sex, setSex] = useState('');

    useEffect(() => {
        getStudent().then(student => {
            setStudent(student)
            setName(student.name)
            setDate(student.date.slice(0, -14))
            //setSex(student.sex)
        });
        // eslint-disable-next-line
    }, []);

    const showComponents = (page, idStudent) => {
        setShareState({
            page: page, data: { idStudent }
        })
    }

    const saveStudent = async() => {
        const student = {
            name: document.querySelector('#name').value,
            date: document.querySelector('#date').value,
            sex: document.querySelector('select[name="sex"]').value
        }; 
        <Loader />
        fetch(`http://localhost:3001/students/${shareData.idStudent}`, {
            method: 'PUT',
            body: JSON.stringify(student),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                alert(res.message);
                window.location.reload();
            }).catch(error => console.error(error))
    };

    return (
        <>
            {!student && (<Loader />)}
            {student && (
                <>
                    <div className="header">
                        <h1>Editar Aluno</h1>
                        <button onClick={() => showComponents('home')}>Voltar</button>
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
                            <select name="sex" id="sex" defaultValue={student.sex}>
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