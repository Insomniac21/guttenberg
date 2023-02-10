import { useState } from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { AiFillStar } from 'react-icons/ai';
import { AiOutlineStar } from 'react-icons/ai';
import { Button } from '@nextui-org/react';


type Props = {
    isSelected: boolean;
    onClick: () => void;
}

export default function Star({ isSelected, onClick } : Props){
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