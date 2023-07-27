import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { Link } from 'react-router-dom';

function Home() {

    async function getStudents() {
        const students = await fetch(`http://localhost:3001/students`)
        return students.json();
    };

    async function getStudent(id) {
        const students = await fetch(`http://localhost:3001/students/${id}`)
        return students.json();
    };

    const [students, setStudents] = useState([]);

    useEffect(() => {
        getStudents().then(res => {
            setStudents(res)
        });
    }, []);

    // const showComponents = (page, idStudent) => {
    //     setShareState({
    //         page: page, data: { idStudent }
    //     })
    // }

    function deleteStudent(id) {
        getStudent(id).then(student => {
            fetch(`http://localhost:3001/students/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(res => {
                    alert(res.message);
                    window.location.reload();
                });
        });
    };

    return (
        <>
            {!students && (<Loader />)}
            {students && (
                <>
                    <div className="header">
                        <h1>Alunos</h1>
                        <Link to={'/cadastrar'}>
                            <button>Cadastrar</button>
                        </Link>

                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Idade</th>
                                <th>Sexo</th>
                                <th>Situação</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student) => (
                                <tr>
                                    <td>{student.id}</td>
                                    <td>{student.name}</td>
                                    <td>{student.age}</td>
                                    <td>{student.sex}</td>
                                    <td>{student.status}</td>
                                    <td>
                                        <Link to={`/aluno/${student.id}/notas`}>
                                            <button>Gerenciar notas</button>
                                        </Link>
                                        <Link to={`/editar/${student.id}`}>
                                            <button>Editar aluno</button>
                                        </Link>
                                        <button onClick={() => deleteStudent(student.id)}>Excluir aluno</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </>
    )
}

export default Home;