# 461. Hamming Distance

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/hamming-distance](https://leetcode.com/problems/hamming-distance)
**Companies:** Amazon, Bloomberg, Google, Meta

---

## 1. Problem Description

Return the Hamming distance between two integers — the number of bit positions where they differ.

## 2. Approach: XOR + Popcount — O(1) ✅

```
FUNCTION hammingDistance(x, y):
    RETURN bin(x ^ y).count('1')
```

## Key Takeaway

> XOR produces 1s where bits differ. Count the 1s (popcount) for the Hamming distance.
