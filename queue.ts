class Queue<T> {
    private storage: T[] = [];
  
    enqueue(item: T) {
      this.storage.push(item);
    }
  
    dequeue(): T | undefined {
      return this.storage.shift();
    }
  
    size(): number {
      return this.storage.length;
    }
    
    getContents(): T[] {
        return this.storage;
    }
  }
  

  export default Queue;