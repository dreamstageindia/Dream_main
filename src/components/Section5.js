import React, { useEffect, useRef } from 'react';

import BigBlockText from './BigBlockText';



const Section5 = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const width = (canvas.width = window.innerWidth * 0.75);
    const height = (canvas.height = window.innerHeight * 0.75);
    const gl = canvas.getContext('webgl');

    const mouse = { x: 0, y: 0 };
    const numMetaballs = 30;
    const metaballs = [];

    for (let i = 0; i < numMetaballs; i++) {
      const radius = Math.random() * 60 + 10;
      metaballs.push({
        x: Math.random() * (width - 2 * radius) + radius,
        y: Math.random() * (height - 2 * radius) + radius,
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3,
        r: radius * 0.75,
      });
    }

    const vertexShaderSrc = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragmentShaderSrc = `
      precision highp float;
      const float WIDTH = ${width >> 0}.0;
      const float HEIGHT = ${height >> 0}.0;
      uniform vec3 metaballs[${numMetaballs}];
      void main() {
        float x = gl_FragCoord.x;
        float y = gl_FragCoord.y;
        float sum = 0.0;
        for (int i = 0; i < ${numMetaballs}; i++) {
          vec3 metaball = metaballs[i];
          float dx = metaball.x - x;
          float dy = metaball.y - y;
          float radius = metaball.z;
          sum += (radius * radius) / (dx * dx + dy * dy);
        }
        if (sum >= 0.99) {
          gl_FragColor = vec4(mix(vec3(x / WIDTH, y / HEIGHT, 1.0), vec3(0, 0, 0), max(0.0, 1.0 - (sum - 0.99) * 100.0)), 1.0);
          return;
        }
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
      }
    `;

    const compileShader = (shaderSource, shaderType) => {
      const shader = gl.createShader(shaderType);
      gl.shaderSource(shader, shaderSource);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        throw new Error('Shader compile failed: ' + gl.getShaderInfoLog(shader));
      }
      return shader;
    };

    const vertexShader = compileShader(vertexShaderSrc, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(fragmentShaderSrc, gl.FRAGMENT_SHADER);

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    const vertexData = new Float32Array([-1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0, -1.0]);
    const vertexDataBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexDataBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.STATIC_DRAW);

    const positionHandle = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionHandle);
    gl.vertexAttribPointer(positionHandle, 2, gl.FLOAT, gl.FALSE, 2 * 4, 0);

    const metaballsHandle = gl.getUniformLocation(program, 'metaballs');

    const loop = () => {
      for (let i = 0; i < numMetaballs; i++) {
        const metaball = metaballs[i];
        metaball.x += metaball.vx;
        metaball.y += metaball.vy;
        if (metaball.x < metaball.r || metaball.x > width - metaball.r) metaball.vx *= -1;
        if (metaball.y < metaball.r || metaball.y > height - metaball.r) metaball.vy *= -1;
      }

      const dataToSendToGPU = new Float32Array(3 * numMetaballs);
      for (let i = 0; i < numMetaballs; i++) {
        const baseIndex = 3 * i;
        const mb = metaballs[i];
        dataToSendToGPU[baseIndex + 0] = mb.x;
        dataToSendToGPU[baseIndex + 1] = mb.y;
        dataToSendToGPU[baseIndex + 2] = mb.r;
      }
      gl.uniform3fv(metaballsHandle, dataToSendToGPU);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      requestAnimationFrame(loop);
    };

    loop();

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    return () => canvas.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section ref={sectionRef} className="relative w-screen h-screen overflow-hidden text-white bg-black font-alatsi" id='why'>
      <div className="absolute inset-0 bg-black/60 pointer-events-none z-10" />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="relative z-20 w-full h-full    flex items-center">
        <div className="absolute inset-0 pointer-events-none border border-white/20 md:border-[2px] z-0" />

    <div className="relative z-10 mix-blend-difference text-white">
      <BigBlockText
        title="WHY DREAM STAGE?"
        text={[
          `BECAUSE YOUR DREAM DESERVES MORE THAN HOPE, IT DESERVES A PLATFORM.`,`
  JOIN US IN BUILDING A WORLD WHERE DREAMS TAKE CENTER STAGE.`,`
  
  YOUR DREAM STAGE AWAITS.`
        ]}
        fontSize={'2.5rem'}
      />
    </div>
      </div>
    </section>
  );
};

export default Section5;