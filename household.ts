import Clinic from "./clinic";

class Household {
  blockNum: number;
  inhabitants: any[];
  cityName: string;

  constructor(cityName: string, blockNum: number, inhabitants: any[]) {
    this.cityName = cityName;
    this.blockNum = blockNum;
    this.inhabitants = inhabitants;
  }

  isFullyVaccinated(): boolean {
    return this.inhabitants.every((person) => person.isVaccinated);
  }

  vaccinatePerson(phn: string, clinic: Clinic) {
    let person = this.inhabitants.find((p) => p.phn === phn && !p.isVaccinated);
    if (person) {
      clinic.registerPerson(person);
    }
  }
}

export default Household;


