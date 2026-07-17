import React, { useState, useEffect } from 'react';

interface TypingTextProps {
  text: string;
  speed?: number;
  className?: string;
}

export default function TypingText({ text, speed = 45, className = "" }: TypingTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    setDisplayedText("");
    setIsDone(false);
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.slice(0, i + 1));
        i++;
      } else {
        setIsDone(true);
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <span className={className}>
      {displayedText}
      <span 
        className={`inline-block w-[3px] h-[0.85em] bg-accent ml-1 align-middle ${isDone ? 'animate-pulse' : ''}`}
        style={{ verticalAlign: 'text-bottom' }}
      />
    </span>
  );
}
