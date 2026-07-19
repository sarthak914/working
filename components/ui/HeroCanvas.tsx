"use client";

import React, { useEffect, useRef, useCallback } from "react";

/**
 * HeroCanvas - Dark cinematic WebGL environment for the Scope Hero section.
 *
 * Visual elements:
 *  - Near-black base (#080808)
 *  - Extremely subtle fine grid with cursor-driven distortion
 *  - fBm noise layer for depth/texture
 *  - Large faint diamond geometry with subtle parallax
 *
 * Cursor interaction: grid lines near pointer distort radially with a soft
 * falloff. Effect is intended to feel alive without becoming a visible cursor
 * spotlight.
 *
 * Reduced motion: renders a static frame that preserves the environment
 * without continuous animation or cursor reactivity.
 */

const VERTEX_SHADER = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision highp float;
  varying vec2 v_uv;

  uniform float u_time;
  uniform vec2  u_resolution;
  uniform vec2  u_mouse;
  uniform float u_mouse_active;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i + vec2(0,0)), hash(i + vec2(1,0)), u.x),
      mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p  = p * 2.1 + vec2(1.7, 9.2);
      a *= 0.5;
    }
    return v;
  }

  float grid(vec2 uv, float scale, float lineWidth) {
    vec2 g  = fract(uv * scale);
    vec2 dg = min(g, 1.0 - g);
    float d = min(dg.x, dg.y);
    return 1.0 - smoothstep(0.0, lineWidth, d);
  }

  float diamondSDF(vec2 p, float size) {
    p = abs(p);
    return (p.x + p.y) - size;
  }

  void main() {
    vec2 uv = v_uv;
    float ar = u_resolution.x / u_resolution.y;
    vec2 uvAR = vec2((uv.x - 0.5) * ar, uv.y - 0.5);

    vec2 mouse;
    if (u_mouse_active > 0.5) {
      mouse = u_mouse;
    } else {
      mouse = vec2(
        0.5 + sin(u_time * 0.18) * 0.15,
        0.5 + cos(u_time * 0.13) * 0.10
      );
    }
    vec2 mouseAR = vec2((mouse.x - 0.5) * ar, mouse.y - 0.5);

    float distFromMouse = length(uvAR - mouseAR);
    float distortRadius = 0.28;
    float distortStrength = 0.018;
    float falloff = 1.0 - smoothstep(0.0, distortRadius, distFromMouse);
    falloff = falloff * falloff;

    vec2 toMouse = normalize(uvAR - mouseAR + vec2(0.0001));
    vec2 distortedUV = uv + toMouse * falloff * distortStrength * -1.0;

    float g1 = grid(distortedUV, 28.0, 0.022) * 0.10;
    float g2 = grid(distortedUV, 7.0, 0.015) * 0.06;
    float gridVal = g1 + g2;

    vec2 noiseCoord = uv * 2.5 + u_time * 0.012;
    float n = fbm(noiseCoord);
    float depthNoise = (n - 0.5) * 0.018;

    float parallaxStrength = 0.04;
    vec2 diamondCenter = vec2(
      (mouse.x - 0.5) * -parallaxStrength * ar,
      (mouse.y - 0.5) * -parallaxStrength
    );
    vec2 dUV = uvAR - diamondCenter;
    float dSize = 0.38;
    float dSDF = diamondSDF(dUV, dSize);
    float diamondFill = smoothstep(0.005, 0.0, dSDF) * 0.018;
    float ringWidth = 0.005;
    float diamondRing = (1.0 - smoothstep(0.0, ringWidth, abs(dSDF))) * 0.055;
    float pulse = sin(u_time * 0.4) * 0.3 + 0.7;
    float diamond = (diamondFill + diamondRing) * pulse;

    float vig = 1.0 - smoothstep(0.3, 1.2, length(uvAR) * 1.4);

    vec3 base = vec3(0.031, 0.031, 0.031);
    float centreGlow = falloff * 0.025;
    base += vec3(centreGlow * 0.7, centreGlow * 0.65, centreGlow * 0.55);
    base += vec3(gridVal * 0.85, gridVal * 0.85, gridVal * 0.80);
    base += depthNoise;
    base += vec3(diamond * 0.9, diamond * 0.9, diamond * 0.85);
    base *= mix(0.6, 1.0, vig);

    gl_FragColor = vec4(clamp(base, 0.0, 1.0), 1.0);
  }
