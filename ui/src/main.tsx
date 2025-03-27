import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import BG from './AnimatedBg.tsx'
import Mask from './Mask.tsx'
import App from './App.tsx'
import './index.css'
import "@fontsource/jost/latin.css"
import { BrowserRouter } from 'react-router-dom'


function Main() {

  const [realized, setRealized] = useState(false)

  return <React.StrictMode>
    <BrowserRouter>
    
      <div className='absolute top-0 bottom-0 left-0 right-0 z-10'>
        <App setRealized={setRealized} realized={realized} />
      </div>
      <div className='fixed top-0 bottom-0 left-0 right-0 z-0'>
        <Mask />
      </div>
      <div className='fixed top-0 bottom-0 left-0 right-0 -z-10'>
        <BG realised={realized} />
      </div>
    </BrowserRouter>

  </React.StrictMode>
}

ReactDOM.createRoot(document.getElementById('root')!).render(<Main />,)

