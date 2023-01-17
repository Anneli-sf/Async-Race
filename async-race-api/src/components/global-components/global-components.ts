import './global-components.scss';

export const createElement = (elTag: string, elClassName: string): HTMLElement => {
    const element = document.createElement(`${elTag}`);
    element.classList.add(elClassName);
    return element;
};

export const createButton = (buttonText: string, classButton: string): HTMLButtonElement => {
    const button = createElement('button', classButton) as HTMLButtonElement;
    button.innerText = buttonText;
    return button;
};

export const createInput = (
    inputClass: string,
    inputType: string,
    id?: string,
    inputPlaceHolder?: string,
    inputValue?: string,
    readOnly?: boolean
): HTMLInputElement => {
    const input = createElement('input', `${inputClass}`) as HTMLInputElement;
    input.type = inputType;
    inputPlaceHolder ? (input.placeholder = inputPlaceHolder) : undefined;
    inputValue ? (input.value = inputValue) : undefined;
    if (readOnly) input.readOnly = readOnly;
    if (id) input.id = id;

    return input;
};

export const createImage = (imgSrc: string, imgAlt: string, imgClass: string, id?: string): HTMLImageElement => {
    const image = createElement('img', imgClass) as HTMLImageElement;
    image.src = imgSrc;
    image.alt = imgAlt;
    image.id = id as string;
    return image;
};

export const createLink = (linkHref: string, linkClass: string, linkText?: string): HTMLLinkElement => {
    const link = createElement('a', linkClass) as HTMLLinkElement;
    link.href = linkHref;
    linkText ? (link.textContent = linkText) : undefined;

    return link;
};

export const createParagraph = (parText: string | number, parClass: string): HTMLParagraphElement => {
    const text = createElement('p', parClass) as HTMLParagraphElement;
    text.innerHTML = `${parText}`;
    return text;
};
