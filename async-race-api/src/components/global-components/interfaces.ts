export interface ICar {
    id: string;
    name: string;
    color: string;
}

export interface IState {
    cars: ICar[];
}
