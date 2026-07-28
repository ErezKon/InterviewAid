# 2208. Minimum Operations to Halve Array Sum

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-operations-to-halve-array-sum](https://leetcode.com/problems/minimum-operations-to-halve-array-sum)
**Companies:** Microsoft, Oracle

---

## Problem Description
Given an array of positive integers `nums`, you may perform the following operation any number of times: select an element `x` and replace it with `⌊x / 2⌋`. Determine the minimum number of operations required to reduce the sum of the array to **at most half** of its original sum.

## Examples
- **Input:** `nums = [5,19,8,1]`  
  **Output:** `3`  
  **Explanation:** Reduce 19 → 9 (1 op), 9 → 4 (2 ops), 5 → 2 (3 ops). The new sum is `2+4+8+1 = 15`, which is ≤ half of the original sum `33`.
- **Input:** `nums = [3,8,20]`  
  **Output:** `3`

## Approach
**Greedy – Max‑Heap of Potential Reductions**  
The operation that yields the largest reduction in the total sum should be applied first. Each element contributes a reduction of `x - ⌊x/2⌋`. By storing the current value of each element in a max‑heap keyed by its reduction, we repeatedly extract the element with the greatest reduction, apply the operation, push the new value back, and update the running sum.

```
text
FUNCTION minOperations(nums):
    SET target ← SUM(nums) / 2
    SET currentSum ← SUM(nums)
    CREATE maxHeap ← empty
    FOR each x IN nums:
        INSERT (x - FLOOR(x/2), x) INTO maxHeap   // store reduction and current value
    SET ops ← 0
    WHILE currentSum > target:
        SET (reduction, val) ← EXTRACT_MAX(maxHeap)
        SET currentSum ← currentSum - reduction
        SET newVal ← FLOOR(val / 2)
        INSERT (newVal - FLOOR(newVal/2), newVal) INTO maxHeap
        INCREMENT ops
    RETURN ops
```

## Walkthrough
| Step | Array (values) | Sum | Operation | Reduction |
|------|----------------|-----|-----------|-----------|
| 0 | `[5,19,8,1]` | 33 | – | – |
| 1 | `[5,9,8,1]` | 23 | halve 19 → 9 | 10 |
| 2 | `[5,4,8,1]` | 18 | halve 9 → 4 | 5 |
| 3 | `[2,4,8,1]` | 15 | halve 5 → 2 | 3 |

The sum 15 ≤ 33/2, so 3 operations are sufficient.

## Complexity Analysis
- **Time:** Each heap operation costs `O(log n)`. In the worst case we perform `k` operations, where `k` is the answer, so `O(k log n)`.
- **Space:** `O(n)` for the heap.

## Follow‑Up Questions
1. How would the solution change if the operation could replace `x` with `⌈x/2⌉`?
2. What if each operation had a cost proportional to the value reduced?
3. Can the same greedy strategy be applied when halving is replaced by any other fractional reduction?

## Key Takeaway
Greedy selection of the element that yields the largest immediate reduction, implemented via a max‑heap, yields the optimal minimal number of operations.
