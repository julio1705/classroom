import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home'
import CreateStudent from "./pages/CreateStudent";
import EditStudent from "./pages/EditStudent";
import GradeManagement from "./pages/GradeManagement";
//import App from './App';

// ReactDOM.render(
//     <App />
//     , document.getElementById('root'));

const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/cadastrar',
      element: <CreateStudent />
    },
    {
      path: '/estudante/:id',
      element: <EditStudent />,
    },
    {
      path: '/estudante/:id/notas',
      element: <GradeManagement />,
    },
  ]);

ReactDOM.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
    , document.getElementById('root'));