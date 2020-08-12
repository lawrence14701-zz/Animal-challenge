import React, { useState, useEffect } from 'react';
import { Area } from './Area';
import { AnimalDescriptor } from './Animal';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
    root: {
        width: 'auto',
    },
});

interface ContinentProps {
    continent: string;
    areas: { [key: string]: AnimalDescriptor[] };
    handleVotes: Function;
    handleData: Function;
}

export const Continent: React.FC<ContinentProps> = ({
    continent,
    areas,
    handleVotes,
    handleData,
}) => {
    const classes = useStyles();
    const [points, setPoints] = useState(0);
    const increaseContinentPoints = () => {
        localStorage.setItem(`${continent}`, `${points + 1}`);
        handleData({
            type: 'continents',
            name: `${continent}`,
            points: `${points + 1}`,
        });
        setPoints(points + 1);
    };
    const decreaseContinentPoints = () => {
        localStorage.setItem(`${continent}`, `${points - 1}`);
        handleData({
            type: 'continents',
            name: `${continent}`,
            points: `${points - 1}`,
        });
        setPoints(points - 1);
    };
    useEffect(() => {
        const data = localStorage.getItem(`${continent}`);
        setPoints(parseInt(data || '{}') || 0);
    });

    return (
        <Accordion className={classes.root}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography variant="h4">{`${continent} (${points})`}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Grid container direction="column">
                    {Object.entries(areas).map(([area, animals]) => (
                        <Grid item>
                            <Area
                                key={area}
                                area={area}
                                animals={animals}
                                increaseContinentPoints={
                                    increaseContinentPoints
                                }
                                decreaseContinentPoints={
                                    decreaseContinentPoints
                                }
                                handleVotes={handleVotes}
                                handleData={handleData}
                            />
                        </Grid>
                    ))}
                </Grid>
            </AccordionDetails>
        </Accordion>
    );
};
