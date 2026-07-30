# 3495. Minimum Operations to Make Array Elements Zero

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-operations-to-make-array-elements-zero](https://leetcode.com/problems/minimum-operations-to-make-array-elements-zero)
**Companies:** Axis Bank, Bloomberg, Google, Meta

---

## Problem Description
Given an array of non‑negative integers `nums`, you may perform the following operation any number of times: choose an index `i` and replace `nums[i]` with `⌊nums[i] / 2⌋`. The operation counts as one step. Determine the minimum total number of operations required to reduce **all** elements of the array to zero.

## Examples
- **Input:** `nums = [3,5,6]`  
  **Output:** `7`  
  **Explanation:** Reduce 6→3 (1), 5→2 (2), 3→1 (3), 3→1 (4), 2→1 (5), 1→0 (6), 1→0 (7). All become zero after 7 operations.
- **Input:** `nums = [0,0,0]`  
  **Output:** `0`

## Approach
**Greedy with Max‑Heap of Reductions**  
Each element contributes a reduction of `x - ⌊x/2⌋` when halved. To minimise total steps, always apply the operation to the element that yields the largest reduction, because it brings the overall sum down fastest. Use a max‑heap storing the current value of each element and its potential reduction. Repeatedly extract the maximum reduction, apply the operation, push the new value back, and increment the operation count until all values become zero.

```
text
FUNCTION minOperations(nums):
    CREATE maxHeap ← empty
    FOR each x IN nums:
        INSERT (x - FLOOR(x/2), x) INTO maxHeap   // reduction, current value
    SET ops ← 0
    WHILE maxHeap NOT EMPTY AND TOP_REDUCTION > 0:
        SET (reduction, val) ← EXTRACT_MAX(maxHeap)
        SET ops ← ops + 1
        SET newVal ← FLOOR(val / 2)
        IF newVal > 0:
            INSERT (newVal - FLOOR(newVal/2), newVal) INTO maxHeap
    RETURN ops
```

## Walkthrough
| Step | Heap (reduction, value) | Operation | New Value | Ops |
|------|--------------------------|-----------|-----------|-----|
| 0 | (3,6), (3,5), (2,3) | – | – | 0 |
| 1 | extract (3,6) → 6→3 | insert (2,3) | – | 1 |
| 2 | heap now (3,5), (2,3), (2,3) | extract (3,5) → 5→2 | insert (1,2) | 2 |
| 3 | … continue until all values 0 |

## Complexity Analysis
- **Time:** Each heap operation is `O(log n)`. The number of operations equals the answer `k`, so `O(k log n)`.
- **Space:** `O(n)` for the heap.

## Follow‑Up Questions
1. How would the algorithm change if the operation replaced `x` with `⌈x/2⌉`?
2. Can we compute the answer directly using bit‑length sums without a heap?
3. What if each halving operation had a different cost per element?

## Key Takeaway
A max‑heap that always picks the element offering the largest immediate reduction yields the minimal number of halving steps to bring all numbers to zero.
