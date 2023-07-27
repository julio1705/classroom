import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { Link, useParams } from 'react-router-dom';

function GradeManagement() {

    let student = useParams();

    async function getStudentGrades() {
        const grades = await fetch(`http://localhost:3001/students/${student.id}/grades/`)
        return grades.json();
    };

    const [studentData, setstudentData] = useState('');
    const [grade1, setGrade1] = useState('');
    const [grade2, setGrade2] = useState('');
    const [grade3, setGrade3] = useState('');
    const [grade4, setGrade4] = useState('');

    useEffect(() => {
        getStudentGrades().then(student => {
            setstudentData(student)
            setGrade1(student.grades[0])
            setGrade2(student.grades[1])
            setGrade3(student.grades[2])
            setGrade4(student.grades[3])
        });
        // eslint-disable-next-line
    }, []);

    // const showComponents = (page, idStudent) => {
    //     setShareState({
    //         page: page, data: { idStudent }
    //     })
    // }

    function saveGrades(id, gradesMethod) {
        const grades = {
            b1: document.querySelector('#grade1').value,
            b2: document.querySelector('#grade2').value,
            b3: document.querySelector('#grade3').value,
            b4: document.querySelector('#grade4').value
        };
        <Loader />
        fetch(`http://localhost:3001/students/${id}/grades/`, {
            method: gradesMethod,
            body: JSON.stringify(grades),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(res => res.json())
            .then(res => {
                alert(res.message);
                window.location.href = "http://localhost:3000/";
            })
            .catch(error => console.error(error))
    };

    return (
        <>
            {!studentData && (<Loader />)}
            {studentData && (
                <>
                    <div className="header">
                        <h1>
                            Gerenciamento de notas
                        </h1>
                        <Link to={'/'}>
                            <button>Voltar</button>
                        </Link>
                    </div>
                    <h3>{studentData.name} - Id {studentData.id}</h3>
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
                                    <td><input className="grades" id="grade1" value={grade1} onChange={(event) => setGrade1(event.target.value)}></input></td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td><input className="grades" id="grade2" value={grade2} onChange={(event) => setGrade2(event.target.value)}></input></td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td><input className="grades" id="grade3" value={grade3} onChange={(event) => setGrade3(event.target.value)}></input></td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td><input className="grades" id="grade4" value={grade4} onChange={(event) => setGrade4(event.target.value)}></input></td>
                                </tr>
                            </tbody>

                        </table>
                    </div>
                    <br /><br />
                    <button onClick={() => saveGrades(studentData.id, studentData.method)} >Salvar</button>
                </>
            )}
        </>
    )
}
export default GradeManagement;