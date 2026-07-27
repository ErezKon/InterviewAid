# 771. Jewels and Stones

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/jewels-and-stones](https://leetcode.com/problems/jewels-and-stones)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Yandex

---

## 1. Problem Description

Given a string `jewels` (each char is a jewel type) and a string `stones` (each char is a stone you have), count how many of your stones are jewels.

---

## 2. Approach: Hash Set — O(m+n) ✅

```
FUNCTION numJewelsInStones(jewels, stones):
    jewelSet = SET(jewels)
    RETURN SUM(1 for s in stones if s in jewelSet)
```

| Time | Space |
|------|-------|
| O(m + n) | O(m) where m = len(jewels) |

---

## 3. Key Takeaway

> Convert jewels to a set for O(1) lookup, then count matches in stones. A classic "hash set for membership testing" warm-up problem.
