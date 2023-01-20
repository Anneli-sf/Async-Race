import { carBrands, carColors } from '../data/data';
import { ICar, IState } from '../global-components/interfaces';
import { generateColor } from '../helpers/helpers';
import { renderCar, renderRaceBlock, renderTitle } from '../main-page/main-page';

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
    updateGarage();
};

export const updateGarage = () => {
    const raceBlock = document.querySelector('.race-block') as HTMLDivElement;
    raceBlock.innerHTML = ``;
    raceBlock.append(renderTitle());
    state.cars.forEach((item) => raceBlock.append(renderCar(item.name, item.color, item.id)));

    const carsAmount = document.querySelector('.cars-amount') as HTMLInputElement;
    carsAmount.value = `${state.cars.length}`;
};

export const setCarActivity = async (e: Event, id: number) => {
    console.log(e.target);
    const btnA = e.target as HTMLButtonElement;
    const btnB = document.querySelector(`#b${id}`) as HTMLButtonElement;
    let params;
    let animation: Animation;

    if (btnA && btnA.className === 'btn-a') {
        params = await requestEngineParams(id, 'started');
        animation = await animateCar(id, params.velocity);
        console.log(params);
        animation.play();

        btnB.addEventListener('click', () => {
            requestEngineParams(id, 'stopped');
            animation.cancel();
        });

        const successStatus = await requestToDrive(id);
        console.log(successStatus);
        if (!successStatus.success) {
            animation.pause();
        }
    }
};

export const requestEngineParams = async (id: number, status: string) => {
    console.log('engine', engine);
    return await fetch(`${engine}?id=${id}&status=${status}`, {
        method: 'PATCH',
    }).then((res) => res.json());
};

export const requestToDrive = async (id: number) => {
    return await fetch(`${engine}?id=${id}&status=drive`, {
        method: 'PATCH',
    }).then((res) => res.json());
};

export const animateCar = async (id: number, velocity: number) => {
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

export const createCar = async () => {
    const carName = document.querySelector('.create-car-name') as HTMLInputElement;
    const carColor = document.querySelector('.create-car-color') as HTMLInputElement;

    carColor.value === '#ffffff' ? (carColor.value = generateColor()) : carColor.value;
    carName.value === '' ? (carName.value = carBrands[8]) : carName.value;
    // console.log('carName.value, carColor.value', carName.value, carColor.value);

    const body: ICar = {
        name: carName.value,
        color: carColor.value,
        id: state.cars.length + 1,
    };
    await requestCreateCar(body);
   
    updateGarage();
    carColor.value = '#ffffff';
    carName.value = '';
    console.log(state, body);
};

export const requestCreateCar = async (body: ICar) => {
    return await fetch(`${garage}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    })
        .then((res) => res.json())
        .then((car) => (state.cars = state.cars.concat(car)));
};
