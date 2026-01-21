export class Car{
  constructor(brand , model){
    this.brand = brand;
    this.model = model;
    this.speed = 0;
    this.trunk = false;
  }
  displayinfo() {
    console.log(`${this.brand} ${this.model} , Speed : ${this.speed} Km/h , Trunk Info : ${this.isTrunkOpen() ? 'open' : 'close'}`);
  }
  go(){
    if(this.trunk) return;
    if(this.speed < 200){
      this.speed += 5;
    }
  }
  brake(){
    if(this.speed > 0){
      this.speed -= 5;
    }
  }
  isTrunkOpen(){
    if(this.trunk) return true;
    return false;
  }
  openTrunk(){
    if(this.speed > 0 ||this.trunk === null) return;
    this.trunk = !this.trunk;
  }
};

export class RaceCar extends Car{
  constructor(brand , model ,acc){
    super(brand, model);
    this.accelaration = acc;
    this.trunk = null;
  }
  go(){
    if(this.speed < 300){
      this.speed += this.accelaration;
    }
  }
  openTrunk(){
    return;
  }
  displayinfo() {
    console.log(`${this.brand} ${this.model} , Speed : ${this.speed} Km/h , Accelaration : ${this.accelaration}`);
  }
};
