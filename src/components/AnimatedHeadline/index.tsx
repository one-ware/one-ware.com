import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import './styles.moduleAni.css';

const animationDelay = 2500;
const barAnimationDelay = 3800;
const barWaiting = barAnimationDelay - 3000;
const lettersDelay = 50;
const typeLettersDelay = 150;
const selectionDuration = 500;
const typeAnimationDelay = selectionDuration + 800;
const revealDuration = 600;
const revealAnimationDelay = 1500;

interface WordProps {
  text: string;
  isVisible: boolean;
  effect: 'type' | 'letters' | 'clip' | 'loading-bar';
}

const Word: React.FC<WordProps> = ({ text, isVisible, effect }) => {
  const letters = text.split('');

  return (
    <b className={classNames({ 'is-visible': isVisible, 'is-hidden': !isVisible })}>
      {letters.map((char, idx) => (
        <i key={idx} className={isVisible ? 'in' : ''}>{char}</i>
      ))}
    </b>
  );
};

interface AnimatedHeadlineProps {
  words: string[];
  effect: 'type' | 'letters' | 'clip' | 'loading-bar';
}

const AnimatedHeadline: React.FC<AnimatedHeadlineProps> = ({ words, effect }) => {
  const [visibleIndex, setVisibleIndex] = useState(0);
  const wordWrapperRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const nextIndex = (visibleIndex + 1) % words.length;

    const hideAndShow = () => {
      setVisibleIndex(nextIndex);
    };

    if (effect === 'loading-bar') {
      timeout = setTimeout(hideAndShow, barAnimationDelay);
    } else if (effect === 'clip') {
      if (wordWrapperRef.current) {
        wordWrapperRef.current.style.width = '2px';
        setTimeout(() => {
          if (wordWrapperRef.current) {
            wordWrapperRef.current.style.width = `${words[visibleIndex].length + 10}px`;
          }
          hideAndShow();
        }, revealDuration);
      }
    } else {
      timeout = setTimeout(hideAndShow, animationDelay);
    }

    return () => clearTimeout(timeout);
  }, [visibleIndex, words, effect]);

  return (
    <h1 className={classNames('cd-headline', effect)}>
      <span className="cd-words-wrapper" ref={wordWrapperRef}>
        {words.map((word, idx) => (
          <Word key={idx} text={word} isVisible={idx === visibleIndex} effect={effect} />
        ))}
      </span>
    </h1>
  );
};

export default AnimatedHeadline;
