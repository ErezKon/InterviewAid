# 2078. Two Furthest Houses With Different Colors

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/two-furthest-houses-with-different-colors](https://leetcode.com/problems/two-furthest-houses-with-different-colors)
**Companies:** Amazon, Bloomberg, Google, Meta, Visa

---

## Problem Description
You are given an array `colors` where `colors[i]` is the color of the i‑th house on a straight street. Find the maximum distance between two houses that have different colors. The distance is the absolute difference of their indices.

## Examples
**Example 1:**
Input: `colors = [1,1,1,6,1,1,1]`
Output: `3`
Explanation: The furthest pair of houses with different colors is house 0 (color 1) and house 3 (color 6), distance `3`.

**Example 2:**
Input: `colors = [1,8,3,8,3]`
Output: `4`
Explanation: House 0 (color 1) and house 4 (color 3) are the furthest different‑color pair.

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
