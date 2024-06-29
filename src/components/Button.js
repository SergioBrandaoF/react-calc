import React from "react";
import './Button.css';

function Button({ symbol, color, handleClick }) {
    return (
        <div 
        onClick={() => handleClick(symbol)}
        className="button-wrapper"
        style={{backgroundColor: color ? `#${color}` : '#5a5a5a' }}>{symbol}</div>
    )
}

export default Button;