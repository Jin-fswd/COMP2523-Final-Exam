import fs from "fs";
import path from "path";
import Clinic from "./clinic";
import Queue from "./queue";
import Household from "./household";

class Map {
  private _mapData: any;
  private dataFilePath: string;
  private clinics: Clinic[] = [];
  private households: Household[] = [];
  currentIntake: number;
  // constructors, methods, etc

  constructor(dataFilePath: string, currentIntake: number) {
    this.dataFilePath = dataFilePath;
    this._mapData = this.readData();
    this.init();
    this.currentIntake = currentIntake;
  }
  private init() {
    Object.keys(this._mapData.city).forEach((city) => {
      this._mapData.city[city].clinics.forEach((clinicData: any) => {
        const clinic = new Clinic(
          clinicData.name,
          clinicData.blockNum,
          clinicData.staff
        );
        this.clinics.push(clinic);
      });

      this._mapData.city[city].households.forEach((householdData: any) => {
        const household = new Household(
          city,
          householdData.blockNum,
          householdData.inhabitants
        );
        this.households.push(household);
      });
    });
  }
  private readData() {
    try {
      const rawData = fs.readFileSync(
        path.resolve(__dirname, this.dataFilePath),
        "utf8"
      );
      return JSON.parse(rawData);
    } catch (error) {
      console.log(error);
      return {};
    }
  }
  getClinics(): Clinic[] {
    return this.clinics;
  }
  printMap() {
    const cityNames = Object.keys(this._mapData.city);
    const mapLines: string[] = [];

    cityNames.forEach((cityName) => {
      const blocks = Array(6).fill("x");
      const cityData = this._mapData.city[cityName];

      cityData.households.forEach((household: any) => {
        const allVaccinated = household.inhabitants.every(
          (person: any) => person.isVaccinated
        );
        blocks[household.blockNum] = allVaccinated ? "F" : "H";
      });
      cityData.clinics.forEach((clinic: any) => {
        blocks[clinic.blockNum] = "C";
      });

      mapLines.push(blocks.join(","));
    });

    mapLines.forEach((line) => console.log(line));
  }

  registerForShots() {
    this.households.forEach((household) => {
      household.inhabitants.forEach((inhabitant) => {
        if (!inhabitant.isVaccinated && inhabitant.age >= this.currentIntake) {
          const closestClinic = this.findClosestClinic(household.blockNum);
          household.vaccinatePerson(inhabitant.phn, closestClinic);
          //console.log(` ${closestClinic.name} wait time is ${closestClinic.getCurrentWaitTime()}minute`);
        }
      });
      //   if (household.isFullyVaccinated()) {
      //     console.log(`block ${household.blockNum} vaccinated`);
      //   }
    });
  }
  private findClosestClinic(blockNum: number): Clinic {
    return this.clinics.reduce((prev, curr) =>
      Math.abs(curr.blockNum - blockNum) < Math.abs(prev.blockNum - blockNum)
        ? curr
        : prev
    );
  }
}

export default Map;
