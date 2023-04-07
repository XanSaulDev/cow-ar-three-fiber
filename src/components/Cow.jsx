import React, { useEffect, useRef } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as TWEEN from "@tweenjs/tween.js";

import cow from '../glb/cow.glb'

import cowMusic from '../assets/mp3/polishcow.mp3'

const music=new Audio(cowMusic)

export function Cow(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(cow);
  const { actions } = useAnimations(animations, group);
  const { dance, position } = props
  

  useEffect(() => {
    if(dance){
      music.volume=0.20
      music.play()
      actions['Dairy_cow_Mat.002_0Action'].timeScale=1.2
      actions['Dairy_cow_Mat.002_0Action'].play()
    }
  },[dance,actions])

  useEffect(()=>{
    if(dance){
      new TWEEN.Tween(group.current.rotation).to({x:0},200).easing(TWEEN.Easing.Linear.None).repeat(Infinity).yoyo(true).start()
      new TWEEN.Tween(group.current.rotation).to({y:-.8},400).easing(TWEEN.Easing.Linear.None).repeat(Infinity).yoyo(true).start()
    }
  },[group,dance])

  useFrame(()=>{
    TWEEN.update()
  },)
  
  return (
    <group ref={group} {...props} dispose={null}  scale={.1} position={position} rotation={[.01,-.9,0]}>
      <group name="Scene">
        <group
          name="Sketchfab_model"
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.73}
        >
          <group
            name="4adc637060aa427bad0946b9ea7f0b83fbx"
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.01}
          >
            <group name="RootNode">
              <group
                name="Dairy_cow"
                position={[-21.61, 2.25, -35.35]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={100}
              >
                <mesh
                  name="Dairy_cow_Mat002_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Dairy_cow_Mat002_0.geometry}
                  material={materials["Mat.002"]}
                  rotation={[0, -0.11, 0]}
                />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload(cow);