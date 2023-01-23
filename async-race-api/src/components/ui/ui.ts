import { ICar, INewCar, IState } from '../global-components/interfaces';
import {
    cleanInputs,
    generateColor,
    generateName,
    setCarsAmount,
    setSelectedCarParams,
    sliceIntoChunks,
} from '../helpers/helpers';
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
    page: 0,
};

export const fillGarage = async () => {
    await requestGetCars(state.page + 1);
    await updateGarage(state.page);
};

export const updateGarage = async (page: number) => {
    const raceBlock = document.querySelector('.race-block') as HTMLDivElement;
    raceBlock.innerHTML = ``;
    raceBlock.append(renderTitle());

    state.cars[page].forEach((item) => raceBlock.append(renderCar(item.name, item.color, item.id))); //

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
        // animation.id = `animation${id}`;
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

export const startRace = async (cars: ICar[][], page: number) => {
    const btnsA = document.querySelectorAll('.btn-a') as NodeListOf<HTMLButtonElement>;
    const btnsB = document.querySelectorAll('.btn-b') as NodeListOf<HTMLButtonElement>;
    const btnReset = document.querySelector('.btn-reset') as HTMLButtonElement;
    const params = [...(await requestToStartRace(cars[page], 'started'))];

    cars[page].forEach(async (car, index) => {
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
            cars[page].forEach(async (car) => await requestEngineParams(car.id, 'stopped'));
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
    const carName = document.querySelector('.create-car-name') as HTMLInputElement;
    const carColor = document.querySelector('.create-car-color') as HTMLInputElement;

    const car: INewCar = {
        name: carName.value === '' ? generateName() : carName.value,
        color: carColor.value === '#ffffff' ? generateColor() : carColor.value,
    };
    return car;
};

export const createCar = async () => {
    const car: INewCar = createCarParams(); //
    await requestCreateCar(car);
    await updateGarage(state.page);
    cleanInputs('.create-car-color', '.create-car-name');
};

export const create100Cars = async () => {
    const allCars = await requestCreate100Cars();
    let flatCarsArray = state.cars.flat();
    flatCarsArray = [...flatCarsArray, ...allCars];
    state.cars = sliceIntoChunks(flatCarsArray, 7);
    // console.log(state.cars);
    await updateGarage(state.page);
};

//-------------------------DELETE
export const deleteCar = async (e: Event, id: number) => {
    const btnRemove = e.target as HTMLButtonElement;
    if (btnRemove && btnRemove.id == `remove${id}`) {
        await requestDeleteCar(id);
        updateGarage(state.page);
    }
};

//-------------------------UPDATE
export const selectCar = async (e: Event, id: number) => {
    const btnSelect = e.target as HTMLButtonElement;
    const currentCarColor = document.querySelector('.update-car-color') as HTMLInputElement;
    const currentCarName = document.querySelector('.update-car-name') as HTMLInputElement;
    const flatCarsArray = state.cars.flat(); //
    if (btnSelect && btnSelect.id == `select${id}`) {
        const carIndex: number = flatCarsArray.findIndex((item) => item.id == id);
        currentCarColor.value = flatCarsArray[carIndex].color;
        currentCarName.value = flatCarsArray[carIndex].name;
    }

    setSelectedCarParams(currentCarName.value, currentCarColor.value, id);
};

export const updateCar = async () => {
    const currentCarColor = document.querySelector('.update-car-color') as HTMLInputElement;
    const currentCarName = document.querySelector('.update-car-name') as HTMLInputElement;

    const flatCarsArray = state.cars.flat();
    if (currentCarName.value !== '') {
        setSelectedCarParams(currentCarName.value, currentCarColor.value, state.selectedCar.id);
        await requestUpdateCar(state.selectedCar.id, state.selectedCar);

        const carIndex: number = flatCarsArray.findIndex((item) => item.id == state.selectedCar.id);
        flatCarsArray[carIndex].name = state.selectedCar.name;
        flatCarsArray[carIndex].color = state.selectedCar.color;
        updateGarage(state.page);
        cleanInputs('.update-car-color', '.update-car-name');
    }
};

export const showPrevPage = () => {
    const pageNumber = document.querySelector('.page-number') as HTMLSpanElement;
    if (state.page > 0) {
        state.page -= 1;
    }
    pageNumber.innerHTML = `${state.page + 1}`;
    updateGarage(state.page);
};

export const showNextPage = () => {
    const pageNumber = document.querySelector('.page-number') as HTMLSpanElement;
    if (state.page < state.cars.length - 1) {
        state.page += 1;
    }
    pageNumber.innerHTML = `${state.page + 1}`;
    updateGarage(state.page);
};
