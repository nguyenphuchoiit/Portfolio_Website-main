import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import sakura from "../assets/sakura.mp3";
import { HomeInfo, Loader } from "../components";
import { soundoff, soundon } from "../assets/icons";
import { Bird, Island, Plane, Sky } from "../models";
import '../styles/Home.css';

const Home = ({ isMenuOpen }) => {
  const audioRef = useRef(new Audio(sakura));
  audioRef.current.volume = 0.4;
  audioRef.current.loop = true;

  const [currentStage, setCurrentStage] = useState(1);
  const [isRotating, setIsRotating] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [biplaneScale, setBiplaneScale] = useState([3, 3, 3]);
  const [biplanePosition, setBiplanePosition] = useState([0, -4, -4]);
  const [islandScale, setIslandScale] = useState([1, 1, 1]);
  const [islandPosition, setIslandPosition] = useState([0, -6.5, -43.4]);
  const [birdScale, setBirdScale] = useState([1, 1, 1]);
  const [birdPosition, setBirdPosition] = useState([0, 0, 0]);

  useEffect(() => {
    if (isPlayingMusic) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    return () => audioRef.current.pause();
  }, [isPlayingMusic]);

  useEffect(() => {
    const handleResize = () => {
      const [biplaneScale, biplanePosition] = adjustBiplaneForScreenSize();
      const [islandScale, islandPosition] = adjustIslandForScreenSize();
      const [birdScale, birdPosition] = adjustBirdForScreenSize();
      setBiplaneScale(biplaneScale);
      setBiplanePosition(biplanePosition);
      setIslandScale(islandScale);
      setIslandPosition(islandPosition);
      setBirdScale(birdScale);
      setBirdPosition(birdPosition);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const adjustBiplaneForScreenSize = () => {
    if (window.innerWidth < 768) {
      return [[1.5, 1.5, 1.5], [0, -1.5, 0]];
    } else {
      return [[3, 3, 3], [0, -4, -4]];
    }
  };

  const adjustIslandForScreenSize = () => {
    if (window.innerWidth < 768) {
      return [[0.9, 0.9, 0.9], [0, -6.5, -43.4]];
    } else {
      return [[1, 1, 1], [0, -6.5, -43.4]];
    }
  };

  const adjustBirdForScreenSize = () => {
    if (window.innerWidth < 768) {
      return [[0.5, 0.5, 0.5], [0, 2, 0]];
    } else {
      return [[1, 1, 1], [0, 0, 0]];
    }
  };

  return (
    <section className='home-section'>
      <div className={`home-info-container ${isMenuOpen ? 'hidden' : ''}`}>
        {currentStage && <HomeInfo currentStage={currentStage} />}
      </div>

      <div className='canvas-wrapper'>
        <Canvas
          className={`canvas ${isRotating ? "cursor-grabbing" : "cursor-grab"}`}
          camera={{ near: 0.1, far: 1000 }}
        >
          <Suspense fallback={<Loader />}>
            <directionalLight position={[1, 1, 1]} intensity={2} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 5, 10]} intensity={2} />
            <spotLight
              position={[0, 50, 10]}
              angle={0.15}
              penumbra={1}
              intensity={2}
            />
            <hemisphereLight
              skyColor='#b1e1ff'
              groundColor='#000000'
              intensity={1}
            />

            <Bird scale={birdScale} position={birdPosition} />
            <Sky isRotating={isRotating} />
            <Island
              isRotating={isRotating}
              setIsRotating={setIsRotating}
              setCurrentStage={setCurrentStage}
              position={islandPosition}
              rotation={[0.1, 4.7077, 0]}
              scale={islandScale}
            />
            <Plane
              isRotating={isRotating}
              position={biplanePosition}
              rotation={[0, 20.1, 0]}
              scale={biplaneScale}
            />
          </Suspense>
        </Canvas>
      </div>
      <div className='absolute bottom-2 left-2'>
        <img
          src={!isPlayingMusic ? soundoff : soundon}
          alt='jukebox'
          onClick={() => setIsPlayingMusic(!isPlayingMusic)}
          className='w-10 h-10 cursor-pointer object-contain'
        />
      </div>


      <div className='absolute top-5 right-5'>
        <Link to="/ar">
          <button className='glowing-button text-xs py-2 px-4'>
            AR Experience
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Home;
