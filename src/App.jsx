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
            <img src="https://archbee-image-uploads.s3.amazonaws.com/IB2f1H85R87-V0O-v608h/2026-02-02/14-53-06/image.png" className="logo cf" alt="Cloudflare logo" />
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
