import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [serverData, setServerData] = useState(null)

  // URL condicional: si estamos en localhost, intentamos 
  // (esto fallará en github pages, demostrando la diferencia)
  useEffect(() => {
    fetch('/api/hola')
      .then(res => {
        if (!res.ok) throw new Error("No serverless")
        return res.json()
      })
      .then(data => setServerData(data))
      .catch(err => {
        console.log("Modo estático (posiblemente GitHub Pages)", err)
        setServerData(null)
      })
  }, [])

  return (
    <>
      <div className="logos">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        {serverData && (
          <a href="https://workers.cloudflare.com/" target="_blank">
            <svg className="logo cf" viewBox="0 0 109 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M98.6 9.5c.6-1.6 2-2.7 3.7-2.7 2.1 0 3.8 1.7 3.8 3.8 0 .4-.1.8-.2 1.2l-3.5 9.7c-.1.2-.1.4-.1.6 0 .6.5 1.1 1.1 1.1.4 0 .7-.2.9-.5l.4-.8c.1-.2.4-.3.6-.2.2.1.3.4.2.6l-.4.8c-.4.8-1.2 1.3-2.1 1.3-1.3 0-2.4-1.1-2.4-2.4 0-.3.1-.6.2-.9l3.5-9.7c.1-.3.2-.6.2-.9 0-1.4-1.2-2.6-2.6-2.6-1.2 0-2.2.8-2.5 1.9l-3.9 10.7c-.1.2-.1.4-.1.6 0 .6.5 1.1 1.1 1.1.4 0 .7-.2.9-.5l.4-.8c.1-.2.4-.3.6-.2.2.1.3.4.2.6l-.4.8c-.4.8-1.2 1.3-2.1 1.3-1.3 0-2.4-1.1-2.4-2.4 0-.3.1-.6.2-.9L98.6 9.5z" fill="#F38020" />
              <path d="M0 18.6c0-5 3.3-9.2 7.9-10.6.2-.1.5 0 .6.2.1.2 0 .5-.2.6C4.1 10 1 13.9 1 18.6c0 5.5 4.5 10 10 10 4.7 0 8.6-3.1 9.8-7.3.1-.2.3-.4.6-.3.2.1.4.3.3.6-1.3 4.6-5.5 7.9-10.7 7.9-6.1 0-11-4.9-11-11z" fill="#F38020" />
              <path d="M90.3 13.9c-.2-.6-.8-1-1.4-1h-4.7c-.4 0-.7.3-.7.7 0 .4.3.7.7.7h4.3l-2 5.5h-4.7c-.4 0-.7.3-.7.7 0 .4.3.7.7.7h4.3l-.8 2.2c-.1.2-.1.4-.1.6 0 .6.5 1.1 1.1 1.1.4 0 .7-.2.9-.5l.4-.8c.1-.2.4-.3.6-.2.2.1.3.4.2.6l-.4.8c-.4.8-1.2 1.3-2.1 1.3-1.3 0-2.4-1.1-2.4-2.4 0-.3.1-.6.2-.9l3.9-10.7c.1-.3.1-.6.1-.9 0-.3-.1-.6-.3-.9z" fill="#F38020" />
            </svg>
          </a>
        )}
      </div>

      <h1>DevOps Dashboard</h1>

      {/* Visualización del estado Serverless */}
      {serverData ? (
        <div className="card serverless">
          <div className="status-badge success">⚡ Serverless Backend Connected</div>
          <h3>{serverData.message}</h3>
          <p>Time: {serverData.timestamp}</p>
          <p>Environment: <strong>Cloudflare Pages</strong></p>
        </div>
      ) : (
        <div className="card static">
          <div className="status-badge warning">📦 Static Hosting Mode</div>
          <p>Backend not detected. Likely running on <strong>GitHub Pages</strong> or <strong>Localhost</strong>.</p>
          <p><small>(Deploy to Cloudflare Pages to activate Serverless functions)</small></p>
        </div>
      )}

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
    </>
  )
}

export default App
