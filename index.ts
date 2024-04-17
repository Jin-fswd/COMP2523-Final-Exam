import Map from './map';
import ReportMaker from './reportMaker';
import { ComplexReport } from './complexReport'
import { SimpleReport } from './simpleReport';
let currentIntake = 30; 

async function main() {
    const map = new Map('data.json', currentIntake);
    map.printMap();
    console.log("---End of Map---")
    map.registerForShots();
    map.printMap();
    console.log("---End of Map---")
    const report = new ReportMaker(new SimpleReport(map.getClinics()));
    report.printDetails();
    console.log("---End of Simple Report---")
    const report2 =  new ReportMaker(new ComplexReport(map.getClinics()));
    report2.printDetails();
    console.log("---End of Compelx Report---")
    
  }
  
  main();