
import Queue from './queue';

class Clinic {
    name: string;
    blockNum: number;
    staff: number;
    waitlist: Queue<any>;
  
    constructor(name: string, blockNum: number, staff: number) {
      this.name = name;
      this.blockNum = blockNum;
      this.staff = staff;
      this.waitlist = new Queue<any>();
    }
  //vaccinated or not??
    registerPerson(person: any) {
      person.isVaccinated = true;  // 
      this.waitlist.enqueue(person);
    }

    getCurrentWaitTime(): number {
        return this.waitlist.size() * 15;  // 15 min
      }
  }

  export default Clinic
  