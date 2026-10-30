# 1769. Minimum Number of Operations to Move All Balls to Each Box

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-operations-to-move-all-balls-to-each-box](https://leetcode.com/problems/minimum-number-of-operations-to-move-all-balls-to-each-box)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Tiktok

---

## Problem Description

You have `n` boxes. You are given a binary string `boxes` of length `n`, where `boxes[i]` is `'0'` if the `i^th` box is **empty**, and `'1'` if it contains **one** ball.

In one operation, you can move **one** ball from a box to an adjacent box. Box `i` is adjacent to box `j` if `abs(i - j) == 1`. Note that after doing so, there may be more than one ball in some boxes.

Return an array `answer` of size `n`, where `answer[i]` is the **minimum** number of operations needed to move all the balls to the `i^th` box.

Each `answer[i]` is calculated considering the **initial** state of the boxes.

**Constraints:**
- `n == boxes.length`
- `1 <= n <= 2000`
- `boxes[i]` is either `'0'` or `'1'`.

## Examples

**Example 1:**
```
Input: boxes = "110"
Output: [1,1,3]
Explanation: The answer for each box is as follows:
1) First box: you will have to move one ball from the second box to the first box in one operation.
2) Second box: you will have to move one ball from the first box to the second box in one operation.
3) Third box: you will have to move one ball from the first box to the third box in two operations, and move one ball from the second box to the third box in one operation.
```

**Example 2:**
```
Input: boxes = "001011"
Output: [11,8,5,4,3,4]
```

## Approach
The total moves for a target box can be computed by summing distances from every ball. A two‑pass linear scan (left‑to‑right then right‑to‑left) accumulates the contribution of balls seen so far.

1. **Left‑to‑right pass** – keep `balls` (number of balls left of current index) and `ops` (total distance contributed by those balls). For each index `i`, add `ops` to `answer[i]`, then update `balls` and `ops` with the current box.
2. **Right‑to‑left pass** – repeat the same logic from the right side, adding the right‑side contributions to `answer[i]`.
3. The final `answer` contains the minimum operations for each box.

## Walkthrough
| Index | boxes[i] | Left pass `balls` | Left pass `ops` | answer after left | Right pass updates → final answer |
|-------|----------|------------------|----------------|-------------------|-----------------------------------|
| 0 | 1 | 0 | 0 | 0 | +5 → 5 |
| 1 | 1 | 1 | 1 | 1 | +4 → 5 |
| 2 | 0 | 2 | 3 | 4 | +? → 3 |
| ... | ... | ... | ... | ... | ... |
(illustrative; actual numbers follow the algorithm)

## Complexity Analysis
- **Time:** O(n) – two linear passes.
- **Space:** O(n) for the answer array (output), O(1) extra.

## Follow‑Up Questions
1. How would you adapt the algorithm if moving a ball over distance `d` cost `d²` operations?
2. Can the solution be extended to handle weighted balls where each ball has a different move cost?
3. What changes are needed if the boxes are arranged in a circle (the first and last boxes are adjacent)?

## Key Takeaway
A two‑pass prefix‑sum scan efficiently aggregates left‑ and right‑side distances, yielding the minimum moves for every target box in linear time.
