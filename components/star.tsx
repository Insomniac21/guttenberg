import { useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { AiOutlineStar } from 'react-icons/ai';
import { Button } from '@nextui-org/react';


export default function Star({ isSelected, onClick }){
    const [ isFilled, setIsFilled ] = useState(isSelected);

    const handleStarClick = () => {
        setIsFilled(!isFilled);
        onClick();
    };

    const renderStar = () => {
        if (isFilled) {
            return <Button light><AiFillStar size={50} onClick={handleStarClick} /></Button>;
        } else {
            return <Button light><AiOutlineStar size={50} onClick={handleStarClick} /></Button>;
        }
    };

    return renderStar();
}