# 432. All O`one Data Structure

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/all-oone-data-structure](https://leetcode.com/problems/all-oone-data-structure)
**Companies:** Airbnb, Amazon, Apple, Atlassian, Bloomberg, Google, Linkedin, Meta, Microsoft, Nextdoor, Uber

---

## Problem Description
Design a data structure that supports inserting keys, incrementing/decrementing their counts, and retrieving a key with maximal or minimal count, all in O(1) time.

## Examples
**Example 1:**
```
AllOne obj = new AllOne();
obj.inc("apple");      // "apple" count is 1
obj.inc("apple");      // "apple" count becomes 2
obj.inc("banana");     // "banana" count is 1
obj.dec("apple");      // "apple" count becomes 1
obj.getMaxKey();        // returns "apple" or "banana" (both have count 1)
obj.getMinKey();        // returns "apple" or "banana"
```
*Explanation:* After the operations, both keys have the same count, so either can be returned.

**Example 2:**
```
AllOne obj = new AllOne();
obj.inc("dog");
obj.inc("cat");
obj.inc("dog");
obj.dec("cat");
obj.getMaxKey(); // returns "dog" (count 2)
obj.getMinKey(); // returns "dog" (only key left)
```
*Explanation:* "cat" is removed after decrement, leaving only "dog".

## Operations
- `inc(key)`: Increment the count of `key`. If `key` does not exist, insert it with count 1.
- `dec(key)`: Decrement the count of `key`. If the count becomes 0, remove the key.
- `getMaxKey()`: Return any key with the highest count.
- `getMinKey()`: Return any key with the lowest count.

## Approach
**Algorithm:** Combine a doubly linked list of count‑buckets with hash maps.
1. Each bucket node stores a count value and a set of keys having that count.
2. Maintain a hash map `key → bucketNode` for O(1) access to a key's bucket.
3. `inc(key)`:
   - If key absent, place it in the bucket with count 1 (create if needed).
   - Otherwise move the key to the next bucket (count + 1), creating that bucket if missing.
   - Remove the old bucket if it becomes empty.
4. `dec(key)`:
   - Locate the key's bucket, move it to the previous bucket (count - 1) or delete if count becomes 0.
   - Clean up empty buckets.
5. `getMaxKey()`: Return any key from the tail bucket (largest count).
6. `getMinKey()`: Return any key from the head bucket (smallest count).

## Walkthrough
| Step | Action | Affected Buckets |
|------|--------|------------------|
| 1 | `inc("apple")` (new) | Create bucket 1 → {"apple"}
| 2 | `inc("apple")` | Move "apple" to bucket 2, delete bucket 1 if empty
| 3 | `inc("banana")` (new) | Bucket 1 created → {"banana"}
| 4 | `dec("apple")` | Move "apple" back to bucket 1, now both keys share count 1
| 5 | `getMaxKey()` | Returns any key from tail bucket (count 1)

## Complexity Analysis
- **Time:** O(1) for each operation because all structures are hash‑based and bucket navigation is constant.
- **Space:** O(N) for storing N distinct keys plus bucket overhead.

## Follow‑Up Questions
1. How would you extend the structure to support `getRandomKey()` in O(1)?
2. Can the design be adapted for a multiset where duplicate keys are allowed?
3. What changes are needed if counts can be negative?

## Key Takeaway
A doubly linked list of count buckets paired with a key‑to‑bucket map enables true O(1) updates and retrieval of min/max keys.

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