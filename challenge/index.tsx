import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import animalData from './animals.json';
import { Continent } from '../.';

const App = () => {
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
    }, []);

    const handleVotes = () => {
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
        myData.continents.forEach((continent: any) => {
            if (continent.points > max) {
                max = continent.points;
                favContinent = continent.name;
            }
        });
        max = 0;
        setfavouriteContinent(favContinent);
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
        <div>
            <div style={{ display: 'flex' }}>
                {Object.entries(animalData).map(([continent, areas]) => (
                    <Continent
                        key={continent}
                        continent={continent}
                        areas={areas}
                        handleVotes={handleVotes}
                        handleData={handleData}
                    />
                ))}
            </div>
            <hr />
            <div style={{ marginLeft: '3rem' }}>
                <h2>Total Votes: {votes}</h2>
                <h2>Favourite Continent(s): {favouriteContinent}</h2>
                <h2>Favourite Area(s) {favouriteArea}</h2>
                <h2>Favourite Animal(s): {favouriteAnimals}</h2>
                <button onClick={onDownload}>Download Statistics</button>
                <button onClick={onReset}>Reset Statistics</button>
            </div>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
