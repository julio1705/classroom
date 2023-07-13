import React, { useState } from "react";
import Home from './pages/Home'
import CreateStudent from "./pages/CreateStudent";
import EditStudent from "./pages/EditStudent";
import GradeManagement from "./pages/GradeManagement";

function App() {

    const [shareState, setShareState] = useState({ page: 'home', data: {} })

    const getComponent = (page, data) => {
        switch (page) {
            case 'home':
                return (<Home setShareState={setShareState} shareData={data} />);
            case 'CreateStudent':
                return (<CreateStudent setShareState={setShareState} shareData={data} />);
            case 'editStudent':
                return (<EditStudent setShareState={setShareState} shareData={data} />);
            case 'gradeManagement':
                return (<GradeManagement setShareState={setShareState} shareData={data} />);
            default:
                return <h1>Página não encontrada</h1>
        }
    }

    return (
        <>
            {getComponent(shareState.page, shareState.data)}
        </>
    )

}

export default App;