// import react from 'react';
// import  ReactDom  from 'react-dom'
import { createRoot } from 'react-dom/client';

// Bracket pair colorizer - extension
import App from './App';


// ReactDom.render(<App /> , document.getElementById('root'));

const root = createRoot(document.getElementById('root'));
root.render(<App />);