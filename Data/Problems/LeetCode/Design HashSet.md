# 705. Design HashSet

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/design-hashset](https://leetcode.com/problems/design-hashset)
**Companies:** Amazon, Bloomberg, Google, Marqeta, Meta, Wix

---

## Problem Description

Design a HashSet without using any built-in hash table libraries.

Implement `MyHashSet` class:

- `void add(key)` Inserts the value `key` into the HashSet.
- `bool contains(key)` Returns whether the value `key` exists in the HashSet or not.
- `void remove(key)` Removes the value `key` in the HashSet. If `key` does not exist in the HashSet, do nothing.

**Constraints:**

- `0 <= key <= 10^6`
- At most `10^4` calls will be made to `add`, `remove`, and `contains`.

---

## Examples

```
Example 1:
  Input:
  ["MyHashSet", "add", "add", "contains", "contains", "add", "contains", "remove", "contains"]
  [[], [1], [2], [1], [3], [2], [2], [2], [2]]
  Output:
  [null, null, null, true, false, null, true, null, false]
  Explanation:
  MyHashSet myHashSet = new MyHashSet();
  myHashSet.add(1);      // set = [1]
  myHashSet.add(2);      // set = [1, 2]
  myHashSet.contains(1); // return True
  myHashSet.contains(3); // return False, (not found)
  myHashSet.add(2);      // set = [1, 2]
  myHashSet.contains(2); // return True
  myHashSet.remove(2);   // set = [1]
  myHashSet.contains(2); // return False, (already removed)
```

---

## Walkthrough

| Step | Operation | Internal State (Buckets) |
|------|-----------|--------------------------|
| 1 | `add(1)` | Bucket[1 % 1000] now contains `[1]` |
| 2 | `add(2)` | Bucket[2 % 1000] now contains `[2]` |
| 3 | `contains(1)` | Checks Bucket[1] → finds `1` → **true** |
| 4 | `contains(3)` | Checks Bucket[3] → empty → **false** |
| 5 | `add(2)` (duplicate) | Bucket[2] already has `2`; no change |
| 6 | `remove(2)` | Bucket[2] becomes empty |
| 7 | `contains(2)` | Checks Bucket[2] → empty → **false** |

The table shows how each operation maps the key to a bucket using the modulo hash function and updates or queries that bucket.

---

## Approach

```
CLASS MyHashSet:
    CONSTRUCTOR:
        buckets = [[] for _ in range(1000)]

    FUNCTION hash(key): RETURN key % 1000

    FUNCTION add(key):
        bucket = buckets[hash(key)]
        IF key NOT IN bucket: bucket.ADD(key)

    FUNCTION remove(key):
        bucket = buckets[hash(key)]
        IF key IN bucket: bucket.REMOVE(key)

    FUNCTION contains(key):
        RETURN key IN buckets[hash(key)]
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n/k) average per operation, k = bucket count |
| **Space** | O(k + n) |

---

## Key Takeaway

> **Array of buckets with chaining. Hash function maps key to bucket index. Same principle as HashMap but stores keys only (no values). Choose bucket count to balance load.**