# 1431. Kids With the Greatest Number of Candies

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/kids-with-the-greatest-number-of-candies](https://leetcode.com/problems/kids-with-the-greatest-number-of-candies)
**Companies:** Amazon, Bloomberg, Google, Infosys, Meta, Microsoft

---

## 1. Problem Description

There are `n` kids with candies. You are given an integer array `candies`, where each `candies[i]` represents the number of candies the `i^th` kid has, and an integer `extraCandies`, denoting the number of extra candies that you have.

Return *a boolean array *`result`* of length *`n`*, where *`result[i]`* is *`true`* if, after giving the *`i^th`* kid all the *`extraCandies`*, they will have the **greatest** number of candies among all the kids**, or *`false`* otherwise*.

Note that **multiple** kids can have the **greatest** number of candies.

**Constraints:**
- `n == candies.length`
- `2 <= n <= 100`
- `1 <= candies[i] <= 100`
- `1 <= extraCandies <= 50`

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

**Example 1:**
```
Input: candies = [2,3,5,1,3], extraCandies = 3
Output: [true,true,true,false,true]
Explanation: If you give all extraCandies to:
- Kid 1, they will have 2 + 3 = 5 candies, which is the greatest among the kids.
- Kid 2, they will have 3 + 3 = 6 candies, which is the greatest among the kids.
- Kid 3, they will have 5 + 3 = 8 candies, which is the greatest among the kids.
- Kid 4, they will have 1 + 3 = 4 candies, which is not the greatest among the kids.
- Kid 5, they will have 3 + 3 = 6 candies, which is the greatest among the kids.
```

**Example 2:**
```
Input: candies = [4,2,1,1,2], extraCandies = 1
Output: [true,false,false,false,false]
Explanation: There is only 1 extra candy.
Kid 1 will always have the greatest number of candies, even if a different kid is given the extra candy.
```

**Example 3:**
```
Input: candies = [12,1,12], extraCandies = 10
Output: [true,false,true]
```

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
