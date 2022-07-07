const sha256 = require('js-sha256');

class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable {

  constructor(numBuckets = 4) {
    // Your code here
    this.capacity = numBuckets;
    this.data = new Array(this.capacity);
    this.data.fill(null);
    this.count = 0;
  }

  hash(key) {
    return parseInt(sha256(key).slice(0, 8), 16)
  }

  hashMod(key) {
    let sha = this.hash(key);
    return sha % this.capacity
  }

  insertNoCollisions(key, value) {
    // Your code here
    if (this.data[this.hashMod(key)]) {
      throw new Error('hash collision or same key/value pair already exists!');
    } else {
      this.data[this.hashMod(key)] = new KeyValuePair(key, value);
      this.count++;
    }
  }

  insertWithHashCollisions(key, value) {
    let newPair = new KeyValuePair(key, value);
    let index = this.hashMod(key);
    let existing = this.data[index];

    if (existing) {newPair.next = existing;}

    this.data[index] = newPair;
    this.count++;
  }

  insert(key, value) {
    // Your code here
    let newPair = new KeyValuePair(key, value);
    let index = this.hashMod(key);
    let existing = this.data[index];

    if (existing) {

      let current = this.data[index];
      let replaced = false;
      while(current) {
        if (current.key === newPair.key) {
          current.value = newPair.value;
          replaced = true;
        }
        current = current.next;
      }

      if (!replaced) {
        newPair.next = existing;
        this.data[index] = newPair;
        this.count++;
      }

    } else {
      this.data[index] = newPair;
      this.count++;
    }

  }

}

module.exports = HashTable;
