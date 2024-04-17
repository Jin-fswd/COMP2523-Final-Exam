import Queue from "./queue";

class Clinic {
  name: string;
  blockNum: number;
  staff: number;
  waitlist: Queue<{
    phn: string;
    fullName: string;
    isVaccinated: boolean;
    age: number;
  }>;

  constructor(name: string, blockNum: number, staff: number) {
    this.name = name;
    this.blockNum = blockNum;
    this.staff = staff;
    this.waitlist = new Queue<{
      phn: string;
      fullName: string;
      isVaccinated: boolean;
      age: number;
    }>();
  }
  registerPerson(person: any) {
    person.isVaccinated = true;
    this.waitlist.enqueue(person);
  }
  getCurrentWaitTime(): number {
    return this.waitlist.size() * 15;
  }

  getLineupNames(): string[] {
    return this.waitlist.getContents().map((person) => person.fullName);
  }
}

export default Clinic;
