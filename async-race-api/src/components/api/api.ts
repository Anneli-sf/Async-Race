import { ICar, INewCar, IState } from '../global-components/interfaces';
import { cleanInputs, generateColor, generateName } from '../helpers/helpers';
import { state } from '../ui/ui';

const base = 'http://127.0.0.1:3000';
const garage = `${base}/garage`;
const engine = `${base}/engine`;

// window.addEventListener('load', async () => await fillGarage());

// export const state: IState = {
//     cars: [],
//     selectedCar: {
//         name: '',
//         color: '',
//         id: -1,
//     },
// };

export async function requestGetCars() {
    //page = 1, limit = 7
    return await fetch(`${garage}`) //...?_page=${page}&_limit=${limit}
        .then((res) => res.json())
        .then((car) => {
            return (state.cars = state.cars.concat(car));
        });
}

// export const fillGarage = async () => {
//     await requestGetCars();
//     await updateGarage();
// };

// export const updateGarage = async () => {
//     const raceBlock = document.querySelector('.race-block') as HTMLDivElement;
//     raceBlock.innerHTML = ``;
//     raceBlock.append(renderTitle());
//     console.log('state.cars in update', state.cars);
//     state.cars.forEach((item) => raceBlock.append(renderCar(item.name, item.color, item.id)));

//     setCarsAmount();
// };

// export const setCarsAmount = async () => {
//     const carsAmount = document.querySelector('.cars-amount') as HTMLInputElement;
//     carsAmount.value = `${state.cars.length}`;
// };

// export const setCarActivity = async (e: Event, id: number) => {
//     console.log(e.target);
//     const btnA = e.target as HTMLButtonElement;
//     const btnB = document.querySelector(`#b${id}`) as HTMLButtonElement;
//     let params;
//     let animation: Animation;

//     if (btnA && btnA.className === 'btn-a') {
//         params = await requestEngineParams(id, 'started');
//         animation = await animateCar(id, params.velocity);
//         console.log(params);
//         animation.play();

//         btnB.addEventListener('click', () => {
//             requestEngineParams(id, 'stopped');
//             animation.cancel();
//         });

//         try {
//             const successStatus = await requestToDrive(id);
//             console.log(successStatus);
//         } catch (error) {
//             animation.pause();
//         }
//     }
// };

export const requestEngineParams = async (id: number, status: string) => {
    // console.log('engine', engine);
    return await fetch(`${engine}?id=${id}&status=${status}`, {
        method: 'PATCH',
    }).then((res) => res.json());
};

export const requestToDrive = async (id: number) => {
    return await fetch(`${engine}?id=${id}&status=drive`, {
        method: 'PATCH',
    }).then((res) => res.json());
};

// const animateCar = async (id: number, velocity: number) => {
//     const car = document.querySelector(`#car-${id}`) as HTMLSpanElement;
//     const parentEl = car.parentElement as HTMLDivElement;
//     const pathWidth: number = parentEl.offsetWidth;
//     // console.log(distance);
//     const time = pathWidth / velocity;
//     // console.log(time);

//     const carKeyframes = new KeyframeEffect(
//         car,
//         [{ transform: 'translateY(0%)' }, { transform: `translate(${pathWidth + 60}px)` }],
//         { duration: time * 1000, fill: 'forwards' }
//     );
//     const carAnimation = new Animation(carKeyframes, document.timeline);
//     return carAnimation;
// };

export const requestCreate100Cars = async () => {
    const cars: INewCar[] = [];
    let i = 0;
    while (i < 5) {
        cars.push({ name: generateName(), color: generateColor() });
        i++;
    }
    return await Promise.all(
        cars.map(
            async (car): Promise<ICar> => {
                return await fetch(`${garage}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(car),
                }).then((res) => res.json());
            }
        )
    );

    // state.cars = [...state.cars, ...allCars];
    // await updateGarage();
};

// export const createCarParams = (): INewCar => { //
//     const carName = document.querySelector('.create-car-name') as HTMLInputElement;
//     const carColor = document.querySelector('.create-car-color') as HTMLInputElement;

//     const car: INewCar = { //
//         name: carName.value === '' ? generateName() : carName.value,
//         color: carColor.value === '#ffffff' ? generateColor() : carColor.value,
//         // id: state.cars.length ? state.cars[state.cars.length - 1].id + 1 : 0,
//     };
//     return car;
// };

// export const createCar = async (amount = 1) => {
//     const car: INewCar = createCarParams(); //
//     await requestCreateCar(car);
//     await updateGarage();
//     cleanInputs('.create-car-color', '.create-car-name');
// };

export const requestCreateCar = async (body: INewCar) => {
    return await fetch(`${garage}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    })
        .then((res) => res.json())
        .then((car) => (state.cars = state.cars.concat(car)))
        .then(() => console.log('after craete', state.cars));
};

export const requestDeleteCar = async (id: number) => {
    return await fetch(`${garage}/${id}`, {
        method: 'DELETE',
    })
        .then((res) => res.json())
        .then(() => (state.cars = state.cars.filter((car) => car.id !== id)));
};

// export const deleteCar = async (e: Event, id: number) => {
//     const btnRemove = e.target as HTMLButtonElement;
//     if (btnRemove && btnRemove.id == `remove${id}`) {
//         await requestDeleteCar(id);
//         // state.cars = state.cars.filter((item) => item.id !== id);
//         updateGarage();
//         console.log('delete', state.cars);
//     }
// };

//-------------------------UPDATE
// export const selectCar = async (e: Event, id: number) => {
//     const btnSelect = e.target as HTMLButtonElement;
//     const currentCarColor = document.querySelector('.update-car-color') as HTMLInputElement;
//     const currentCarName = document.querySelector('.update-car-name') as HTMLInputElement;
//     if (btnSelect && btnSelect.id == `select${id}`) {
//         const carIndex: number = state.cars.findIndex((item) => item.id == id);
//         currentCarColor.value = state.cars[carIndex].color;
//         currentCarName.value = state.cars[carIndex].name;
//     }

//     setSelectedCarParams(currentCarName.value, currentCarColor.value, id);
// };

// export const updateCar = async () => {
//     const currentCarColor = document.querySelector('.update-car-color') as HTMLInputElement;
//     const currentCarName = document.querySelector('.update-car-name') as HTMLInputElement;

//     if (currentCarName.value !== '') {
//         setSelectedCarParams(currentCarName.value, currentCarColor.value, state.selectedCar.id);
//         await requestUpdateCar(state.selectedCar.id, state.selectedCar);

//         const carIndex: number = state.cars.findIndex((item) => item.id == state.selectedCar.id);
//         state.cars[carIndex].name = state.selectedCar.name;
//         state.cars[carIndex].color = state.selectedCar.color;
//         updateGarage();
//         cleanInputs('.update-car-color', '.update-car-name');
//     }
// };

export const requestUpdateCar = async (id: number, body: ICar) => {
    return await fetch(`${garage}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    }).then((res) => res.json());
};
