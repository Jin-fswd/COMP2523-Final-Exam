import { IReport } from "./IReport";
import Clinic from "./clinic";

export class SimpleReport implements IReport {
  protected clinics: Clinic[];

  constructor(clinics: Clinic[]) {
    this.clinics = clinics;
  }

  printDetails() {
    console.log("Simple Report: @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
    this.clinics.forEach(clinic => {
      console.log(`${clinic.name} - # of people: ${clinic.waitlist.size()}`);
    });
  }
}