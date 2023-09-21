
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { SITE_TITLE, META_DESCRIPTION } from './personalizationConstants'; 

document.title = SITE_TITLE;
console.log("Set site Title:", document.title);

// Set or update meta description
let meta = document.querySelector('meta[name="description"]');
if (meta) {
  meta.content = META_DESCRIPTION;
  console.log("Meta found and updated:", meta.content);
} else {
  meta = document.createElement('meta');
  meta.name = 'description';
  meta.content = META_DESCRIPTION;
  document.getElementsByTagName('head')[0].appendChild(meta);
  console.log("New meta created and appended:", meta.content);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
