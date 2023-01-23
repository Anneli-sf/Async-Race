import { ICar, INewCar, IState } from '../global-components/interfaces';
import { cleanInputs, generateColor, generateName, sliceIntoChunks } from '../helpers/helpers';
import { state } from '../ui/ui';

const base = 'http://127.0.0.1:3000';
const garage = `${base}/garage`;
const engine = `${base}/engine`;

export async function requestGetCars(page: number) {
    console.log(page);
    return await fetch(`${garage}`) //...?_page=${page}&_limit=${limit}
        .then((res) => res.json())
        .then((car) => {
            const flatCarsArray: ICar[] = state.cars.flat().concat(car);
            console.log(sliceIntoChunks(flatCarsArray, 7));
            return (state.cars = sliceIntoChunks(flatCarsArray, 7));
        });
}

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

export const requestToStartRace = async (cars: ICar[], status: string) => {
    //
    return await Promise.all(
        cars.flat().map(async (car) => {
            //
            return await fetch(`${engine}?id=${car.id}&status=${status}`, {
                method: 'PATCH',
            }).then((res) => res.json());
        })
    );
};

export const requestCreate100Cars = async () => {
    const cars: INewCar[] = [];
    let i = 0;
    while (i < 100) {
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
};

export const requestCreateCar = async (body: INewCar) => {
    return await fetch(`${garage}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    })
        .then((res) => res.json())
        .then((car) => {
            const arr: ICar[] = state.cars.flat().concat(car);
            return (state.cars = sliceIntoChunks(arr, 7));
        });
    //(state.cars = state.cars.concat(car)));
};

export const requestDeleteCar = async (id: number) => {
    return await fetch(`${garage}/${id}`, {
        method: 'DELETE',
    })
        .then((res) => res.json())
        .then(() => {
            let flatCarsArray: ICar[] = state.cars.flat();
            console.log('del arr', flatCarsArray);
            flatCarsArray = flatCarsArray.filter((car) => car.id !== id);
            return (state.cars = sliceIntoChunks(flatCarsArray, 7));
        });
    // (state.cars = state.cars.filter((car) => car.id !== id)));
};

export const requestUpdateCar = async (id: number, body: ICar) => {
    return await fetch(`${garage}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    }).then((res) => res.json());
};
