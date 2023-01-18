import { createButton, createElement, createInput, createParagraph } from '../global-components/global-components';
import { renderHeader } from './header/header';
import './main-page.scss';

const wrapper = document.querySelector('.wrapper') as HTMLDivElement;

const renderTitle = (): HTMLDivElement => {
    const raceHeader = createElement('div', 'race-header') as HTMLDivElement;
    const titleBlock = createElement('div', 'title-block') as HTMLDivElement;
    const pageBlock = createElement('div', 'page-block') as HTMLDivElement;

    const title = createElement('span', 'title') as HTMLSpanElement;
    title.innerText = `Garage`;
    const carsAmount = createInput('cars-amount', 'number', '', '', '0', true) as HTMLInputElement;
    const page = createElement('span', 'page') as HTMLSpanElement;
    page.innerText = `Page`;
    const pageNumber = createInput('page-number', 'number', 'page-number', '', '1', true) as HTMLInputElement;

    titleBlock.append(title, carsAmount);
    pageBlock.append(page, pageNumber);

    raceHeader.append(titleBlock, pageBlock);
    return raceHeader;
};

const renderRaceBlock = (): HTMLDivElement => {
    const raceBlock = createElement('div', 'race-block') as HTMLDivElement;
    raceBlock.append(renderTitle(), renderCarBlock('bmw'));
    return raceBlock;
};

const renderCarBlock = (carNameText: string): HTMLDivElement => {
    const carBlock = createElement('div', 'car-block') as HTMLDivElement;
    const carBlockHeader = createElement('div', 'car-block-header') as HTMLDivElement;
    const btnSelect = createButton('select', 'btn-select') as HTMLButtonElement;
    const btnRemove = createButton('remove', 'btn-remove') as HTMLButtonElement;
    const carName = createElement('span', 'car-name') as HTMLSpanElement;
    carName.innerHTML = carNameText;
    carBlockHeader.append(btnSelect, btnRemove, carName);

    const carMainBlock = createElement('div', 'car-main-block') as HTMLDivElement;
    const carMainButtonsBlock = createElement('div', 'car-main-btns-block') as HTMLDivElement;
    const btnA = createButton('A', 'btn-a') as HTMLButtonElement;
    const btnB = createButton('B', 'btn-b') as HTMLButtonElement;
    carMainButtonsBlock.append(btnA, btnB);

    const car = createElement('div', 'car') as HTMLDivElement;
    const carImage = createElement('span', 'car-image') as HTMLSpanElement;
    car.append(carImage);
    const flag = createElement('span', 'flag') as HTMLSpanElement;

    carMainBlock.append(carMainButtonsBlock, car, flag);
    carBlock.append(carBlockHeader, carMainBlock);

    return carBlock;
};

export const renderMainPage = (): HTMLElement => {
    const main = createElement('main', 'main') as HTMLElement;
    main.append(renderHeader(), renderRaceBlock());
    return main;
};

// createMainPage();
