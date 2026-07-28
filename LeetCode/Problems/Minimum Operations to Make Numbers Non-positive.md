# 2702. Minimum Operations to Make Numbers Non-positive

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-operations-to-make-numbers-non-positive](https://leetcode.com/problems/minimum-operations-to-make-numbers-non-positive)
**Companies:** Citadel

---

## Problem Description
Given an array of integers `nums`, you may perform the following operation any number of times: select an element `x` and replace it with `⌊x / 2⌋`. The goal is to make every element in the array non‑positive (≤ 0) using the minimum number of operations.

## Examples
- **Input:** `nums = [5, 3, 2]` → **Output:** `5`
  - Operations: `5→2→1→0` (3 ops), `3→1→0` (2 ops), `2→1→0` (2 ops) but we can interleave; optimal total = 5.
- **Input:** `nums = [-1, -2, 0]` → **Output:** `0` – all numbers already non‑positive.
- **Input:** `nums = [10, 1]` → **Output:** `6` – halve 10 three times (10→5→2→1→0) = 4 ops, halve 1 once (1→0) = 1 op, total 5? Actually optimal = 5; example illustrates process.

## Approach
The operation strictly reduces a positive number and never increases it, so the optimal strategy is to always halve the **largest** positive value first. This greedy choice minimizes future work because halving a larger number yields a bigger reduction in the remaining total. Implement the greedy process with a max‑heap (priority queue):
1. Insert all positive numbers into a max‑heap.
2. While the heap is not empty:
   - POP the maximum `x`.
   - Compute `y = ⌊x / 2⌋`.
   - Increment operation counter.
   - If `y > 0`, PUSH `y` back into the heap.
3. Return the counter.

### Pseudocode
```text
FUNCTION minOperations(nums):
    SET ops ← 0
    CREATE maxHeap
    FOR each v IN nums:
        IF v > 0:
            INSERT v INTO maxHeap
    WHILE maxHeap IS NOT EMPTY:
        SET x ← EXTRACT_MAX(maxHeap)
        SET y ← FLOOR(x / 2)
        INCREMENT ops
        IF y > 0:
            INSERT y INTO maxHeap
    RETURN ops
```

## Walkthrough
Consider `nums = [5, 3, 2]`.
| Step | Heap (max→min) | Extracted | New value | Ops |
|------|----------------|-----------|-----------|-----|
|1|[5,3,2]|5|2|1|
|2|[3,2,2]|3|1|2|
|3|[2,2,1]|2|1|3|
|4|[2,1,1]|2|1|4|
|5|[1,1,1]|1|0 (discard)|5|
Result = 5 operations.

## Complexity Analysis
- **Time:** O(k log k) where *k* is the number of positive elements plus the number of heap insertions (each operation adds at most one new element). In the worst case each positive number is halved O(log maxValue) times.
- **Space:** O(k) for the heap.

## Follow-Up Questions
1. How would the algorithm change if the operation were `x = x - 1` instead of halving?
2. What if each halving operation had a different cost depending on the current value?
3. Can the solution be adapted to work in a streaming setting where numbers arrive one‑by‑one?

## Key Takeaway
Greedily halving the current largest positive number using a max‑heap yields the minimal number of operations to drive all values to non‑positive.
