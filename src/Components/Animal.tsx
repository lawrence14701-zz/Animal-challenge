import React, { useState, useEffect } from 'react';

export interface AnimalDescriptor {
    name: string;
    points: number;
}

interface AnimalProps {
    animal: AnimalDescriptor;
    increaseAreaPoints: Function;
    decreaseAreaPoints: Function;
    increaseContinentPoints: Function;
    decreaseContinentPoints: Function;
    handleVotes: Function;
    handleData: Function;
}

export const Animal: React.FC<AnimalProps> = ({
    animal,
    increaseAreaPoints,
    decreaseAreaPoints,
    increaseContinentPoints,
    decreaseContinentPoints,
    handleVotes,
    handleData,
}) => {
    const [points, setPoints] = useState(animal.points);
    const onUpVote = () => {
        localStorage.setItem(`${animal.name}`, `${points + 1}`);
        handleData({
            type: 'animals',
            name: `${animal.name}`,
            points: `${points + 1}`,
        });
        setPoints(points + 1);
        increaseAreaPoints();
        increaseContinentPoints();
        handleVotes();
    };
    const onDownVote = () => {
        localStorage.setItem(`${animal.name}`, `${points - 1}`);
        handleData({
            type: 'animals',
            name: `${animal.name}`,
            points: `${points - 1}`,
        });
        setPoints(points - 1);
        decreaseAreaPoints();
        decreaseContinentPoints();
        handleVotes();
    };
    useEffect(() => {
        const data = localStorage.getItem(`${animal.name}`);
        setPoints(parseInt(data || '{}') || 0);
    });
    return (
        <div>
            <h4>{animal.name}</h4>
            <button onClick={onUpVote}>Upvote</button>
            <button onClick={onDownVote}>Downvote</button>
            <h4>{`${points} Points`}</h4>
            <hr />
        </div>
    );
};
