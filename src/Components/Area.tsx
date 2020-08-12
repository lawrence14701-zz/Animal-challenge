import React, { useState, useEffect } from 'react';
import { Animal, AnimalDescriptor } from './Animal';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

const useStyles = makeStyles({
    root: {
        padding: '1rem',
        backgroundColor: '#ffe0b2',
        width: 'auto',
    },
    card: {
        margin: '5px',
    },
});

interface AreaProps {
    area: string;
    animals: AnimalDescriptor[];
    increaseContinentPoints: Function;
    decreaseContinentPoints: Function;
    handleVotes: Function;
    handleData: Function;
}

export const Area: React.FC<AreaProps> = ({
    area,
    animals,
    increaseContinentPoints,
    decreaseContinentPoints,
    handleVotes,
    handleData,
}) => {
    const classes = useStyles();
    const [points, setPoints] = useState(0);
    const increaseAreaPoints = () => {
        localStorage.setItem(`${area}`, `${points + 1}`);
        handleData({
            type: 'areas',
            name: `${area}`,
            points: `${points + 1}`,
        });
        setPoints(points + 1);
    };
    const decreaseAreaPoints = () => {
        localStorage.setItem(`${area}`, `${points - 1}`);
        handleData({
            type: 'areas',
            name: `${area}`,
            points: `${points - 1}`,
        });
        setPoints(points - 1);
    };
    useEffect(() => {
        const data = localStorage.getItem(`${area}`);
        setPoints(parseInt(data || '{}') || 0);
    });

    return (
        <div>
            <Card className={classes.card}>
                <Typography
                    className={classes.root}
                    variant="h4"
                >{`${area} (${points})`}</Typography>
            </Card>
            {animals.map(animal => (
                <Animal
                    key={animal.name}
                    animal={animal}
                    increaseAreaPoints={increaseAreaPoints}
                    decreaseAreaPoints={decreaseAreaPoints}
                    increaseContinentPoints={increaseContinentPoints}
                    decreaseContinentPoints={decreaseContinentPoints}
                    handleVotes={handleVotes}
                    handleData={handleData}
                />
            ))}
        </div>
    );
};
