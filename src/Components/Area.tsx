import React, { useState, useEffect } from 'react';
import { Animal, AnimalDescriptor } from './Animal';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        ...theme.typography.button,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(1),
    },
}));

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
            <Typography
                className={classes.root}
                variant="h2"
            >{`${area} (${points})`}</Typography>
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
