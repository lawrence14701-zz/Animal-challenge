import React, { useState, useEffect } from 'react';
import { Area } from './Area';
import { AnimalDescriptor } from './Animal';

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
        <div style={{ marginLeft: '3rem' }}>
            <h1>{`${continent} (${points})`}</h1>
            {Object.entries(areas).map(([area, animals]) => (
                <Area
                    key={area}
                    area={area}
                    animals={animals}
                    increaseContinentPoints={increaseContinentPoints}
                    decreaseContinentPoints={decreaseContinentPoints}
                    handleVotes={handleVotes}
                    continent={continent}
                    handleData={handleData}
                />
            ))}
        </div>
    );
};
