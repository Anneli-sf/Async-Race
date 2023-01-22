import './header.scss';
import {
    createButton,
    createElement,
    createForm,
    createImage,
    createInput,
    createParagraph,
} from '../../global-components/global-components';
import { create100Cars, createCar, updateCar } from '../../ui/ui';
import { getInputValue } from '../../helpers/helpers';

const createNavBlock = (): HTMLDivElement => {
    const navigation = createElement('div', 'nav') as HTMLDivElement;
    const btnToGarage = createButton('to garage', 'btn-to-garage') as HTMLButtonElement;
    const btnToWinners = createButton('to winners', 'btn-to-winners') as HTMLButtonElement;
    navigation.append(btnToGarage, btnToWinners);
    return navigation;
};

const createCreationBlock = (): HTMLDivElement => {
    const blockCreation = createElement('div', 'block-creation') as HTMLDivElement;
    const carNameCreateInput = createInput('create-car-name', 'text', '', '', '', false) as HTMLInputElement;
    const carColorCreateInput = createInput('create-car-color', 'color', '', '', '#ffffff', false) as HTMLInputElement;
    const btnCreate = createButton('create', 'btn-create') as HTMLButtonElement;
    blockCreation.append(carNameCreateInput, carColorCreateInput, btnCreate);

    btnCreate.addEventListener('click', async () => {
        await createCar();
    });
    return blockCreation;
};

const createUpdateBlock = (): HTMLDivElement => {
    const blockUpdate = createElement('div', 'block-update') as HTMLDivElement;
    const carNameUpdateInput = createInput('update-car-name', 'text', '', '', '', false) as HTMLInputElement;
    const carColorUpdateInput = createInput('update-car-color', 'color', '', '', '#ffffff', false) as HTMLInputElement;
    const btnUpdate = createButton('update', 'btn-update') as HTMLButtonElement;
    blockUpdate.append(carNameUpdateInput, carColorUpdateInput, btnUpdate);

    btnUpdate.addEventListener('click', async () => {
        await updateCar();
    });
    return blockUpdate;
};

const createRaceBlock = (): HTMLDivElement => {
    const raceBtnsBlock = createElement('div', 'race-btns-block') as HTMLDivElement;
    const btnRace = createButton('race', 'btn-race') as HTMLButtonElement;
    const btnReset = createButton('reset', 'btn-reset') as HTMLButtonElement;
    const btnGenerateCars = createButton('generate cars', 'btn-generate-cars') as HTMLButtonElement;
    raceBtnsBlock.append(btnRace, btnReset, btnGenerateCars);

    btnGenerateCars.addEventListener('click', async () => {
        await create100Cars();
    });

    return raceBtnsBlock;
};

export const renderHeader = () => {
    const header = createElement('div', 'header') as HTMLDivElement;
    header.append(createNavBlock(), createCreationBlock(), createUpdateBlock(), createRaceBlock());
    return header;
};
