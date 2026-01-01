import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const updateMouse = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    window.addEventListener('mousemove', updateMouse);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', updateMouse);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        border: '2px solid var(--color-primary)',
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'difference',
      }}
      animate={{
        x: position.x - 16,
        y: position.y - 16,
        scale: clicked ? 0.8 : 1,
      }}
      transition={{ type: 'spring', stiffness: 500, damping: 28 }}
    />
  );
};

export default CustomCursor;