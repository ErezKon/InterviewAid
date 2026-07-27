# 705. Design HashSet

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/design-hashset](https://leetcode.com/problems/design-hashset)
**Companies:** Amazon, Bloomberg, Google, Marqeta, Meta, Wix

---

## Problem Description

Design a HashSet without built-in hash table libraries. Support `add`, `remove`, `contains`.

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
