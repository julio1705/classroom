import React, { useEffect, useState } from "react";

function GradeManagement({ setShareState, shareData }) {

    async function getStudentGrades() {
        const grades = await fetch(`http://localhost:3001/students/${shareData.idStudent}/grades/`)
        return grades.json();
    };

    const [student, setStudent] = useState(null);

    useEffect(() => {
        getStudentGrades().then(res => {
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
                        <h1>
                            Gerenciamento de notas
                        </h1>
                        <button onClick={() => showComponents('home')}>Voltar</button>
                    </div>
                    <h3>{student.name} - Id {student.id}</h3>
                    <div className="table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Bimestre</th>
                                    <th>Nota</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td><input className="grades" id="grade1" value={student.grades[0]}></input></td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td><input className="grades" id="grade2" value={student.grades[1]}></input></td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td><input className="grades" id="grade3" value={student.grades[2]}></input></td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td><input className="grades" id="grade4" value={student.grades[3]}></input></td>
                                </tr>
                            </tbody>

                        </table>
                    </div>
                    <br/><br/>
                    <button>Salvar</button>
                </>
            )}

        </>
    )
}
export default GradeManagement;