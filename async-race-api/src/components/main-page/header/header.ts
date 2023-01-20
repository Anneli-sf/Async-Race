import './header.scss';
import {
    createButton,
    createElement,
    createForm,
    createImage,
    createInput,
    createParagraph,
} from '../../global-components/global-components';
import { fillGarage } from '../../api/api';

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
    const carColorCreateInput = createInput('create-car-color', 'color', '', '', '', false) as HTMLInputElement;
    // const btnCreate = createInput('btn-create', 'button', '', '', 'create', true) as HTMLButtonElement;
    const btnCreate = createButton('create', 'btn-create') as HTMLButtonElement;
    // const formCreate = createForm('form-create', 'form-create', '', 'post') as HTMLFormElement;
    // formCreate.append(carColorCreateInput, btnCreate);
    blockCreation.append(carNameCreateInput, carColorCreateInput, btnCreate);

    btnCreate.addEventListener('click', async () => {
        // await fillGarage();
        console.log('ghgjgjgj');
    });
    return blockCreation;
};

const createUpdateBlock = (): HTMLDivElement => {
    const blockUpdate = createElement('div', 'block-update') as HTMLDivElement;
    const carNameUpdateInput = createInput('update-car-name', 'text', '', '', '', false) as HTMLInputElement;
    const carColorUpdateInput = createInput('update-car-color', 'color', '', '', '', false) as HTMLInputElement;
    // const btnUpdate = createInput('btn-update', 'submit', '', '', 'update', true) as HTMLButtonElement;
    const btnUpdate = createButton('update', 'btn-update') as HTMLButtonElement;
    // const formUpdate = createForm('form-update', 'form-update', '', 'post') as HTMLFormElement;
    // formUpdate.append(carColorUpdateInput, btnUpdate);
    blockUpdate.append(carNameUpdateInput, carColorUpdateInput, btnUpdate);
    return blockUpdate;
};

const createRaceBlock = (): HTMLDivElement => {
    const raceBtnsBlock = createElement('div', 'race-btns-block') as HTMLDivElement;
    const btnRace = createButton('race', 'btn-race') as HTMLButtonElement;
    const btnReset = createButton('reset', 'btn-reset') as HTMLButtonElement;
    const btnGenerateCars = createButton('generate cars', 'btn-generate-cars') as HTMLButtonElement;
    raceBtnsBlock.append(btnRace, btnReset, btnGenerateCars);
    return raceBtnsBlock;
};

export const renderHeader = () => {
    const header = createElement('div', 'header') as HTMLDivElement;
    header.append(createNavBlock(), createCreationBlock(), createUpdateBlock(), createRaceBlock());
    return header;
};
