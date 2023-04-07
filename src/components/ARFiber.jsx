import { Canvas } from '@react-three/fiber'
import { ARButton, Controllers, XR } from '@react-three/xr'
import React, { useState } from 'react'
import { Cow } from './Cow'

import './button.css'


export const ARFiber = () => {
  
  const [dance,setDance] = useState(false)
  const [position, setPosition] = useState([0,-.1,4.7])

  const handleClick=()=>{
    setDance(true)
    setPosition([0,-.1,-.46])
  }
  return (
    <div style={{width:'100%',height:'100vh'}}>
      <ARButton className='b'
        onClick={handleClick} 
      />
      <Canvas style={{width:'100%',height:'100vh'}}>
        <XR referenceSpace='local' >
          <ambientLight intensity={3} />

          <directionalLight color="#FFFFE3" position={[0, 0, 5]} />
            <Cow dance={dance} position={position} />
          <Controllers />
        </XR>
      </Canvas>
    </div>
  )
}

