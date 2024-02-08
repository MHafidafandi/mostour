// components/ARComponent.js
'use client';
import { useEffect } from 'react';
import * as THREE from 'three';
import { ARjs } from 'ar.js';

const ARComponent = () => {
  useEffect(() => {
    // Setup AR.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.Camera();
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    const arToolkitSource = new ARjs.Source({});

    // Add your AR elements to the scene

    // Handle resizing
    const onResize = () => {
      arToolkitSource.onResize();
      arToolkitSource.copySizeTo(renderer.domElement);
      if (arToolkitContext.arController !== null) {
        arToolkitSource.copySizeTo(arToolkitContext.arController.canvas);
      }
    };

    // Initialize ARToolkit
    const arToolkitContext = new ARjs.Context({
      cameraParametersUrl: 'data/camera_para.dat',
      detectionMode: 'mono',
    });

    // Initialize ARToolkitSource
    arToolkitContext.init(() => {
      camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
    });

    // Handle resize event
    window.addEventListener('resize', onResize);

    // Add AR.js markers and other elements to the scene

    // Attach renderer to the DOM
    document.body.appendChild(renderer.domElement);

    // Render loop
    const render = () => {
      requestAnimationFrame(render);
      if (arToolkitSource.ready) {
        arToolkitContext.update(arToolkitSource.domElement);
        scene.visible = camera.visible;
      }
      renderer.render(scene, camera);
    };

    // Start rendering
    render();

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('resize', onResize);
      document.body.removeChild(renderer.domElement);
    };
  }, []);

  return <div style={{ position: 'absolute' }}></div>;
};

export default ARComponent;
