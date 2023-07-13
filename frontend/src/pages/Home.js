import React, { useEffect, useState } from "react";

function Home({ setShareState }) {

    async function getStudents() {
        const students = await fetch(`http://localhost:3001/students`)
        return students.json();
    };

    const [students, setStudents] = useState([]);

    useEffect(() => {
        getStudents().then(res => {
            setStudents(res)
        });
    }, []);

    const showComponents = (page, idStudent) => {
        setShareState({
            page: page, data: { idStudent }
        })
    }

    return (
        <>
            <div className="header">
                <h1>Alunos</h1>
                <button onClick={() => showComponents('CreateStudent')}>Cadastrar</button>
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
                                <button onClick={() => showComponents('gradeManagement', student.id)}>Gerenciar notas</button>
                                <button onClick={() => showComponents('editStudent', student.id)}>Editar aluno</button>
                                <button>Excluir aluno</button>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </>
    )
}

export default Home;