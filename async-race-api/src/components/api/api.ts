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

export const startDrive = async (e: Event, id: string) => {
    console.log(e.target);
    const btnA = e.target as HTMLButtonElement;
    const btnB = document.querySelector(`#b${id}`) as HTMLButtonElement;
    let params;
    let animation: Animation;

    if (btnA && btnA.className === 'btn-a') {
        params = await requestEngineParams(id, 'started');
        animation = await animateCar(id, params.velocity);
        await requestToDrive(id);
        animation.play();

        btnB.addEventListener('click', () => {
            animation.cancel();
        });
    }
};

export const requestEngineParams = async (id: string, status: string) => {
    return await fetch(`${engine}?id=${id}&status=${status}`, {
        method: 'PATCH',
    }).then((res) => res.json());
};

export const requestToDrive = async (id: string) => {
    return await fetch(`${engine}?id=${id}&status=drive`, {
        method: 'PATCH',
    }).then((res) => res.json());
};

export const animateCar = async (id: string, velocity: number) => {
    const car = document.querySelector(`#car-${id}`) as HTMLSpanElement;
    const parentEl = car.parentElement as HTMLDivElement;
    const pathWidth: number = parentEl.offsetWidth;
    // console.log(distance);
    const time = pathWidth / velocity;
    // console.log(time);

    const carKeyframes = new KeyframeEffect(
        car,
        [{ transform: 'translateY(0%)' }, { transform: `translate(${pathWidth + car.offsetWidth}px)` }],
        { duration: time * 1000, fill: 'forwards' }
    );
    const carAnimation = new Animation(carKeyframes, document.timeline);
    return carAnimation;
};
