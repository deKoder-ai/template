'use strict';

import { LinkedList } from './LinkedList';

/**
 * Create a new node for a linked list.
 * @param {any} value - Value of the new node
 * @param {number} next - Reference to the next node in the list
 * @returns {Object} A new node
 */
class Node {
  constructor(value = null, next = null) {
    this.value = value;
    this.next = next;
    return this;
  }
}

class HashMap {
  constructor(loadFactor, capacity, log = false) {
    this.loadFactor = loadFactor;
    this.capacity = capacity;
    this.log = log;
    this.buckets = Array(capacity);
    this.size = 0;

    return this;
    // double buckets when the hash map reaches the load factor
  }
  hash = (key) => {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      // use a modulo on each iteration (instead of at the end)
      // to avoid hashCode becoming so large that calcs become
      // inaccurate
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % this.capacity; //?
    }
    return hashCode;
  };
  set = (key, value) => {
    // takes two arguments, key and value
    // if a key already exists then the old value is overwritten
    // use a linked list to deal with collisions?
    let hashedKey = this.hash(key);

    if (!this.outOfBounds(hashedKey)) {
      if (!this.buckets[hashedKey]) {
        this.buckets[hashedKey] = new LinkedList();
      }
      // check if key already in bucket, if so overwrite value
      this.buckets[hashedKey].push([key, value]);
      this.size++;
    }
  };
  /**
   * Check if a given index falls within the bounds of the map array.
   * @param {number} index The index to check
   * @returns {boolean} False if in range, throws error if out of range
   */
  outOfBounds = (index) => {
    if (index < 0 || index >= this.buckets.length) {
      throw new Error('Index out of bounds');
    } else {
      return false;
    }
  };
  /**
   * Search for a key and return its value
   * @param {string} key The key to search for
   * @param {boolean} log If true, logs key/value pair to console
   * @returns {any} The value associated with the key or null if not found in map
   */
  get = (key, log) => {
    let hashedKey = this.hash(key);
    let bucket = this.buckets[hashedKey];
    const getValue = (bucket) => {
      if (bucket.value[0] === key) {
        let value = bucket.value[1];
        if (log) console.log(`Key: ${key} | Value: ${value}`);
        return value;
      }
      if (!bucket.next) {
        if (log) console.log('Key not found');
        return null;
      }
      return getValue(bucket.next);
    }
    return getValue(bucket.head)
  };
  /**
   * Checks if the specified key is contained in the hash map
   * @param {string} key The key to search for
   * @returns {boolean} True if key is in map, false if not
   */
  has = (key, log) => {
    let hashedKey = this.hash(key);
    let bucket = this.buckets[hashedKey];
    const hasKey = (bucket) => {
      if (bucket.value[0] === key) {
        if (log) console.log(`[${key}] is in hash map`);
        return true;
      }
      if (!bucket.next) {
        if (log) console.log(`[${key}] is not in hash map`);
        return false;
      }
      return hasKey(bucket.next);
    };
    return hasKey(bucket.head);
  };
  remove = (key) => {
    // if key in map, remove the entry and return true
    // else return false
    if (this.has(key)) {
      console.log('remove');
    }
  };
  /**
   * Return the length of the hash map.
   * @param {boolean} log If true, logs the length to the console
   * @returns {number} The length of the hash map
   */
  length = (log) => {
    if (log) console.log(`Length: ${this.size}`);
    return this.size;
  };
  /**
   * Removes all entries from the hash map.
   * @param {boolean} log If true, logs process to the console
   */
  clear = (log) => {
    if (log) console.log('Clearing buckets...');
    this.buckets = Array(this.capacity);
  };
  /**
   * Build an array containing all the keys stored in the hash map.
   * @param {boolean} log If true, log the keys to the console
   * @returns {Array} The array of keys
   */
  keys = (log) => {
    const array = [];
    const getKeys = (bucket) => {
      array.push(bucket.value[0]);
      if (!bucket.next) return null;
      return getKeys(bucket.next);
    };
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i]) {
        let bucket = this.buckets[i];
        getKeys(bucket.head);
      }
    }
    if (log) console.log('Keys:', array);
    return array;
  };
  /**
   * Build an array containing all the values stored in the hash map.
   * @param {boolean} log If true, log the values to the console
   * @returns {Array} The array of values
   */
  values = (log) => {
    const array = [];
    const getValues = (bucket) => {
      array.push(bucket.value[1]);
      if (!bucket.next) return null;
      return getValues(bucket.next);
    };
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i]) {
        let bucket = this.buckets[i];
        getValues(bucket.head);
      }
    }
    if (log) console.log('Values:', array);
    return array;
  };
  /**
   * Build an array of all key/value pairs stored in the hash map
   * @param {boolean} log If true, log the pairs to the console
   * @returns {Array} The array of key/value pairs
   */
  entries = (log) => {
    const array = [];
    const getPairs = (bucket) => {
      array.push(bucket.value);
      if (!bucket.next) return null;
      return getPairs(bucket.next);
    };
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i]) {
        let bucket = this.buckets[i];
        getPairs(bucket.head);
      }
    }
    if (log) {
      console.log('Key/Value Pairs:');
      for (let i = 0; i < array.length; i++) {
        console.log(array[i]);
      }
    }
    return array;
  };
  /**
   * Check the contents of the hash map buckets.
   */
  checkBuckets = () => {
    for (let i = 0; i < this.buckets.length; i++) {
      console.log(`Bucket${i}: ${this.buckets[i]}`);
    }
  };
}

export { HashMap };


// set = (key, value, log) => {
//   // takes two arguments, key and value
//   // if a key already exists then the old value is overwritten
//   // use a linked list to deal with collisions?
//   let hashedKey = this.hash(key);

//   if (!this.outOfBounds(hashedKey)) {
//     let bucket = this.buckets[hashedKey];
//     // if bucket is empty, create new linked list
//     if (!bucket) {
//       bucket = new LinkedList();
//       bucket.push([key, value]);
//     }
//     // function to check if key is in bucket
//     const hasKey = (bucket) => {
//       if (bucket.value[0] === key) {
//         if (log) console.log(`[${key}] is already in hash map. Updating value...`);
//         return true;
//       }
//       if (!bucket.next) {
//         if (log) console.log(`[${key}] is not in hash map`);
//         return false;
//       }
//       return hasKey(bucket.next);
//     };
//     // if key in bucket, overwrite value
//     if (hasKey(bucket.head)) {
//       const update = (bucket) => {
//         if (bucket.value[0] === key) {
//           bucket.value[1] = value;
//           return;
//         } else {
//           return update(bucket.next);
//         }
//       };
//       update(bucket.head);
//     } else { // append new key value pair
//       bucket.push([key, value]);
//     }
//     this.size++;
//   }
// };