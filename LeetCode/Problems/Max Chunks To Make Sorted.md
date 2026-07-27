# 769. Max Chunks To Make Sorted

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/max-chunks-to-make-sorted](https://leetcode.com/problems/max-chunks-to-make-sorted)
**Companies:** Amazon, Apple, Bloomberg, Google, Meta, Microsoft, Poshmark

---

## 1. Problem Description

Split a permutation of `[0, n-1]` into maximum chunks such that sorting each chunk gives the sorted array.

---

## 2. Approach: Track Max — O(n) ✅

```
FUNCTION maxChunksToSorted(arr):
    chunks = 0
    maxSoFar = 0
    FOR i, val IN enumerate(arr):
        maxSoFar = MAX(maxSoFar, val)
        IF maxSoFar == i: chunks += 1
    RETURN chunks
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## 3. Key Takeaway

> In a permutation of 0..n-1, a chunk boundary at index `i` exists iff `max(arr[0..i]) == i`. This means all values 0..i are contained in arr[0..i].
