// ARExperience.jsx
import React, { useEffect, useRef, useState } from 'react';
import '../styles/ARExperience.css'; // Ensure this file is being imported correctly

const ARExperience = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [filter, setFilter] = useState('none');
  const [images, setImages] = useState({
    hat: null,
    glasses: null,
    hairColor: null,
  });

  useEffect(() => {
    const startVideo = () => {
      navigator.mediaDevices.getUserMedia({ video: {} })
        .then(stream => {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        })
        .catch(err => console.error('Error accessing webcam:', err));
    };

    startVideo();

    const drawFilters = () => {
      if (videoRef.current && canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;

        ctx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);

        if (filter === 'hat' && images.hat) {
          applyFilter(images.hat, ctx, { x: 200, y: 50, width: 240, height: 120 });
        } else if (filter === 'glasses' && images.glasses) {
          applyFilter(images.glasses, ctx, { x: 180, y: 180, width: 240, height: 80 });
        } else if (filter === 'hairColor' && images.hairColor) {
          applyFilter(images.hairColor, ctx, { x: 200, y: 50, width: 240, height: 120 });
        }

        requestAnimationFrame(drawFilters);
      }
    };

    drawFilters();

    return () => {
      if (videoRef.current) {
        const stream = videoRef.current.srcObject;
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
        }
      }
    };
  }, [filter, images]);

  useEffect(() => {
    const loadImages = () => {
      const loadImage = (src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = () => reject(new Error(`Failed to load image at ${src}`));
          img.src = src;
        });
      };

      Promise.all([
        loadImage(' /images/hat.png'),
        loadImage('/images/glasses.jpeg'),
        loadImage('/images/hair.jpeg')
      ]).then(([hat, glasses, hairColor]) => {
        setImages({ hat, glasses, hairColor });
      }).catch(err => console.error('Error loading images:', err));
    };

    loadImages();
  }, []);

  const applyFilter = (filterImage, ctx, { x, y, width, height }) => {
    if (filterImage) {
      const adjustedX = x - 50;
      const adjustedY = y - 30;
      const adjustedWidth = width * 1.2;
      const adjustedHeight = height * 1.2;
      ctx.drawImage(filterImage, adjustedX, adjustedY, adjustedWidth, adjustedHeight);
    } else {
      console.error('Filter image not loaded');
    }
  };

  return (
    <div className="ar-experience-container">
      <div className="ar-experience">
        <video ref={videoRef} className="video-feed"></video>
        <canvas ref={canvasRef} className="canvas-overlay"></canvas>
        <div className="controls">
          <button onClick={() => setFilter('none')}>None</button>
          <button onClick={() => setFilter('hat')}>Hat</button>
          <button onClick={() => setFilter('glasses')}>Glasses</button>
          <button onClick={() => setFilter('hairColor')}>Hair Color</button>
        </div>
      </div>
    </div>
  );
};

export default ARExperience;
