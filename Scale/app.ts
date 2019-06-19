class Scales {

    products: Product[];

    constructor() {
        this.products=[];
    }

    add(pr:Product):void {
        this.products.push(pr);
    }

    getSumScale():number {
        let _weight:number = 0;
        this.products.forEach(el => {
            _weight += el.getScale();
        });
        return _weight;
    }

    getNameList():Array<string> {
        let nameList:Array<string> = [];
        this.products.forEach( el => {
            nameList.push(el.getName());
        });
        return nameList;
    }
    
}

class Product {

    name: string;

    weight: number;

    constructor() {
        this.name = "";
        this.weight = 0; 
    }

    getScale():number {
        return this.weight;
    }

    getName():string {
        return this.name;
    }
}

class Apple extends Product {

    constructor(_name:string, _weight:number) {
        super();
        this.name = _name;
        this.weight = _weight;
    }

}

class Banane extends Product {

    constructor(_name:string, _weight:number) {
        super();
        this.name = _name;
        this.weight = _weight;
    }

}

let myScales = new Scales();
let apple_1:Apple = new Apple("Яблоко-1", 1.2);
let apple_2:Apple = new Apple("Яблоко-2", 0.8);
let banane_1:Banane = new Banane("Банан-1", 2.1);

myScales.add(apple_1);
myScales.add(apple_2);
myScales.add(banane_1);

console.log( myScales.getSumScale() + " - общий вес продуктов");
console.log("продукт - " + myScales.getNameList());