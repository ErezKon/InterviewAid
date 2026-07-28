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

## 3. Examples

| candies | extraCandies | Output |
|---------|--------------|--------|
| [2,3,5,1,3] | 3 | [true,true,true,false,true] |
| [4,2,1,1,2] | 1 | [true,false,false,false,false] |

*Explanation:* After adding `extraCandies` to each kid, compare with the maximum candy count.

---

## 4. Walkthrough

Consider the first example `[2,3,5,1,3]` with `extraCandies = 3`.

1. Compute `maxCandies = 5`.
2. Kid 0: `2 + 3 = 5` → `true`.
3. Kid 1: `3 + 3 = 6` → `true`.
4. Kid 2: `5 + 3 = 8` → `true`.
5. Kid 3: `1 + 3 = 4` → `false`.
6. Kid 4: `3 + 3 = 6` → `true`.

Result matches the output array.

---

## 5. Complexity Analysis

| Metric | Value |
|--------|-------|
| Time   | O(n) – one pass to find max and another pass to build result |
| Space  | O(n) – output array (ignores input storage) |

---

## 6. Follow-Up Questions

- How would you modify the solution if each kid could receive a different amount of extra candies?
- Can you solve the problem in-place without allocating a new result array?

---

## Key Takeaway

> Find the current max, then check each kid: `candies[i] + extraCandies >= max`. One-liner solution.
