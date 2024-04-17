import Clinic from "./clinic";
import { IReport } from "./IReport";

export class ComplexReport implements IReport {
  protected clinics: Clinic[];

  constructor(clinics: Clinic[]) {
    this.clinics = clinics;
  }

  printDetails() {
    console.log(
      "Complex Report : "
    );
    this.clinics.forEach((clinic) => {
      console.log(
        `${clinic.name} - avg wating time : ${clinic.getCurrentWaitTime()} min`
      );
      console.log(
        `${clinic.name} :  People in queue:  - ${clinic
          .getLineupNames()
          .join(", ")}`
      );
    });
  }
}
