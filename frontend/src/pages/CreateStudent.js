import React from "react";

function StudentRegistration({ setShareState }) {

    const showComponents = (page, idStudent) => {
        setShareState({
            page: page, data: { idStudent }
        })
    }

    return (
        <>
            <div className="header">
                <h1>Cadastrar Aluno</h1>
                <button onClick={() => showComponents('home')}>Voltar</button>
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
                    <input type="button" id="btnAdd" value="Salvar" ></input>
                </form>
            </div>
        </>
    )

};

export default StudentRegistration;