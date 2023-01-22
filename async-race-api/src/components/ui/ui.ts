import { ICar, INewCar, IState } from '../global-components/interfaces';
import { cleanInputs, generateColor, generateName, setCarsAmount, setSelectedCarParams } from '../helpers/helpers';
import { renderCar, renderTitle } from '../main-page/main-page';
import {
    requestGetCars,
    requestEngineParams,
    requestUpdateCar,
    requestToDrive,
    requestDeleteCar,
    requestCreateCar,
    requestCreate100Cars,
    requestToStartRace,
} from '../api/api';

window.addEventListener('load', async () => await fillGarage());

export const state: IState = {
    cars: [],
    selectedCar: {
        name: '',
        color: '',
        id: -1,
    },
};

export const fillGarage = async () => {
    await requestGetCars();
    await updateGarage();
};

export const updateGarage = async () => {
    const raceBlock = document.querySelector('.race-block') as HTMLDivElement;
    raceBlock.innerHTML = ``;
    raceBlock.append(renderTitle());
    console.log('state.cars in update', state.cars);
    state.cars.forEach((item) => raceBlock.append(renderCar(item.name, item.color, item.id)));

    setCarsAmount();
};

//-------------------------DRIVE & STOP
export const setCarActivity = async (e: Event, id: number) => {
    // console.log(e.target);
    const btnA = e.target as HTMLButtonElement;
    const btnB = document.querySelector(`#b${id}`) as HTMLButtonElement;
    let params;
    let animation: Animation;

    if (btnA && btnA.className === 'btn-a') {
        params = await requestEngineParams(id, 'started');
        animation = await animateCar(id, params.velocity);
        animation.id = `animation${id}`;
        // console.log(params);
        animation.play();

        btnB.addEventListener('click', async () => {
            await requestEngineParams(id, 'stopped');
            animation.cancel();
        });

        try {
            await requestToDrive(id);
        } catch (error) {
            animation.pause();
        }
    }
};

export const startRace = async (cars: ICar[]) => {
    const btnsA = document.querySelectorAll('.btn-a') as NodeListOf<HTMLButtonElement>;
    const btnsB = document.querySelectorAll('.btn-b') as NodeListOf<HTMLButtonElement>;
    const btnReset = document.querySelector('.btn-reset') as HTMLButtonElement;
    const params = [...(await requestToStartRace(cars, 'started'))];

    cars.forEach(async (car, index) => {
        const animation = await animateCar(car.id, params[index].velocity);
        animation.play();

        btnsA.forEach((item) => (item.disabled = true));
        // btnsB.forEach((item) => (item.disabled = false));

        // btnsB.forEach((item) =>
        //     item.addEventListener('click', async (e) => {
        //         const btn = e.target as HTMLButtonElement;
        //         console.log(btn.id.slice(1));
        //         await requestEngineParams(+btn.id.slice(1), 'stopped');
        //         animation.cancel();
        //     })
        // );

        btnReset.addEventListener('click', () => {
            cars.forEach(async (car) => await requestEngineParams(car.id, 'stopped'));
            animation.cancel();
            btnsA.forEach((item) => (item.disabled = false));
        });

        try {
            await requestToDrive(car.id);
        } catch (error) {
            animation.pause();
        }
    });
};

const animateCar = async (id: number, velocity: number) => {
    const car = document.querySelector(`#car-${id}`) as HTMLSpanElement;
    const parentEl = car.parentElement as HTMLDivElement;
    const pathWidth: number = parentEl.offsetWidth;
    // console.log(distance);
    const time = pathWidth / velocity;
    // console.log(time);

    const carKeyframes = new KeyframeEffect(
        car,
        [{ transform: 'translateY(0%)' }, { transform: `translate(${pathWidth + 60}px)` }],
        { duration: time * 1000, fill: 'forwards' }
    );
    const carAnimation = new Animation(carKeyframes, document.timeline);
    return carAnimation;
};

//-------------------------CREATE
export const createCarParams = (): INewCar => {
    //
    const carName = document.querySelector('.create-car-name') as HTMLInputElement;
    const carColor = document.querySelector('.create-car-color') as HTMLInputElement;

    const car: INewCar = {
        //
        name: carName.value === '' ? generateName() : carName.value,
        color: carColor.value === '#ffffff' ? generateColor() : carColor.value,
        // id: state.cars.length ? state.cars[state.cars.length - 1].id + 1 : 0,
    };
    return car;
};

export const createCar = async (amount = 1) => {
    const car: INewCar = createCarParams(); //
    await requestCreateCar(car);
    await updateGarage();
    cleanInputs('.create-car-color', '.create-car-name');
};

export const create100Cars = async () => {
    const allCars = await requestCreate100Cars();

    state.cars = [...state.cars, ...allCars];
    await updateGarage();
};

//-------------------------DELETE
export const deleteCar = async (e: Event, id: number) => {
    const btnRemove = e.target as HTMLButtonElement;
    if (btnRemove && btnRemove.id == `remove${id}`) {
        await requestDeleteCar(id);
        updateGarage();
    }
};

//-------------------------UPDATE
export const selectCar = async (e: Event, id: number) => {
    const btnSelect = e.target as HTMLButtonElement;
    const currentCarColor = document.querySelector('.update-car-color') as HTMLInputElement;
    const currentCarName = document.querySelector('.update-car-name') as HTMLInputElement;
    if (btnSelect && btnSelect.id == `select${id}`) {
        const carIndex: number = state.cars.findIndex((item) => item.id == id);
        currentCarColor.value = state.cars[carIndex].color;
        currentCarName.value = state.cars[carIndex].name;
    }

    setSelectedCarParams(currentCarName.value, currentCarColor.value, id);
};

export const updateCar = async () => {
    const currentCarColor = document.querySelector('.update-car-color') as HTMLInputElement;
    const currentCarName = document.querySelector('.update-car-name') as HTMLInputElement;

    if (currentCarName.value !== '') {
        setSelectedCarParams(currentCarName.value, currentCarColor.value, state.selectedCar.id);
        await requestUpdateCar(state.selectedCar.id, state.selectedCar);

        const carIndex: number = state.cars.findIndex((item) => item.id == state.selectedCar.id);
        state.cars[carIndex].name = state.selectedCar.name;
        state.cars[carIndex].color = state.selectedCar.color;
        updateGarage();
        cleanInputs('.update-car-color', '.update-car-name');
    }
};
