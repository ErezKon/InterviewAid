# 432. All O'one Data Structure

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/all-oone-data-structure](https://leetcode.com/problems/all-oone-data-structure)
**Companies:** Airbnb, Amazon, Apple, Atlassian, Bloomberg, Google, Linkedin, Meta, Microsoft, Nextdoor, Uber

---

## Problem Description
Design a data structure to store the strings' count with the ability to return the strings with minimum and maximum counts.

Implement the `AllOne` class:

- `AllOne()` Initializes the object of the data structure.
- `inc(String key)` Increments the count of the string `key` by `1`. If `key` does not exist in the data structure, insert it with count `1`.
- `dec(String key)` Decrements the count of the string `key` by `1`. If the count of `key` is `0` after the decrement, remove it from the data structure. It is guaranteed that `key` exists in the data structure before the decrement.
- `getMaxKey()` Returns one of the keys with the maximal count. If no element exists, return an empty string `""`.
- `getMinKey()` Returns one of the keys with the minimum count. If no element exists, return an empty string `""`.

**Note** that each function must run in `O(1)` average time complexity.

**Constraints:**
- `1 <= key.length <= 10`
- `key` consists of lowercase English letters.
- It is guaranteed that for each call to `dec`, `key` is existing in the data structure.
- At most `5 * 10^4` calls will be made to `inc`, `dec`, `getMaxKey`, and `getMinKey`.

## 2. Examples

```
Example 1:
  Input:
  ["AllOne", "inc", "inc", "getMaxKey", "getMinKey", "inc", "getMaxKey", "getMinKey"]
  [[], ["hello"], ["hello"], [], [], ["leet"], [], []]
  Output:
  [null, null, null, "hello", "hello", null, "hello", "leet"]
  Explanation:
  AllOne allOne = new AllOne();
  allOne.inc("hello");
  allOne.inc("hello");
  allOne.getMaxKey(); // return "hello"
  allOne.getMinKey(); // return "hello"
  allOne.inc("leet");
  allOne.getMaxKey(); // return "hello"
  allOne.getMinKey(); // return "leet"
```

---

## Operations
- `inc(key)`: Increment the count of `key`. If `key` does not exist, insert it with count 1.
- `dec(key)`: Decrement the count of `key`. If the count becomes 0, remove the key.
- `getMaxKey()`: Return any key with the maximal count.
- `getMinKey()`: Return any key with the minimal count.

## Approach
**Algorithm:** Use a doubly linked list of buckets, each bucket representing a distinct count and containing a set of keys with that count, together with a hash map `key → bucket` for O(1) access.
1. **Inc:** If the key is new, place it in the bucket for count 1 (create if absent). Otherwise move it from its current bucket to the next bucket (count + 1), creating that bucket if needed, and delete the old bucket if empty.
2. **Dec:** Locate the key's bucket. If its count is 1, remove the key entirely. Otherwise move it to the previous bucket (count - 1), creating that bucket if needed, and delete the old bucket if empty.
3. **getMaxKey / getMinKey:** Return any key from the tail (max) or head (min) bucket of the linked list.

## Walkthrough
| Step | Operation | Bucket changes |
|------|-----------|----------------|
| 1 | `inc("apple")` (new) | Create bucket 1 → {"apple"}
| 2 | `inc("apple")` | Move "apple" to bucket 2, delete bucket 1 if empty
| 3 | `inc("banana")` (new) | Bucket 1 created → {"banana"}
| 4 | `dec("apple")` | Move "apple" back to bucket 1, now both keys share count 1
| 5 | `getMaxKey()` | Returns any key from tail bucket (count 1)

## Complexity Analysis
- **Time:** O(1) for each operation because all updates involve constant-time hash map lookups and pointer adjustments.
- **Space:** O(N) for storing N distinct keys and their bucket nodes.

## Follow-Up Questions
1. How would you add `getRandomKey()` in O(1) time?
2. Can the structure be extended to support negative counts?
3. What modifications are needed to handle duplicate keys (multiset behavior)?

## Key Takeaway
A doubly linked list of count buckets combined with a key-to-bucket map provides true O(1) updates and min/max retrieval.

---

```text
CLASS AllOne:
    // Bucket node stores count and set of keys
    // Doubly linked list ordered by count
    // Hash map: key → bucket node

    FUNCTION inc(key):
        IF key NOT IN map:
            bucket ← GET_OR_CREATE_BUCKET(1)
            ADD key TO bucket.keys
            map[key] ← bucket
        ELSE:
            curBucket ← map[key]
            nextBucket ← GET_OR_CREATE_BUCKET(curBucket.count + 1)
            MOVE key FROM curBucket.keys TO nextBucket.keys
            map[key] ← nextBucket
            IF curBucket.keys IS EMPTY: REMOVE curBucket

    FUNCTION dec(key):
        curBucket ← map[key]
        IF curBucket.count == 1:
            REMOVE key FROM curBucket.keys
            DELETE map[key]
        ELSE:
            prevBucket ← GET_OR_CREATE_BUCKET(curBucket.count - 1)
            MOVE key FROM curBucket.keys TO prevBucket.keys
            map[key] ← prevBucket
        IF curBucket.keys IS EMPTY: REMOVE curBucket

    FUNCTION getMaxKey():
        IF tailBucket EXISTS: RETURN ANY key FROM tailBucket.keys
        RETURN ""

    FUNCTION getMinKey():
        IF headBucket EXISTS: RETURN ANY key FROM headBucket.keys
        RETURN ""
```