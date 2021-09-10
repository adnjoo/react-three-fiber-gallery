import { render } from 'react-dom'
import { TextureLoader } from 'three'
import { useSpring, animated } from 'react-spring/three'
import React, { useMemo, useState } from 'react'
import { Canvas } from 'react-three-fiber'
import { HoverImageShader } from './shaders/HoverImageShader'

const images = [
  'https://raw.githubusercontent.com/adnjoo/artExplorer/main/assets/mona2.png',
  'https://raw.githubusercontent.com/adnjoo/react-three-fiber-gallery/main/assets/ape.jpg',
  'https://raw.githubusercontent.com/adnjoo/react-three-fiber-gallery/main/assets/picasso.jpeg',
  'https://raw.githubusercontent.com/adnjoo/react-three-fiber-gallery/main/assets/murakami.jpeg',
  'https://raw.githubusercontent.com/adnjoo/react-three-fiber-gallery/main/assets/starry.jpeg'
]
let counter = 0;

function App() {
  function Image({ url, ...props }) {
    
    const [texture] = useMemo(() => {
      const loader = new TextureLoader()
      return [loader.load(url)]
    }, [url])
  
    const changeImage = () => {
      console.log('test')
      if(counter+1==images.length){
        counter=0
        setImage(images[counter])
        return
      }
      counter++
      setImage(images[counter])
    }
  
    return (
      <animated.mesh
       {...props}
       onClick={(e)=>changeImage()}
       >
        <planeBufferGeometry attach="geometry" args={[5, 7]} />
        <animated.shaderMaterial attach="material" transparent args={[HoverImageShader]} uniforms-texture-value={texture} />
      </animated.mesh>
    )
  }
  let [image, setImage] = useState('https://raw.githubusercontent.com/adnjoo/artExplorer/main/assets/mona2.png')
  
  const [props, set] = useSpring(() => ({
    pos: [0, 0, 0],
    scale: [1, 1, 1],
    rotation: [0, 0, 0],
    config: { mass: 10, tension: 1000, friction: 300, precision: 0.00001 }
  }))

  return (
    <div
      className="main"
      style={{
        margin: "auto",
        /* width: 30%; */
        height: "800px",
        position: "relative"
      }}
      onMouseMove={({ clientX, clientY }) => {
        const x = (clientX / window.innerWidth) * 2 - 1
        const y = -(clientY / window.innerHeight) * 2 + 1

        set({
          pos: [x, 0, 0],
          scale: [1 - y * 0.1, 1 - y * 0.1, 1],
          rotation: [-y * (Math.PI / 3) * 0.3, x * (Math.PI / 3) * 0.3, 0]
        })
      }}>
      <Canvas
        pixelRatio={window.devicePixelRatio || 1}
        style={{
          background: '#272727',

        }}
        camera={{ fov: 65, position: [0, 0, 7] }}>
        <Image url={image} {...props} />
      </Canvas>
    </div>
  )
}

render(<App />, document.getElementById('root'))
