import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import animalData from './animals.json';
import { Continent } from '../.';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import PetsTwoToneIcon from '@material-ui/icons/PetsTwoTone';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        padding: '30px',
    },
    button: {
        marginRight: '10px',
    },
    icon: {
        minWidth: 275,
        minHeight: 275,
        marginLeft: '4rem',
    },
});

const App = () => {
    const classes = useStyles();

    const [votes, setVotes] = React.useState(0);
    const [myData, setData] = React.useState({
        continents: [],
        areas: [],
        animals: [],
    });
    const [favouriteContinent, setfavouriteContinent] = React.useState('');
    const [favouriteArea, setfavouriteArea] = React.useState('');
    const [favouriteAnimals, setfavouriteAnimals] = React.useState('');

    React.useEffect(() => {
        const data = JSON.parse(localStorage.getItem('data') || '{}');
        if (Object.keys(data).length === 0) {
            setData({ continents: [], areas: [], animals: [] });
        } else {
            setData(data);
        }
        const favContinent = localStorage.getItem('favContinent') || '';
        setfavouriteContinent(favContinent);

        const favAnimal = localStorage.getItem('favAnimal') || '';
        setfavouriteAnimals(favAnimal);

        const favArea = localStorage.getItem('favArea') || '';
        setfavouriteArea(favArea);

        setVotes(parseInt(localStorage.getItem('votes') || '{}') || 0);
    }, []);

    const handleVotes = () => {
        localStorage.setItem('votes', `${votes + 1}`);
        setVotes(votes + 1);
    };

    const handleData = obj => {
        console.log(myData);
        if (myData[obj.type].find(ele => ele.name === obj.name)) {
            myData[obj.type].find(ele => ele.name === obj.name).points =
                obj.points;
        } else {
            myData[obj.type].push(obj);
        }
        setData(myData);
        let max = 0;
        let favAnimal;
        let favContinent;
        let favArea;
        localStorage.setItem('data', JSON.stringify(myData));
        console.log(myData);
        myData.continents.forEach((continent: any) => {
            if (parseInt(continent.points) > max) {
                max = continent.points;
                favContinent = continent.name;
            }
        });
        setfavouriteContinent(favContinent);
        max = 0;
        localStorage.setItem('favContinent', favContinent);
        myData.areas.forEach((area: any) => {
            if (area.points > max) {
                max = area.points;
                favArea = area.name;
            }
        });
        setfavouriteArea(favArea);
        localStorage.setItem('favArea', favArea);
        max = 0;
        myData.animals.forEach((animal: any) => {
            console.log(max);
            if (animal.points > max) {
                max = animal.points;
                favAnimal = animal.name;
            }
        });
        setfavouriteAnimals(favAnimal);
        localStorage.setItem('favAnimal', favAnimal);
        max = 0;
    };

    const onDownload = () => {
        alert('downloaded data');
        const newAnimalData = animalData;
        function findByKey(continent, key) {
            const arr = newAnimalData[continent].air.concat(
                newAnimalData[continent].land
            );
            const animal = arr.find(ele => ele.name === key);
            if (typeof animal !== 'undefined') {
                animal[key] = localStorage.getItem(key);
            }
        }
        Object.keys(localStorage).forEach(key => {
            Object.keys(newAnimalData).forEach(continent => {
                findByKey(continent, key);
            });
        });
        const str = JSON.stringify(newAnimalData);
        const data = str;
        const blob = new Blob([data], {
            type: 'application/octet-stream',
        });
        var url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', newAnimalData);
        document.body.appendChild(link);
        link.click();
    };

    const onReset = () => {
        alert('Data has been reset');
        localStorage.clear();
        window.location.reload();
    };

    return (
        <Container>
            <div className={classes.root}>
                <div style={{ marginLeft: 'auto' }}>
                    {Object.entries(animalData).map(([continent, areas]) => (
                        <div>
                            <Continent
                                key={continent}
                                continent={continent}
                                areas={areas}
                                handleVotes={handleVotes}
                                handleData={handleData}
                            />
                        </div>
                    ))}
                </div>
                <div style={{ marginLeft: 'auto' }}>
                    <Grid container direction="row" alignItems="center">
                        <Grid item>
                            <Card className={classes.root}>
                                <CardContent>
                                    <Typography variant="h3">
                                        Total Votes: {votes}
                                    </Typography>
                                    <Typography variant="h3">
                                        Favourite Continent(s):{' '}
                                        {favouriteContinent}
                                    </Typography>
                                    <Typography variant="h3">
                                        Favourite Area(s) {favouriteArea}
                                    </Typography>
                                    <Typography variant="h3">
                                        Favourite Animal(s): {favouriteAnimals}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        className={classes.button}
                                        variant="contained"
                                        color="primary"
                                        onClick={onDownload}
                                    >
                                        Download Statistics
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={onReset}
                                    >
                                        Reset Statistics
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item className={classes.icon}>
                            <PetsTwoToneIcon className={classes.icon} />
                        </Grid>
                    </Grid>
                </div>
            </div>
        </Container>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
