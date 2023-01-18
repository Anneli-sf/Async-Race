import { carBrands, carColors } from '../data/data';
import { ICar } from '../global-components/interfaces';
import { renderCar, renderRaceBlock } from '../main-page/main-page';

const base = 'http://127.0.0.1:3000';
const garage = `${base}/garage`;

// const raceBlock = document.querySelector('.race-block') as HTMLDivElement;

export const state = {
    cars: [] as ICar[],
};

// const raceBlock = document.querySelector('.race-block');

export async function getCars() {
    return await fetch(`${garage}`)
        .then((res) => res.json())
        .then((car) => (state.cars = state.cars.concat(car)));
}

export const fillGarage = async () => {
    await getCars();
    console.log('state', state);
    console.log('state.garage', state.cars);
    const raceBlock = document.querySelector('.race-block') as HTMLDivElement;
    state.cars.forEach((item) => raceBlock.append(renderCar(item.name, item.color)));
};

window.addEventListener('load', async () => await fillGarage());
// // fillGarage();
// const raceBlock = createElement('div', 'race-block') as HTMLDivElement;
// renderCar
