# 1215. Stepping Numbers

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/stepping-numbers](https://leetcode.com/problems/stepping-numbers)
**Companies:** Epic Systems

---

## Problem Description
A *stepping number* is an integer where the absolute difference between every pair of adjacent digits is exactly `1`. Given two integers `low` and `high`, return a sorted list of all stepping numbers in the inclusive range `[low, high]`.

Constraints: `0 <= low <= high <= 10^9`.

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| `low = 0`, `high = 21` | `[0,1,2,3,4,5,6,7,8,9,10,12,21]` | All numbers whose adjacent digits differ by 1.
| `low = 10`, `high = 15` | `[10,12]` | `11` is not a stepping number because adjacent digits differ by 0.

## Approach
Perform a breadth‑first search (BFS) starting from each digit `1‑9` (and `0` if within range). For a current number `num`, generate next candidates by appending `lastDigit ± 1`. Stop expanding when the new number exceeds `high`. Collect numbers that fall within `[low, high]`.

## Walkthrough
For `low = 0`, `high = 21`:
1. Initialize queue with `0‑9`.
2. Dequeue `1`; last digit `1` → candidates `10` and `12`. Enqueue them.
3. Dequeue `2`; candidates `21` and `23` (discard `23` > 21).
4. Continue until queue empty. Collected numbers within range are the output list.

## Complexity Analysis
- Time: `O(k)` where `k` is the total number of generated stepping numbers (bounded by ~10·log10(high)).
- Space: `O(k)` for the queue and result list.

## Follow-Up Questions
1. How would you modify the algorithm to count stepping numbers instead of listing them?
2. Can the solution be adapted for a different digit‑difference rule (e.g., difference ≤ 2)?
3. What is the impact on complexity if `high` can be as large as `10^18`?

## Key Takeaway
A BFS that expands numbers digit by digit using the ±1 rule efficiently enumerates all stepping numbers within a range.
