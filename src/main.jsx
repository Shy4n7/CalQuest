import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

console.log('main.jsx loading...');

const rootElement = document.getElementById('root');
console.log('Root element:', rootElement);

if (rootElement) {
    try {
        console.log('Creating React root...');
        const root = createRoot(rootElement);
        console.log('Rendering App...');
        root.render(
            <StrictMode>
                <App />
            </StrictMode>
        );
        console.log('App rendered successfully');
    } catch (error) {
        console.error('Error rendering app:', error);
        document.body.innerHTML = `<div style="color: red; padding: 20px;">Error: ${error.message}</div>`;
    }
} else {
    console.error('Root element not found!');
    document.body.innerHTML = '<div style="color: red; padding: 20px;">Root element not found!</div>';
}