`;

interface HeroCanvasProps {
  reducedMotion?: boolean;
}

export default function HeroCanvas({
  reducedMotion = false,
}: HeroCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5, active: false });
  const activeRef = useRef(true);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: (event.clientX - rect.left) / rect.width,
      y: 1 - (event.clientY - rect.top) / rect.height,
      active: true,
    };
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current.active = false;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const section = canvas.parentElement;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
    let animationFrameId: number | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let intersectionObserver: IntersectionObserver | null = null;
    let gl: WebGLRenderingContext | null = null;
    let program: WebGLProgram | null = null;
    let vertexShader: WebGLShader | null = null;
    let fragmentShader: WebGLShader | null = null;
    let positionBuffer: WebGLBuffer | null = null;

    const cleanup = () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();
      if (section) {
        section.removeEventListener("mousemove", handleMouseMove as EventListener);
        section.removeEventListener("mouseleave", handleMouseLeave);
      }
      if (gl) {
        if (positionBuffer) gl.deleteBuffer(positionBuffer);
        if (vertexShader) gl.deleteShader(vertexShader);
        if (fragmentShader) gl.deleteShader(fragmentShader);
        if (program) gl.deleteProgram(program);
      }
    };

    gl = (canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;

    if (!gl) {
      console.warn("WebGL not supported.");
      return cleanup;
    }

    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;

      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }

      return shader;
    };

    vertexShader = compileShader(gl.VERTEX_SHADER, VERTEX_SHADER);
    fragmentShader = compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vertexShader || !fragmentShader) return cleanup;

    program = gl.createProgram();
    if (!program) return cleanup;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return cleanup;
    }

    gl.useProgram(program);

    positionBuffer = gl.createBuffer();
    if (!positionBuffer) return cleanup;

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, "u_time");
    const uResolution = gl.getUniformLocation(program, "u_resolution");
    const uMouse = gl.getUniformLocation(program, "u_mouse");
    const uMouseActive = gl.getUniformLocation(program, "u_mouse_active");

    const drawFrame = (time: number) => {
      if (!program) return;
      gl.useProgram(program);
      if (uTime) gl.uniform1f(uTime, time);
      if (uResolution) gl.uniform2f(uResolution, canvas.width, canvas.height);
      if (uMouse) gl.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y);
      if (uMouseActive) {
        gl.uniform1f(uMouseActive, mouseRef.current.active ? 1 : 0);
      }
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const resizeCanvas = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const pixelWidth = Math.round(width * pixelRatio);
      const pixelHeight = Math.round(height * pixelRatio);

      if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
        canvas.width = pixelWidth;
        canvas.height = pixelHeight;
        gl.viewport(0, 0, pixelWidth, pixelHeight);
      }

      if (reducedMotion) {
        drawFrame(0);
      }
    };

    resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(canvas);
    resizeCanvas();

    if (reducedMotion) {
      activeRef.current = false;
      mouseRef.current = { x: 0.5, y: 0.5, active: false };
      drawFrame(0);
      return cleanup;
    }

    if (section) {
      section.addEventListener("mousemove", handleMouseMove as EventListener);
      section.addEventListener("mouseleave", handleMouseLeave);
    }

    intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        activeRef.current = entry?.isIntersecting ?? false;
      },
      { threshold: 0 }
    );
    intersectionObserver.observe(canvas);

    const render = (timestamp: number) => {
      animationFrameId = requestAnimationFrame(render);
      if (!activeRef.current) return;
      drawFrame(timestamp * 0.001);
    };

    animationFrameId = requestAnimationFrame(render);
    return cleanup;
  }, [handleMouseLeave, handleMouseMove, reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 z-0 h-full w-full pointer-events-none"
      style={{ display: "block" }}
    />
  );
}
