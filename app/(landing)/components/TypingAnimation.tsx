import { useEffect, useState } from 'react';
interface TypingAnimationProps {
  text: string;
  speed?: number;
  delay?: number;
}

export const TypingAnimation : React.FC<TypingAnimationProps> = ({
  text,
  speed = 100,
  delay = 0,
}) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let currentIndex = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    const startTyping = () => {
      const type = () => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
          timeoutId = setTimeout(type, speed);
        }
      };
      timeoutId = setTimeout(type, delay);
    };

    startTyping();

    return () => clearTimeout(timeoutId);
  }, [text, speed, delay]);

  return (
    <span>
      {displayedText}
      {displayedText.length < text.length && <span className="animate-pulse">|</span>}
    </span>
  );
};

// Example usage with your lines
