'use strict';

import { LinkedList } from './LinkedList';

/**
 * Create a hash map to store key value pairs.
 *
 * Methods:
 *
 * set()
 *
 * get()
 *
 * has()
 *
 * remove()
 *
 * length()
 *
 * keys()
 *
 * values()
 *
 * entries()
 *
 * clear()
 *
 * checkBuckets()
 *
 * checkLoad()
 * @param {number} loadFactor If the ratio of stored items to total capacity exceeds this value it will trigger a doubling of the hash map buckets array size (Default: 0.75)
 * @param {number} capacity The initial size of the hash map buckets array (Default: 16)
 * @returns {Object} A new instance of HashMap
 */
class HashMap {
  constructor(loadFactor = 0.75, capacity = 16) {
    this.loadFactor = loadFactor;
    this.capacity = capacity;
    this.buckets = Array(this.capacity);
    this.size = 0;
    this.tI = 0;
    this.resizing = false;
    return this;
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
  set = (k, value, log) => {
    const key = String(k);
    let hashedKey = this.hash(key);
    // use a linked list to deal with collisions
    // if bucket is empty, create new linked list and append [key: value] pair
    if (!this.outOfBounds(hashedKey)) {
      const bId = hashedKey;
      if (!this.buckets[hashedKey]) {
        if (log) console.log('Bucket is empty, creating new linked list');
        this.buckets[hashedKey] = new LinkedList();
        if (log) console.log(`Appending [${key}: ${value}] to bucket${bId}`);
        this.buckets[hashedKey].push([key, value]);
        this.size++;
        if (!this.resizing) {
          const load = this.checkLoad(log);
          this.resize(load, true);
        }
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
          if (log)
            console.log(
              `Updating [${itemKey}: ${itemVal}] to [${key}: ${value}] in bucket${bId}`,
            );
          bucketItem.value[1] = value;
        } else {
          // else append new [key: value] pair to list
          if (log) console.log(`Adding [${key}: ${value}] to bucket${bId}`);
          bucket.push([key, value]);
          this.size++;
          if (!this.resizing) {
            const load = this.checkLoad(log);
            this.resize(load, true);
          }
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
    // function to check if key is stored in hash map
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
    if (bucket) {
      return hasKey(bucket.head);
    } else {
      if (log) console.log(`[${key}] is not in hash map`);
      return false;
    }
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
  /**
   * Check the current loading factor of the hash map
   * @param {boolean} log If true, logs actions to the console
   * @returns {number} The current loading factor of the hash map
   */
  checkLoad = (log) => {
    const load = this.size / this.capacity;
    if (log) console.log(`Load: ${load}`);
    return load;
  };
  /**
   * Double buckets array capacity if load exceeds load factor to avoid collisions.
   * @param {number} load The current load factor
   * @param {boolean} log If true, log operations to the console
   * @returns {boolean} True if buckets resized, false if not
   */
  resize = (load, log) => {
    if (load > this.loadFactor) {
      console.log('Hash Map Overload: Resizing...');
      this.resizing = true;
      let temp = [];
      // function to move key value pairs to temporary array
      const moveToTemp = (node) => {
        temp[this.tI] = node.value;
        this.tI++;
        if (!node.next) return null;
        return moveToTemp(node.next);
      };
      // move key value pairs to temp
      for (let i = 0; i < this.capacity; i++) {
        let bucket = this.buckets[i];
        if (bucket) {
          moveToTemp(bucket.head);
        }
      }
      // create new buckets array with double capacity
      this.capacity *= 2;
      this.buckets = Array(this.capacity);
      // move key value pairs from temp to new buckets
      let size = this.size;
      this.size = 0;
      for (let i = 0; i < size; i++) {
        let key = temp[i][0];
        let value = temp[i][1];
        this.set(key, value, false);
      }
      // reset temp
      this.resizing = false;
      this.tI = 0;
      temp = undefined;
      const load = this.size / this.capacity;
      if (log) console.log(`New Capacity: ${this.capacity}`);
      if (log) console.log(`New Load: ${load}`);
    }
  };
}

export { HashMap };
