export interface ICar {
    name: string;
    color: string;
    id: number;
}

export interface INewCar {
    name: string;
    color: string;
}

export interface IState {
    cars: Array<ICar[]>;
    selectedCar: ICar;
    page: number;
}
