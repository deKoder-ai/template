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
  constructor(loadFactor, capacity) {
    this.loadFactor = loadFactor;
    this.capacity = capacity;
    this.buckets = Array(capacity);
    this.size = 0;
    return this;
    // double buckets when the hash map reaches the load factor
  }
  hash = (key) => {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      // use a modulo on each iteration to avoid hashCode becoming so large
      // that calcs become inaccurate
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % this.capacity; //?
    }
    return hashCode;
  };
  /**
   * Add a [key: value] pair in the hash map. If a key already exists, it will be overwritten
   * @param {string} key Key
   * @param {any} value Value
   * @param {boolean} log If true, log actions to the console
   */
  set = (key, value, log) => {
    let hashedKey = this.hash(key);
    // use a linked list to deal with collisions
    // if bucket is empty, create new linked list and append [key: value] pair
    if (!this.outOfBounds(hashedKey)) {
      if (!this.buckets[hashedKey]) {
        if (log) console.log('Bucket is empty, creating new linked list');
        this.buckets[hashedKey] = new LinkedList();
        if (log) console.log(`Appending [${key}: ${value}] to new list`);
        this.buckets[hashedKey].push([key, value]);
        this.size++;
      } else {
        // else check if key already in bucket
        let bucket = this.buckets[hashedKey];
        // function returns node if key exists, false otherwise
        const getNode = (bucket, i = 0) => {
          if (bucket.value[0] === key) return bucket;
          if (!bucket.next) return false;
          i++;
          return getNode(bucket.next, i);
        };
        let bucketItem = getNode(bucket.head);
        if (bucketItem) {
          // if key already exists: overwrite value
          let itemKey = bucketItem.value[0];
          let itemVal = bucketItem.value[1];
          if (log) console.log(`Updating [${itemKey}: ${itemVal}] to [${key}: ${value}]`);
          bucketItem.value[1] = value;
        } else {
          // else append new [key: value] pair to list
          if (log) console.log(`Adding [${key}: ${value}]`);
          bucket.push([key, value]);
          this.size++;
        }
      }
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
   * @param {boolean} log If true, logs [key: value] pair to console
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
    };
    return getValue(bucket.head);
  };
  /**
   * Checks if the specified key is contained in the hash map
   * @param {string} key The key to search for
   * @returns {boolean} True if key is in map, false if not
   */
  has = (key, log) => {
    let hashedKey = this.hash(key);
    let bucket = this.buckets[hashedKey];
    const hasKey = (bucket, i = 0) => {
      if (bucket.value[0] === key) {
        if (log) console.log(`[${key}] is in bucket ${hashedKey} at location ${i}`);
        return [hashedKey, i];
      }
      if (!bucket.next) {
        if (log) console.log(`[${key}] is not in hash map`);
        return false;
      }
      i++;
      return hasKey(bucket.next, i);
    };
    return hasKey(bucket.head);
  };
  /**
   * Remove the specified key/value pair from the map.
   * @param {any} key Key of the pair to be removed
   * @param {boolean} log If true, logs actions to the console
   * @returns {boolean} True if key removed from map, false if key does not exists
   */
  remove = (key, log) => {
    let has = this.has(key);
    if (has) {
      let bucket = this.buckets[has[0]];
      console.log(bucket.size)
      if (bucket.size < 2) {
        this.buckets[has[0]] = undefined;
      } else {
        bucket.removeNodeAt(has[1]);
      }
      this.size--;
      if (log) console.log(`[${key}] removed from bucket[${has[0]}]`);
      return true;
    } else {
      if (log) console.log(`[${key}] is not in map`);
      return false;
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
   * Build an array of all [key: value] pairs stored in the hash map
   * @param {boolean} log If true, log the pairs to the console
   * @returns {Array} The array of [key: value] pairs
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
      console.log('[key: value] Pairs:');
      for (let i = 0; i < array.length; i++) {
        console.log(array[i]);
      }
    }
    return array;
  };
  /**
   * Removes all entries from the hash map.
   * @param {boolean} log If true, logs process to the console
   */
  clear = (log) => {
    if (log) console.log('Clearing buckets...');
    this.buckets = Array(this.capacity);
    this.size = 0;
    if (log) this.checkBuckets();
  };
  /**
   * Log the contents of the hash map buckets to the console.
   */
  checkBuckets = () => {
    for (let i = 0; i < this.buckets.length; i++) {
      console.log(`Bucket${i}: ${this.buckets[i]}`);
    }
  };
}

export { HashMap };

// write remove method ||
// refactor code to avoid repetition
// rescale array when load factor exceeds value
