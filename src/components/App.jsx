import { useState, useEffect } from 'react';
import './App.css';
import Description from './Description/Description';
import Options from './Options/Options';
import Feedback from './Feedback/Feedback';

export default function App() {
  const [clicks, setClicks] = useState(() => {
    const savedClicks = localStorage.getItem('click');
    if (savedClicks) {
      return JSON.parse(savedClicks);
    };
    return {
      good: 0,
      neutral: 0,
      bad: 0,
    };
  })

  useEffect(() => {
    localStorage.setItem('click', JSON.stringify(clicks));
  }, [clicks]);

  const handleClick = (key) => {
    setClicks({
      ...clicks,
      [key]: clicks[key] + 1,
    });
  };
    
  const resetClick = () => {
    setClicks({
      good: 0,
      neutral: 0,
      bad: 0,
    })
  };

  const totalClicks = clicks.good + clicks.neutral + clicks.bad;

  const persentOfPositive = Math.round(((totalClicks - clicks.bad) / totalClicks) * 100);
  
  return (
    <>
      <Description />
      <Options handleClick={handleClick} totalClicks={totalClicks} resetClick={resetClick}/>
      <Feedback clicks={clicks} totalClicks={totalClicks} persentOfPositive={persentOfPositive} />
    </>
  );
}