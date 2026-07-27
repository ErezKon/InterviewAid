# 2220. Minimum Bit Flips to Convert Number

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/minimum-bit-flips-to-convert-number](https://leetcode.com/problems/minimum-bit-flips-to-convert-number)
**Companies:** Amazon, Bloomberg, Google, Ibm, Meta, Microsoft, Persistent Systems

---

## Key Insight

> XOR of two numbers gives 1 in every bit position where they differ. Count the set bits of `start ^ goal`.

---

## Approach

```
FUNCTION minBitFlips(start, goal):
    RETURN POPCOUNT(start XOR goal)
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| XOR + popcount | **O(1)** | **O(1)** |

---

## Key Takeaway

> **XOR highlights differences** — `a ^ b` sets exactly the bits that need flipping. Count them.

---
