# 1431. Kids With the Greatest Number of Candies

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/kids-with-the-greatest-number-of-candies](https://leetcode.com/problems/kids-with-the-greatest-number-of-candies)
**Companies:** Amazon, Bloomberg, Google, Infosys, Meta, Microsoft

---

## 1. Problem Description

Given `candies[i]` (each kid's count) and `extraCandies`, return a boolean array where `result[i]` is `true` if giving all extra candies to kid `i` makes them have the greatest (or tied) count.

---

## 2. Approach — O(n) ✅

```
FUNCTION kidsWithCandies(candies, extraCandies):
    maxCandies = MAX(candies)
    RETURN [c + extraCandies >= maxCandies for c in candies]
```

| Time | Space |
|------|-------|
| O(n) | O(n) output |

---

## 3. Key Takeaway

> Find the current max, then check each kid: `candies[i] + extraCandies >= max`. One-liner solution.
