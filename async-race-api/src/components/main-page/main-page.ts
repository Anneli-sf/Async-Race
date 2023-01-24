import { deleteCar, selectCar, setCarActivity, showNextPage, showPrevPage, state } from '../ui/ui';
import {
    createButton,
    createElement,
    createInput,
    createParagraph,
    createSVG,
} from '../global-components/global-components';
import { renderHeader } from './header/header';
import './main-page.scss';

export const renderTitle = (currPage: number): HTMLDivElement => {
    const raceHeader = createElement('div', 'race-header') as HTMLDivElement;
    const titleBlock = createElement('div', 'title-block') as HTMLDivElement;
    const pageBlock = createElement('div', 'page-block') as HTMLDivElement;

    const title = createElement('span', 'title') as HTMLSpanElement;
    title.innerText = `Garage`;
    const carsAmount = createInput('cars-amount', 'number', '', '', '0', true) as HTMLInputElement;
    carsAmount.disabled = true;
    const page = createElement('span', 'page') as HTMLSpanElement;
    page.innerText = `Page`;

    const pageNumber = createElement('span', 'page-number') as HTMLSpanElement;
    pageNumber.innerHTML = `${currPage + 1}`;

    const btnPrev = createButton('', 'btn-prev');
    const btnNext = createButton('', 'btn-next');

    btnPrev.addEventListener('click', () => {
        showPrevPage();
    });

    btnNext.addEventListener('click', () => {
        showNextPage();
    });

    titleBlock.append(title, carsAmount);
    pageBlock.append(page, btnPrev, pageNumber, btnNext);

    raceHeader.append(titleBlock, pageBlock);
    return raceHeader;
};

export const renderRaceBlock = (currPage: number): HTMLDivElement => {
    const raceBlock = createElement('div', 'race-block') as HTMLDivElement;
    raceBlock.append(renderTitle(currPage));
    return raceBlock;
};

export const renderCar = (carNameText: string, carColor: string, carId: number): HTMLDivElement => {
    const carBlock = createElement('div', 'car-block') as HTMLDivElement;
    const carBlockHeader = createElement('div', 'car-block-header') as HTMLDivElement;
    const btnSelect = createButton('select', 'btn-select') as HTMLButtonElement;
    const btnRemove = createButton('remove', 'btn-remove') as HTMLButtonElement;
    btnRemove.id = `remove${carId}`;
    btnSelect.id = `select${carId}`;
    const carName = createElement('span', 'car-name') as HTMLSpanElement;
    carName.innerHTML = carNameText;
    carBlockHeader.append(btnSelect, btnRemove, carName);

    const carMainBlock = createElement('div', 'car-main-block') as HTMLDivElement;
    const carMainButtonsBlock = createElement('div', 'car-main-btns-block') as HTMLDivElement;
    const btnA = createButton('A', 'btn-a') as HTMLButtonElement;
    btnA.id = `a${carId}`;
    const btnB = createButton('B', 'btn-b') as HTMLButtonElement;
    btnB.id = `b${carId}`;
    btnB.disabled = true;
    carMainButtonsBlock.append(btnA, btnB);

    btnA.addEventListener('click', async (e: Event) => {
        btnA.disabled = true;
        btnB.disabled = false;
        await setCarActivity(e, +btnA.id.slice(1));
    });

    btnB.addEventListener('click', async () => {
        btnA.disabled = false;
        btnB.disabled = true;
    });

    btnRemove.addEventListener('click', async (e) => {
        await deleteCar(e, +btnRemove.id.slice(6));
    });

    btnSelect.addEventListener('click', async (e) => {
        await selectCar(e, +btnSelect.id.slice(6));
    });

    const car = createElement('div', 'car') as HTMLDivElement;
    const carImage = createSVG('car-image', `car-${carId}`) as SVGElement;
    carColor ? (carImage.style.fill = carColor) : (carImage.style.fill = 'transparent');
    car.append(carImage);
    const flag = createElement('span', 'flag') as HTMLSpanElement;

    carMainBlock.append(carMainButtonsBlock, car, flag);
    carBlock.append(carBlockHeader, carMainBlock);

    return carBlock;
};

export const renderMainPage = (page: number): HTMLElement => {
    const main = createElement('main', 'main') as HTMLElement;
    main.append(renderHeader(), renderRaceBlock(page));
    return main;
};

export const renderWinMessage = (carName: string, resTime: number) => {
    const winBlockWrapper = createElement('div', 'win-wrapper') as HTMLDivElement;
    const winMessage = createElement('div', 'win-message') as HTMLDivElement;
    const messageWithName = createParagraph(`${carName} is the winner!`, 'winner-name-message') as HTMLParagraphElement;
    const messageWitResult = createParagraph(`Result: ${resTime}s.`, 'winner-result-message') as HTMLParagraphElement;

    winMessage.append(messageWithName, messageWitResult);
    winBlockWrapper.append(winMessage);

    winBlockWrapper.classList.add('show');
    return winBlockWrapper;
};
