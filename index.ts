import Map from './map';
import ReportMaker from './reportMaker';
import { ComplexReport } from './complexReport'
import { SimpleReport } from './simpleReport';
let currentIntake = 20; 

async function main() {
    const map = new Map('data.json', currentIntake);
    map.printMap();
    console.log("---End of Map---")
    map.registerForShots();
    map.printMap();
    console.log("---End of Map---")
    const report = new ReportMaker(new SimpleReport(map.getClinics()));
    report.printDetails();
    const report2 =  new ReportMaker(new ComplexReport(map.getClinics()));
    report2.printDetails();
    console.log("---End of Report---")
    
  }
  
  main();