import { useEffect, useRef } from "react";

type CounterValueProps = {
  initialValue: number; 
  duration?: number;  
};

const CounterValue: React.FC<CounterValueProps> = ({ initialValue, duration = 4500 }) => {
  const counterRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const counterElement = counterRef.current;
    if (!counterElement) return;

    const targetValue = initialValue;
    const startTime = performance.now();

    const animateCounter = (timestamp: number) => {
      const progress = timestamp - startTime;
      const value = Math.min(
        Math.ceil((progress / duration) * targetValue),
        targetValue
      );

      counterElement.textContent = value.toString();

      if (progress < duration) {
        requestAnimationFrame(animateCounter);
      } else {
        counterElement.textContent = targetValue.toString(); // ensure final value
      }
    };

    requestAnimationFrame(animateCounter);
  }, [initialValue, duration]);

  return (
    <span
      ref={counterRef}
      className="counter-value text-4xl font-bold text-zinc-800"
    >
      0
    </span>
  );
};

export default CounterValue;
