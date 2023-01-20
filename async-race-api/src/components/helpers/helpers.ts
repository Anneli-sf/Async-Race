export const generateColor = (): string => {
    return '#' + (Math.random().toString(16) + '000000').substring(2, 8).toUpperCase();
};

export const getInputValue = (e: Event): string => {
    const input = e.target as HTMLInputElement;
    return input.value;
};
