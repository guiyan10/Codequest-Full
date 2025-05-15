
import React, { useEffect, useState, useRef } from 'react';

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ 
  value, 
  duration = 1000, 
  className = '', 
  prefix = '', 
  suffix = '' 
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const startTime = useRef<number | null>(null);
  const frameId = useRef<number | null>(null);
  const isMounted = useRef(true);

  useEffect(() => {
    // Animation has already completed or component unmounted
    if (displayValue === value || !isMounted.current) {
      return;
    }

    // Reset animation if value changes
    if (frameId.current) {
      cancelAnimationFrame(frameId.current);
    }

    startTime.current = null;
    
    const animateValue = (timestamp: number) => {
      if (!startTime.current) {
        startTime.current = timestamp;
      }

      const runtime = timestamp - startTime.current;
      const progress = Math.min(runtime / duration, 1);
      
      // Calculate the current value based on progress
      const currentValue = Math.floor(progress * value);
      
      setDisplayValue(currentValue);
      
      if (runtime < duration) {
        frameId.current = requestAnimationFrame(animateValue);
      } else {
        setDisplayValue(value); // Ensure we end on the exact value
      }
    };

    frameId.current = requestAnimationFrame(animateValue);

    return () => {
      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
      }
      isMounted.current = false;
    };
  }, [value, duration, displayValue]);

  return (
    <span className={className}>
      {prefix}{displayValue.toLocaleString()}{suffix}
    </span>
  );
};

export default AnimatedNumber;
