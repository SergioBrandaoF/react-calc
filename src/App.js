import './App.css';
import Button from './components/Button'
import Input from './components/Input'
import { useState, useEffect } from 'react';
import * as math from 'mathjs';

function App() {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');

  const addToText = (val) => {
    if (result !== '') {
      setText(val);
      setResult('');
    } else {
      setText((text) => text + val);
    }
  }

  const calculateResult = () => {
    try {
      const input = text.replace(/\s/g, '');
      setResult(math.evaluate(input))
    } catch (error) {
      setResult('Error');
    }
  }

  const resetInput = () => {
    setText('');
    setResult('');
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key;
      if (!isNaN(key) || ['+', '-', '*', '/', '.', 'Enter', 'Backspace'].includes(key)) {
        event.preventDefault();
        if (key == 'Enter') {
          calculateResult();
        } else if (key === 'Backspace') {
          setText((text) => text.slice(0, -1));
        } else {
          addToText(key);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [text, result]);

  const buttonColor = "f2a33c";

  return (
    <div className="App">
      <div className='calc-wrapper'>
        <Input text={text} result={result} />
        <div className='row'>
          <Button symbol="1" handleClick={addToText} />
          <Button symbol="2" handleClick={addToText} />
          <Button symbol="3" handleClick={addToText} />
          <Button symbol="/" color={buttonColor}
          handleClick={addToText} />
        </div>
        <div className='row'>
          <Button symbol="4" handleClick={addToText} />
          <Button symbol="5" handleClick={addToText} />
          <Button symbol="6" handleClick={addToText} />
          <Button symbol="*" color={buttonColor}
          handleClick={addToText} />
        </div>
        <div className='row'>
          <Button symbol="7" handleClick={addToText} />
          <Button symbol="8" handleClick={addToText} />
          <Button symbol="9" handleClick={addToText} />
          <Button symbol="+" color={buttonColor}
          handleClick={addToText} />
        </div>
        <div className='row'>
          <Button symbol="0" handleClick={addToText} />
          <Button symbol="." handleClick={addToText} />
          <Button symbol="=" handleClick={calculateResult}/>
          <Button symbol="-" color={buttonColor}
          handleClick={addToText} />
        </div>
        <Button symbol="Clear" color={buttonColor}
        handleClick={resetInput}/>
      </div>
    </div>
  );
}

export default App;
