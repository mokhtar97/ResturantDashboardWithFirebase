import { Ingredient } from 'src/app/shared/ingredient.model';

export class Recipe{
    public name:string;
    public description:string;
    public ImagePath:string;
    public Ingrediants:Ingredient[];
    constructor(name:string,desc:string,path:string,ingrediants:Ingredient[]){
        this.name=name;
        this.description=desc;
        this.ImagePath=path;
        this.Ingrediants=ingrediants;
    }
}