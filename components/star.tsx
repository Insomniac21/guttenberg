import { useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { AiOutlineStar } from 'react-icons/ai';


export default function Star({ isSelected, onClick }){
    const [ isFilled, setIsFilled ] = useState(isSelected);

    const handleStarClick = () => {
        setIsFilled(!isFilled);
        onClick();
    };

    const renderStar = () => {
        if (isFilled) {
            return <AiFillStar size={50} onClick={handleStarClick} />;
        } else {
            return <AiOutlineStar size={50} onClick={handleStarClick} />;
        }
    };

    return renderStar();
}