# 705. Design HashSet

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/design-hashset](https://leetcode.com/problems/design-hashset)
**Companies:** Amazon, Bloomberg, Google, Marqeta, Meta, Wix

---

## Problem Description

Design a HashSet without built-in hash table libraries. Support `add`, `remove`, `contains`.

---

## Examples

**Example 1:**
```
MyHashSet hashSet = new MyHashSet();
hashSet.add(1);      // Inserts 1 into the set.
hashSet.add(2);      // Inserts 2 into the set.
hashSet.contains(1); // Returns true (1 is present).
hashSet.contains(3); // Returns false (3 is not present).
hashSet.add(2);      // 2 is already present, set remains unchanged.
hashSet.remove(2);   // Removes 2 from the set.
hashSet.contains(2); // Returns false, as 2 was removed.
```

**Explanation:** The operations demonstrate typical usage of a hash set: insertion, lookup, and deletion.

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