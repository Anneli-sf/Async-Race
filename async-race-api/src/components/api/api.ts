import { carBrands, carColors } from '../data/data';
import { renderCar, renderRaceBlock } from '../main-page/main-page';

const base = 'http://127.0.0.1:3000';
const garage = `${base}/garage`;

const raceBlock = document.querySelector('.race-block') as HTMLDivElement;

export const state = {
    garage: [],
};

// const raceBlock = document.querySelector('.race-block');

export function getCar(id: number) {
    return fetch(`${garage}/${id}`)
        .then((res) => res.json())
        .then((car) => (state.garage = state.garage.concat(car)));
}
// console.log(getCar('3'));

export const fillGarage = () => {
    if (state.garage.length === 0) {
        const i = 0;
        while (i < 4) {
            getCar(i);
        }
    }
    state.garage.forEach((item) => 
    // raceBlock.append(renderCar(item.name, item.color))
    console.log(item)
    );

    console.log(state);
};

// // fillGarage();
// const raceBlock = createElement('div', 'race-block') as HTMLDivElement;
// renderCar
