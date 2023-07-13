const porta = 3001;

async function getStudents(){
    const students = await fetch(`http://localhost:${porta}/students`)
    return students.json();
};

async function getStudent(id){
    const students = await fetch(`http://localhost:${porta}/students/${id}`)
    return students.json();
};

async function getStudentGrades(id){
    const grades = await fetch(`http://localhost:${porta}/students/${id}/grades/`)
    return grades.json();
};

getStudents().then(students => homeScreen(students));

function homeScreen(students) {
    document.querySelector('body').innerHTML = 
    `
    <h1>
        Alunos 
        <input type="button" value="Cadastrar" onclick="registrationScreen()">
    </h1>
    <table>
        <thead>
            <tr>
                <th>Id</th>
                <th>Nome</th>
                <th>Idade</th>
                <th>Sexo</th>
                <th>Situação</th>
                <th>Ações</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
    `
    students.forEach(student => {
        document.querySelector('table tbody').innerHTML +=
        `
        <tr>
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.sex}</td>
            <td>${student.status}</td>
            <td>
                <input type="button" id="btnGrades" value="Gerenciar notas" onclick="waitingResponse(), gradesScreen(${student.id})">
                <input type="button" id="btnEdit" value="Editar aluno" onclick="waitingResponse(), editStudentScreen(${student.id})">
                <input type="button" id="btnDelete" value="Excluir aluno" onclick="waitingResponse(), deleteStudent(${student.id})">
            </td>
        </tr>
        `
    });
};

function registrationScreen() {
    document.querySelector('body').innerHTML = 
    `
    <h1>
        Cadastrar Aluno 
        <input type="button" id="btnBack" value="Voltar" onclick="waitingResponse(), getStudents().then(students => homeScreen(students))">
    </h1>
    <form>
        <label for="name">Nome do aluno:</label><br>
        <input type="text" id="name"><br><br>
        <label for="date">Data de nascimento:</label><br>
        <input type="date" id="date"><br><br>
        <legend>Sexo:</legend>
        <label for="male">Masculino</label>
        <input type="radio" name="sex" value="M" id="male"/>
        <label for="women">Feminino</label>
        <input type="radio" name="sex" value="F" id="women"/><br><br>
        <input type="button" id="btnAdd" value="Salvar" onclick="addStudent()">
    </form>
    `
};

function addStudent() {
    const student = {
        name: document.querySelector('#name').value,
        date: document.querySelector('#date').value,
        sex: document.querySelector('input[name="sex"]:checked').value
    };
    waitingResponse();
    fetch(`http://localhost:${porta}/students`, {
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
            location.reload();
        }).catch(error => console.error(error))
};

function editStudentScreen(id) {
    getStudent(id).then(student => {
        document.querySelector('body').innerHTML = 
        `
        <h1>
            Editar Aluno 
            <input type="button" id="btnBack" value="Voltar" onclick="waitingResponse(), getStudents().then(students => homeScreen(students))">
        </h1>
        <form>
            <label for="name">Nome do aluno:</label><br>
            <input type="text" id="name" value="${student.name}"><br><br>
            <label for="date">Data de nascimento:</label><br>
            <input type="date" id="date" value="${student.date.slice(0, -14)}"><br><br>
            <legend>Sexo:</legend>
            <label for="male">Masculino</label>
            <input type="radio" name="sex" value="M" id="male" />
            <label for="women">Feminino</label>
            <input type="radio" name="sex" value="F" id="women" /><br><br>
            <input type="button" id="btnSave" value="Salvar" onclick="editStudent(${student.id})">
        </form>
        `
        if(student.sex === "M"){
            document.querySelector('#male').setAttribute('checked', 'true')
        } else {
            document.querySelector('#women').setAttribute('checked', 'true')
        };
    });
};

function editStudent(id) {
    const student = {
        name: document.querySelector('#name').value,
        date: document.querySelector('#date').value,
        sex: document.querySelector('input[name="sex"]:checked').value
    };
    waitingResponse();
    fetch(`http://localhost:${porta}/students/${id}`, {
        method: 'PUT',
        body: JSON.stringify(student),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(res => res.json())
        .then(res => {
            alert(res.message);
            location.reload();
        })
        .catch(error => console.error(error))
};

function gradesScreen(id) {
    getStudentGrades(id).then(res => {
        document.querySelector('body').innerHTML = 
        `
        <h1>
            Notas do(a) estudante ${res.name} - Id ${res.id} 
            <input type="button" id="btnBack" value="Voltar" onclick="waitingResponse(), getStudents().then(students => homeScreen(students))">
        </h1>
        <table>
            <thead>
                <tr>
                    <th>Bimestre</th>
                    <th>Nota</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
        `
        const table = document.querySelector('table tbody');
        for (let index = 1; index <= 4; index++) {
            table.innerHTML += `
            <tr>
                <td>${index}</td>
                <td><input id="note${JSON.stringify(index)}" value="${res.grades[index-1]}"></td>
            </tr>
            `
        };
        
        table.innerHTML += 
        `
        <br>
        <tr>
            <td>
                <input type="button" id="btnSave" value="Salvar" onclick="registerGrades(${res.id}, '${res.method}')">
            <td>
        <tr>
        `
        });
};

function registerGrades(id, gradesMethod) {
    const grades = {
        b1: document.querySelector('#note1').value,
        b2: document.querySelector('#note2').value,
        b3: document.querySelector('#note3').value,
        b4: document.querySelector('#note4').value
    };
    waitingResponse();
    fetch(`http://localhost:${porta}/students/${id}/grades/`, {
        method: gradesMethod,
        body: JSON.stringify(grades),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(res => res.json())
        .then(res => {
            alert(res.message);
            location.reload();
        })
        .catch(error => console.error(error))
};

function deleteStudent(id) {
    getStudent(id).then(student => {
        fetch(`http://localhost:${porta}/students/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(res => {
                alert(res.message);
                location.reload();
            });
    });
};

function waitingResponse(){
    document.querySelector('body').innerHTML = 
    `
    <div class="loader1">
        <div class="loader2"></div>
    </div>
    `
};