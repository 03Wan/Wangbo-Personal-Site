"use client";

import { useCallback, useEffect, useState } from "react";

const storageKey = "introPlayed";
const particles = [[11,22,1],[24,67,2],[39,18,1],[61,73,2],[78,29,1],[90,57,2],[16,48,1],[73,88,1]] as const;

export function EntryExperience() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setReducedMotion(reduced);
      try { setIsOpen(window.sessionStorage.getItem(storageKey) !== "true"); } catch { setIsOpen(true); }
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    document.documentElement.classList.add("intro-active");
    return () => document.documentElement.classList.remove("intro-active");
  }, [isOpen]);

  const finish = useCallback((fast = false) => {
    if (isExiting) return;
    setIsExiting(true);
    try { window.sessionStorage.setItem(storageKey, "true"); } catch { /* Private mode can block storage. */ }
    window.setTimeout(() => {
      document.documentElement.classList.add("intro-arrived");
      setIsOpen(false);
    }, reducedMotion || fast ? 360 : 1050);
  }, [isExiting, reducedMotion]);

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (reducedMotion || event.pointerType === "touch") return;
    const x = (event.clientX / window.innerWidth - .5) * 2;
    const y = (event.clientY / window.innerHeight - .5) * 2;
    event.currentTarget.style.setProperty("--intro-glow-x", `${x * 5}px`);
    event.currentTarget.style.setProperty("--intro-glow-y", `${y * 4}px`);
  };

  if (!isOpen) return null;

  return <section className={`site-intro ${isExiting ? "is-exiting" : ""} ${reducedMotion ? "reduced-motion" : ""}`} onPointerMove={handlePointerMove} role="dialog" aria-modal="true" aria-label="BoVerse 网站入口">
    <div className="site-intro-particles" aria-hidden="true">{particles.map(([left, top, size], index) => <i key={index} style={{ left: `${left}%`, top: `${top}%`, width: size, height: size }} />)}</div>
    <button className="site-intro-skip" type="button" onClick={() => finish(true)}>SKIP</button>
    <div className="site-intro-content"><p className="site-intro-welcome">WELCOME TO BOVERSE</p><div className="site-intro-mark" aria-hidden="true"><span>W</span><span>B</span></div><p className="site-intro-name">WANG BO</p><p className="site-intro-tagline">Explore my universe.</p><button className="site-intro-enter" type="button" onClick={() => finish()}><span className="site-intro-orbit" aria-hidden="true"><i /></span><span className="site-intro-enter-label">ENTER <b aria-hidden="true">→</b></span></button></div>
  </section>;
}
