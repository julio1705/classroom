import React, { useEffect, useState } from "react";

function EditStudent({ setShareState, shareData }) {

    async function getStudent() {
        const students = await fetch(`http://localhost:3001/students/${shareData.idStudent}`)
        return students.json();
    };

    const [student, setStudent] = useState(null);

    useEffect(() => {
        getStudent().then(res => {
            setStudent(res)
        });
    }, []);

    const showComponents = (page, idStudent) => {
        setShareState({
            page: page, data: { idStudent }
        })
    }

    return (
        <>
            {!student && (<p>Carregando...</p>)}
            {student && (
                <>
                    <div className="header">
                        <h1>Editar Aluno</h1>
                        <button onClick={() => showComponents('home')}>Voltar</button>
                    </div>
                    <div className="form">
                        <form>
                            <label htmlFor="name">Nome do aluno:</label>
                            <input type="text" id="name" value={student.name}></input>
                            <br />
                            <label htmlFor="date">Data de nascimento:</label>
                            <input type="date" id="date" value={student.date.slice(0, -14)}></input>
                            <br />
                            <label htmlFor="sex">Sexo:</label>
                            <select name="sex" id="sex">
                                <option value="0">...</option>
                                <option value="M" id="male">Masculino</option>
                                <option value="F" id="women">Feminino</option>
                            </select>
                            <br />
                            <input type="button" id="btnAdd" value="Salvar" ></input>
                        </form>
                    </div>
                </>
            )}
        </>
    )
};

export default EditStudent;