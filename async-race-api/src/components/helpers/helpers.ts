import { state } from '../ui/ui';
import { carBrands, carModels } from '../data/data';
import { ICar } from '../global-components/interfaces';
export const generateColor = (): string => {
    return '#' + (Math.random().toString(16) + '000000').substring(2, 8).toUpperCase();
};

export const generateName = (): string => {
    const brand: string = carBrands[Math.floor(Math.random() * carBrands.length)];
    const model: string = carModels[Math.floor(Math.random() * carModels.length)];
    return `${brand} ${model}`;
};

export const getInputValue = (e: Event): string => {
    const input = e.target as HTMLInputElement;
    return input.value;
};

export const cleanInputs = (inputColorClass: string, inputNameClass: string) => {
    const currentCarColor = document.querySelector(inputColorClass) as HTMLInputElement;
    const currentCarName = document.querySelector(inputNameClass) as HTMLInputElement;
    currentCarColor.value = '#ffffff';
    currentCarName.value = '';
};

export const setSelectedCarParams = (name: string, color: string, carId?: number) => {
    state.selectedCar.name = name;
    state.selectedCar.color = color;
    carId ? (state.selectedCar.id = carId) : (state.selectedCar.id = -1);
};

export const setCarsAmount = async () => {
    const carsAmount = document.querySelector('.cars-amount') as HTMLInputElement;
    carsAmount.value = `${state.cars.flat().length}`;//
};

export const sliceIntoChunks = (arr: ICar[], chunkSize: number): ICar[][] => {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        res.push(chunk);
    }
    return res;
};
