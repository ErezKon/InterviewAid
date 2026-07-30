# 1769. Minimum Number of Operations to Move All Balls to Each Box

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-operations-to-move-all-balls-to-each-box](https://leetcode.com/problems/minimum-number-of-operations-to-move-all-balls-to-each-box)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Tiktok

---

## Problem Description
You are given a binary string `boxes` of length `n`, where `boxes[i]` is `'1'` if the `i`‑th box contains a ball and `'0'` otherwise. In one operation you can move a ball from box `i` to an adjacent box `i‑1` or `i+1`. Return an array `answer` of length `n` where `answer[i]` is the minimum number of operations required to move **all** balls to box `i`.

## Examples
**Example 1:**
```
Input: boxes = "110"
Output: [1,1,3]
Explanation:
- To gather all balls at box 0: move ball from box 1 → 0 (1 operation).
- To gather at box 1: move ball from box 0 → 1 (1 operation).
- To gather at box 2: move ball from box 0 → 2 (2 ops) and from box 1 → 2 (1 op) → total 3.
```
**Example 2:**
```
Input: boxes = "001011"
Output: [5,5,3,3,3,5]
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
