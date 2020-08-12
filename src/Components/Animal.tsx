import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        margin: '5px',
    },
});

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
    const classes = useStyles();
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
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h4">{animal.name}</Typography>
                <Typography variant="h5">{`${points} Points`}</Typography>
            </CardContent>

            <CardActions>
                <Button color="primary" variant="contained" onClick={onUpVote}>
                    Upvote
                </Button>
                <Button
                    color="secondary"
                    variant="contained"
                    onClick={onDownVote}
                >
                    Downvote
                </Button>
            </CardActions>
        </Card>
    );
};
