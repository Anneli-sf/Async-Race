export interface ICar {
    id: number;
    name: string;
    color: string;
}

export interface IState {
    cars: ICar[];
}
