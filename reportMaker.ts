import { IReport }  from "./IReport";

class ReportMaker {
  private report: IReport;

  constructor(report: IReport) {
    this.report = report;
  }

  printDetails() {
    this.report.printDetails();
  }
}

export default ReportMaker;