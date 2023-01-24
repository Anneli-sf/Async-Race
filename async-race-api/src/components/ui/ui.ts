import { ICar, INewCar, IState, IWinner } from '../global-components/interfaces';
import {
    cleanInputs,
    generateColor,
    generateName,
    isLocalStorage,
    setCarsAmount,
    setSelectedCarParams,
    sliceIntoChunks,
} from '../helpers/helpers';
import { renderCar, renderTitle, renderWinMessage } from '../main-page/main-page';
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

export const state: IState = {
    cars: [],
    selectedCar: {
        name: '',
        color: '',
        id: -1,
    },
    page: 0,
    winners: [],
};

const allResults: IWinner[] = [];

window.addEventListener('load', async () => await fillGarage(state.page));
//     localStorage.setItem('page', JSON.stringify(state.page));
// });

export const fillGarage = async (page: number) => {
    isLocalStorage();
    console.log('load', page);
    await requestGetCars();
    await updateGarage(state.page);
};

export const updateGarage = async (page: number) => {
    const raceBlock = document.querySelector('.race-block') as HTMLDivElement;
    raceBlock.innerHTML = ``;
    raceBlock.append(renderTitle(page));

    state.cars[page].forEach((item) => raceBlock.append(renderCar(item.name, item.color, item.id))); //

    setCarsAmount();
};

//-------------------------DRIVE & STOP
export const setCarActivity = async (e: Event, id: number) => {
    const btnA = e.target as HTMLButtonElement;
    const btnB = document.querySelector(`#b${id}`) as HTMLButtonElement;
    let params;
    let animation: Animation;

    if (btnA && btnA.className === 'btn-a') {
        params = await requestEngineParams(id, 'started');
        animation = await animateCar(id, params.velocity);
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

export const findBestTime = (animation: Animation, carName: string, allResults: IWinner[]) => {
    if (animation.startTime && animation.currentTime && animation.effect) {
        const raceTime = animation.effect.getTiming().duration as number;
        allResults.push({ name: carName, result: +(raceTime / 1000).toFixed(2) });
    }
    if (allResults.length == 1) {
        showWinMessage();
    }
};

const animateCar = async (id: number, velocity: number) => {
    const car = document.querySelector(`#car-${id}`) as HTMLSpanElement;
    const parentEl = car.parentElement as HTMLDivElement;
    const pathWidth: number = parentEl.offsetWidth;
    const time = (pathWidth / velocity) * 1000;

    const carKeyframes = new KeyframeEffect(
        car,
        [{ transform: 'translateY(0%)' }, { transform: `translate(${pathWidth + 60}px)` }],
        { duration: time, fill: 'forwards' }
    );
    const carAnimation = new Animation(carKeyframes, document.timeline);
    return carAnimation;
};

//--------------------------RACE
export const showWinMessage = () => {
    const raceBlock = document.querySelector('.race-block') as HTMLDivElement;
    raceBlock.append(renderWinMessage(allResults[0].name, allResults[0].result));
};

export const finishRace = () => {
    const winBlockWrapper = document.querySelector('.win-wrapper') as HTMLDivElement;
    winBlockWrapper.classList.remove('show');
    allResults.length = 0;
};
export const startRace = async (cars: ICar[][], page: number) => {
    const btnsA = document.querySelectorAll('.btn-a') as NodeListOf<HTMLButtonElement>;
    const btnReset = document.querySelector('.btn-reset') as HTMLButtonElement;
    const params = [...(await requestToStartRace(cars[page], 'started'))];

    cars[page].forEach(async (car, index) => {
        const animation = await animateCar(car.id, params[index].velocity);
        animation.play();

        animation.addEventListener('finish', () => {
            findBestTime(animation, car.name, allResults);
        });

        btnsA.forEach((item) => (item.disabled = true));

        btnReset.addEventListener('click', () => {
            cars[page].forEach(async (car) => await requestEngineParams(car.id, 'stopped'));
            animation.cancel();
            btnsA.forEach((item) => (item.disabled = false));
            finishRace();
        });

        try {
            await requestToDrive(car.id);
        } catch (error) {
            animation.pause();
        }
    });
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
    const car: INewCar = createCarParams();
    isLocalStorage();
    console.log('craete', state.page);
    await requestCreateCar(car);
    await updateGarage(state.page);
    cleanInputs('.create-car-color', '.create-car-name');
};

export const create100Cars = async () => {
    const allCars = await requestCreate100Cars();
    isLocalStorage();
    let flatCarsArray = state.cars.flat();
    flatCarsArray = [...flatCarsArray, ...allCars];
    state.cars = sliceIntoChunks(flatCarsArray, 7);
    await updateGarage(state.page);
};

//-------------------------DELETE
export const deleteCar = async (e: Event, id: number) => {
    const btnRemove = e.target as HTMLButtonElement;
    isLocalStorage();
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
    const flatCarsArray = state.cars.flat();
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
    isLocalStorage();

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
    isLocalStorage();
    if (state.page > 0) {
        state.page -= 1;
    }
    localStorage.setItem('page', JSON.stringify(state.page));
    pageNumber.innerHTML = `${state.page + 1}`;
    updateGarage(state.page);
};

export const showNextPage = () => {
    const pageNumber = document.querySelector('.page-number') as HTMLSpanElement;
    isLocalStorage();
    if (state.page < state.cars.length - 1) {
        state.page += 1;
    }
    localStorage.setItem('page', JSON.stringify(state.page));
    pageNumber.innerHTML = `${state.page + 1}`;
    updateGarage(state.page);
};
