# 2078. Two Furthest Houses With Different Colors

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/two-furthest-houses-with-different-colors](https://leetcode.com/problems/two-furthest-houses-with-different-colors)
**Companies:** Amazon, Bloomberg, Google, Meta, Visa

---

## Problem Description

There are `n` houses evenly lined up on the street, and each house is beautifully painted. You are given a **0-indexed** integer array `colors` of length `n`, where `colors[i]` represents the color of the `i`th house.

Return *the **maximum** distance between **two** houses with **different** colors*.

The distance between the `i`th and `j`th houses is `abs(i - j)`, where `abs(x)` is the **absolute value** of `x`.

**Constraints:**
- `n == colors.length`
- `2 <= n <= 100`
- `0 <= colors[i] <= 100`
- Test data are generated such that **at least** two houses have different colors.

## Examples

**Example 1:**
```
Input: colors = [1,1,1,6,1,1,1]
Output: 3
Explanation: In the above image, color 1 is blue, and color 6 is red.
The furthest two houses with different colors are house 0 and house 3.
House 0 has color 1, and house 3 has color 6. The distance between them is abs(0 - 3) = 3.
Note that houses 3 and 6 can also produce the optimal answer.
```

**Example 2:**
```
Input: colors = [1,8,3,8,3]
Output: 4
Explanation: In the above image, color 1 is blue, color 8 is yellow, and color 3 is green.
The furthest two houses with different colors are house 0 and house 4.
House 0 has color 1, and house 4 has color 3. The distance between them is abs(0 - 4) = 4.
```

**Example 3:**
```
Input: colors = [0,1]
Output: 1
Explanation: The furthest two houses with different colors are house 0 and house 1.
House 0 has color 0, and house 1 has color 1. The distance between them is abs(0 - 1) = 1.
```

## Approach
The maximum distance will involve either the leftmost house with a color different from the rightmost house, or vice‑versa. Scan from the left to find the first index `i` where `colors[i] != colors[n-1]`; distance = `n-1-i`. Scan from the right to find the first index `j` where `colors[j] != colors[0]`; distance = `j`. The answer is the maximum of these two distances.

## Walkthrough
| Scan direction | Condition | Index found | Distance |
|----------------|-----------|------------|----------|
| Left → right  | `colors[i] != colors[n-1]` | `i = 0` (if different) else next differing index | `n-1-i` |
| Right → left  | `colors[j] != colors[0]`   | `j = n-1` (if different) else previous differing index | `j` |
Take the larger of the two distances.

## Complexity Analysis
- **Time:** `O(n)` single pass from both ends.
- **Space:** `O(1)` extra variables.

## Follow‑Up Questions
1. How would you modify the solution if you needed the pair of indices, not just the distance?
2. What if the street is circular (wrap‑around) – how does the problem change?
3. Can you solve it using a single pass without storing `n`?

## Key Takeaway
The furthest differing‑color houses must include one endpoint of the array; checking the first mismatch from each end yields the answer in linear time.
