import React, { useEffect, useRef, useState } from "react";
import "./typing.css";


const AllSentences = [
  "A well-structured morning routine can set the tone for the entire day. Many successful individuals swear by their morning rituals, emphasizing how these habits contribute to their productivity and overall well-being. Whether it's starting the day with a brisk walk, a mindfulness practice, or simply enjoying a cup of coffee in silence, the first hours of the morning are crucial.Establishing a consistent routine helps in reducing decision fatigue. By automating the early part of the day, you save mental energy for more important tasks. A good morning routine can also improve mental clarity, enhance focus, and boost mood, setting a positive momentum that can carry through the day.Everyone’s ideal morning routine may differ, but the key is to find what works best for you. Experiment with different activities, and once you find the right combination, stick to it. Over time, these small habits can lead to significant improvements in your productivity and overall quality of life.",
  "In 2023, small businesses in the U.S. saw an average revenue increase of 15.7%, up from 12.3% in 2022. For businesses earning $500,000 annually, this translates to an additional $78,500.00. Interestingly, 45% of small businesses reported a revenue boost due to online sales, contributing $150,000 to $200,000 in additional earnings.The average cost of goods sold (COGS) for these businesses was around 30% of revenue. If a business generates $600,000 in sales, COGS would be approximately $180,000. After subtracting COGS, operational expenses (e.g., rent, salaries) often account for another 40% to 50% ($240,000-$300,000). This leaves a net profit margin of 20% to 25%—roughly $120,000 to $150,000.Capital investments also play a role in growth. Many businesses allocate 10%-15% of profits ($12,000-$22,500) to upgrading equipment or technology. For example, purchasing new software at $2,499.99 or a marketing campaign costing $5,000 can significantly impact overall growth.",
  "10%, 20%, & 30% - the annual growth rates. $5,000, $10,000, $15,000 - total investments. 2021, 2022, 2023 - key years in review. $1.99, $2.99, $3.99 - cost per unit.50% x 3 = 150%. 24/7 = 168 hours/week. @$100/day x 30 days = $3,000/month. (12*8)+5 = 101 total products sold. -10°C, -20°C, -30°C - temperature range.1234-5678-9101-1121, credit card numbers. +44 123 456 7890, (555) 123-4567 - phone numbers. #1, #2, #3 - top rankings. 90%, 85%, 80% - success rates. $100.50, $200.75, $300.95 - subtotal values.",
  "$10,000.50, $15,250.75—account balances. 08/24, 09/25, 10/26—expiration dates. 10%, 15%, 20%—interest rates.7:00 AM, 12:00 PM, 5:30 PM—meeting times. +10°C, -5°C, 22°C—temperature settings. 192.168.0.1, 255.255.255.0—IP addresses. 1010, 1101, 1110—binary codes. (123)-456-7890, (098)-765-4321—phone numbers.5+5=10, 10-3=7, 9x2=18, 24/6=4—simple math. $1.99, $2.49, $3.99—price tags. 50%, 75%, 100%—discount rates. 10^2=100, √144=12, 3.14*pi—math constants. #hashtag1, @username, &keyword—social tags."
];

export function Typing() {
  const maxTime = 10;
  const [currentObject, setCurrentObject] = useState(0);
  const [timeleft, setTimeleft] = useState(maxTime);
  const [typingMode, setTypingMode] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [mistake, setMistake] = useState(0);
  const [WPM, setWPM] = useState(0);
  const inputRef = useRef(null);
  const charRef = useRef([]);
  const [wrongCorrect,setWrongCorrect]=useState([])
  const [restartTryAgain,setRestartTryAgain]=useState("")
  const [toggleRestart,setToggleRestart]=useState(false)
  const [allowNext,setAllowNext]=useState(false)

  const HandleTryAgain = () => {
    setTypingMode(false)
    setTimeleft(maxTime)
    setCharIndex(0)
    setMistake(0)
    setWPM(0)
    setWrongCorrect(Array(charRef.current.length).fill(""))
    inputRef.current.focus()
    setToggleRestart(false)
    setAllowNext(false)
  };

  const handleNextClick = () => {
    setCurrentObject((prev) => prev + 1);
    if (currentObject === AllSentences.length - 1) {
      setCurrentObject(0);
      window.alert("You have completed our challenges.Please start again");
    }
    setTypingMode(false)
    setTimeleft(maxTime)
    setCharIndex(0)
    setMistake(0)
    setWPM(0)
    setWrongCorrect(Array(charRef.current.length).fill(""))
    inputRef.current.focus()
    setToggleRestart(false)
    setAllowNext(false)
  };

  const HandleDisabledBtn=()=>{
    window.alert("Please finish this level to continue")
  }

  const HandleChangeOfInput = (e) => {
    const characters=charRef.current;
    let currentChar=charRef.current[charIndex]
    let typedChar=e.target.value.slice(-1);

    if(charIndex< characters.length-1 && timeleft>0){
        if(!typingMode){
            setTypingMode(true)
            setToggleRestart(true)
            setRestartTryAgain("Restart")
        }
        if(typedChar===currentChar.textContent){
            setCharIndex(prev=>prev+1)
            wrongCorrect[charIndex]="correct";
        }else{
            setCharIndex(prev=>prev+1)
            setMistake(prev=>prev+1)
            wrongCorrect[charIndex]="incorrect";
        }
        if(charIndex===characters.length-1){
            setTypingMode(false)
        }
    }else{
        setTypingMode(false)
        setRestartTryAgain("Try Again")
        setAllowNext(true)
    }

  };

  useEffect(() => {
    inputRef.current.focus();
    setWrongCorrect(Array(charRef.current.length).fill(""))
  }, []);

  useEffect(()=>{
    let interval;
    if(typingMode && timeleft>0){
        interval=setInterval(() => {
            setTimeleft(prev=>prev-1)
            let correctChar=charIndex-mistake
            let totalTime=maxTime-timeleft



            let wordPerMinute=Math.round((correctChar/5/totalTime)*60)
            let wpm=wordPerMinute<0 || !wordPerMinute || wordPerMinute===Infinity ?0:wordPerMinute;
            setWPM(wpm)
        }, 1000);
    }

    else if(timeleft===0){
        setTypingMode(false)
        setRestartTryAgain("Try Again")
        setAllowNext(true)
    }

    return()=>{
        clearInterval(interval)
    }
  },[typingMode,timeleft])



  return (
    <section className="TypingMainSec">
      <div className="TypingMainDiv">
        <div className="TypeAreaDiv">
          <input
            type="text"
            className="InputTyping"
            ref={inputRef}
            onChange={HandleChangeOfInput}
          />
          {AllSentences[currentObject].split("").map((each, index) => (
            <span className={`${index === charIndex ? "active" : ""} ${wrongCorrect[index]==="correct"?"correct": wrongCorrect[index]==="incorrect"?"incorrect":""}`} key={index} ref={(e)=>charRef.current[index] =e}>
              {each}
            </span>
          ))}
        </div>
        <hr id="TypingMainLine" />
        <div className="FeedbackMainDiv">
            <div className="FeedbackWording">
          <p>Time Left:<strong>{timeleft}</strong></p>
          <p>Mistake: <strong>{mistake}</strong></p>
          <p>WPM: <strong>{WPM}</strong></p>
          </div>
          <div className="FeedBackButtons">
          {toggleRestart?
          <button onClick={HandleTryAgain} id="TryAgainBth">
            {restartTryAgain}
          </button>:
          null}
          <button onClick={allowNext ? handleNextClick: HandleDisabledBtn} id="NextBth">
            Next →
          </button>
          </div>
        </div>
      </div>
    </section>
  );
}
