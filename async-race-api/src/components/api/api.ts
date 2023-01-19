import { carBrands, carColors } from '../data/data';
import { ICar, IState } from '../global-components/interfaces';
import { renderCar, renderRaceBlock } from '../main-page/main-page';

const base = 'http://127.0.0.1:3000';
const garage = `${base}/garage`;
const engine = `${base}/engine`;

window.addEventListener('load', async () => await fillGarage());

export const state: IState = {
    cars: [],
};

export async function getCars() {
    return await fetch(`${garage}`)
        .then((res) => res.json())
        .then((car) => (state.cars = state.cars.concat(car)));
}

export const fillGarage = async () => {
    await getCars();
    // console.log('state', state);
    console.log('state.garage', state.cars);
    const raceBlock = document.querySelector('.race-block') as HTMLDivElement;
    state.cars.forEach((item) => raceBlock.append(renderCar(item.name, item.color, item.id)));

    const carsAmount = document.querySelector('.cars-amount') as HTMLInputElement;
    carsAmount.value = `${state.cars.length}`;
};

export const startDrive = async (id: string) => {
    // await startEngine(id);
    await animateCar(id);
};

export const startEngine = async (id: string) => {
    return await fetch(`${engine}?id=${id}&status=started`, {
        method: 'PATCH',
    }).then((res) => res.json());
};

export const animateCar = async (id: string) => {
    const driveData = await startEngine(id);

    const car = document.querySelector(`#car-${id}`) as HTMLSpanElement;
    const findDistance = car.parentElement as HTMLDivElement;
    const distance: number = findDistance.offsetWidth;
    // console.log(distance);
    const time = distance / driveData.velocity;
    // console.log(time);

    car.animate([{ transform: 'translate(0px)' }, { transform: `translate(${distance + car.offsetWidth}px)` }], {
        duration: time * 1000,
        fill: 'forwards',
    });
};
