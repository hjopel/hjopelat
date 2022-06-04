import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { shaderMaterial, useAspect } from "@react-three/drei";
import { extend, useFrame, useThree } from "@react-three/fiber";
import glsl from "babel-plugin-glsl/macro";
import { useColorModePreference, useColorModeValue } from "@chakra-ui/react";

const VideoWobbleMaterial = shaderMaterial(
  {
    uTime: 0,
    color: new THREE.Color(0.2, 0.0, 0.1),
    uRes: new THREE.Vector2(),
    uMap: new THREE.Texture(),
    uMouse: new THREE.Vector2(0,0),
    intersection: new THREE.Vector3(),
    uPr: window.devicePixelRatio.toFixed(1)
  },

  // vertex shader
  glsl`
    varying vec2 vUv;
    uniform vec2 uMouse;
    uniform vec3 intersection;
    void main() {
      vUv = uv;
    //   vec3 pos = vec3(,position.y,position.z);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // fragment shader
  glsl`
    #pragma glslify: snoise3 = require('glsl-noise/simplex/3d')

    uniform float uTime;
    uniform vec3 color;
    varying vec2 vUv;
    uniform sampler2D uMap;
    uniform vec2 uMouse;
    uniform vec3 intersection;
    uniform vec2 uRes;
    uniform float uPr;
    float circle(in vec2 _st, in float _radius, in float blurriness){
        vec2 dist = _st;
        return 1.-smoothstep(_radius-(_radius*blurriness), _radius+(_radius*blurriness), dot(dist,dist)*4.0);
    }

    void main() {
        vec2 res = uRes * uPr;

        vec2 st = gl_FragCoord.xy / res.xy - vec2(0.5);
	    // tip: use the following formula to keep the good ratio of your coordinates
	    st.y *= uRes.y / uRes.x;

        vec2 mouse = uMouse * -0.5;
        mouse.y *= uRes.y / uRes.x;
        // mouse.x *= uRes.y / uRes.x;
        // mouse *= -1.;
        vec2 circlePos = st + mouse;
        float c = circle(circlePos, .2, 1.) * 2.5;
        
            float offx = vUv.x + sin(vUv.y + uTime * .1);
            float offy = vUv.y - uTime * 0.1 - cos(uTime * .001) * 1.;
            float n = snoise3(vec3(offx, offy, uTime * .1) * 8.) - 1.;

            vec4 txtr = vec4(texture2D(uMap, vUv).rgb, 1.);

          float mask = smoothstep(0.4,0.5, n + pow(c, 2.));
          gl_FragColor = mix(vec4(1.,1.,1.,1.), txtr, mask);
        
    }
  `
);

extend({ VideoWobbleMaterial });

const ShaderObject = () => {
  //   const [mouse, setMouse] = useState();
  const view = document.getElementById("view1");
  const domRect = view.getBoundingClientRect();

  const objRef = useRef();
  const [video] = useState(() =>
    Object.assign(document.createElement("video"), {
      src: "/turtle.mp4",
      crossOrigin: "Anonymous",
      loop: true,
      muted: true,
      playsInline: true,
    })
  );
  useFrame(({ clock, gl }) => {
    objRef.current.uTime = clock.getElapsedTime();
  });
  const handleMouseMove = (e) => {
    // objRef.current.uMouse = e.uv;
    objRef.current.uMouse = e.pointer;
  };
  video.play();
  const vidTexture = new THREE.VideoTexture(video);
  const scale = useAspect(2048, 1080, 1);
  return (
    <mesh scale={scale} onPointerMove={(e) => handleMouseMove(e)}>
      <planeBufferGeometry args={[1, 1, 100, 100]} />
      <videoWobbleMaterial uMap={vidTexture} ref={objRef} uRes={new THREE.Vector2(domRect.width , domRect.height )}/>
    </mesh>
  );
};
export default ShaderObject;
