import { useState, useRef, forwardRef, useEffect } from "react";
import {
  OrbitControls,
  RenderTexture,
  Text,
  PerspectiveCamera,
  shaderMaterial,
  useAspect,
} from "@react-three/drei";
import { useFrame, extend, useThree } from "@react-three/fiber";
import * as THREE from "three";
import glsl from "babel-plugin-glsl/macro";
import gsap from "gsap";
import useStore from "./customHooks/useStore";
import { useLocation } from "wouter";
const ProjectsMaterial = shaderMaterial(
  {
    uTime: 0,
    uMap: new THREE.Texture(),
    uMap2: new THREE.Texture(),
    uMix: 0,
    uDist: 0.01,
    uAlpha: 1,
  },

  // vertex shader
  glsl`
  #pragma glslify: snoise = require(glsl-noise/simplex/3d)
  //https://github.com/cabbibo/glsl-curl-noise/blob/master/curl.glsl
  vec3 snoiseVec3( vec3 x ){
      float s  = snoise(vec3( x ));
      float s1 = snoise(vec3( x.y - 19.1 , x.z + 33.4 , x.x + 47.2 ));
      float s2 = snoise(vec3( x.z + 74.2 , x.x - 124.5 , x.y + 99.4 ));
      vec3 c = vec3( s , s1 , s2 );
      return c;
  }
  vec3 curlNoise( vec3 p ){
  
      const float e = .1;
      vec3 dx = vec3( e   , 0.0 , 0.0 );
      vec3 dy = vec3( 0.0 , e   , 0.0 );
      vec3 dz = vec3( 0.0 , 0.0 , e   );
      vec3 p_x0 = snoiseVec3( p - dx );
      vec3 p_x1 = snoiseVec3( p + dx );
      vec3 p_y0 = snoiseVec3( p - dy );
      vec3 p_y1 = snoiseVec3( p + dy );
      vec3 p_z0 = snoiseVec3( p - dz );
      vec3 p_z1 = snoiseVec3( p + dz );
      float x = p_y1.z - p_y0.z - p_z1.y + p_z0.y;
      float y = p_z1.x - p_z0.x - p_x1.z + p_x0.z;
      float z = p_x1.y - p_x0.y - p_y1.x + p_y0.x;
      const float divisor = 1.0 / ( 2.0 * e );
      return normalize( vec3( x , y , z ) * divisor );
  }
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uDist;
  varying vec2 vUv;
  void main() {  
      vUv = uv;
      gl_PointSize = 1.5;
      vec3 distortion = vec3(position.x * 2., position.y, 1.) * curlNoise(vec3(
          position.x  + uTime * 0.05, 
          position.y  + uTime*0.1,
          (position.x * position.y)*0.02)) * uDist;
      vec3 finalPos = position + distortion;
      vec4 modelViewPosition = modelViewMatrix * vec4(finalPos, 1.0);
    gl_Position = projectionMatrix * modelViewPosition;
  }
    `,
  // fragment shader
  glsl`  
      uniform float uTime;
      uniform sampler2D uMap;
      uniform sampler2D uMap2;
      uniform float uMix;
      varying vec2 vUv;
      uniform float uAlpha;
      void main() {
        vec4 txtr = texture2D(uMap, vUv);
        // vec4 txtr2 = texture2D(uMap2, vUv);
        // gl_FragColor = mix(txtr, txtr2, uMix);
        gl_FragColor = vec4(txtr.rgb, uAlpha);
        // gl_FragColor = vec4(1., 0.,0.,.1);
      }
    `
);

extend({ ProjectsMaterial });
const ProjectScene = ({ img, geom }) => {
  const matRef = useRef();
  const meshRef = useRef();
  useFrame(({ clock }) => {
    if (matRef) {
      matRef.current.uTime = clock.getElapsedTime();
    }
  });
  useEffect(()=>{
    console.log(meshRef.current)
  })
  const scale = useAspect(img.width, img.height, 1);
  return (
    <>
      <ambientLight intensity={1} />
      <points scale={scale} ref={meshRef} position={[0, 0, 0]}>
        {geom}
        <projectsMaterial ref={matRef} uMap={img.txtr} />
      </points>
    </>
  );
};
export default ProjectScene;
