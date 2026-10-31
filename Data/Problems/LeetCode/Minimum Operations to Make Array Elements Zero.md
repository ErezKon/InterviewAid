# 3495. Minimum Operations to Make Array Elements Zero

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-operations-to-make-array-elements-zero](https://leetcode.com/problems/minimum-operations-to-make-array-elements-zero)
**Companies:** Axis Bank, Bloomberg, Google, Meta

---

## Problem Description
You are given a 2D array `queries`, where `queries[i]` is of the form `[l, r]`. Each `queries[i]` defines an array of integers `nums` consisting of elements ranging from `l` to `r`, both **inclusive**.

In one operation, you can:

- Select two integers `a` and `b` from the array.
- Replace them with `floor(a / 4)` and `floor(b / 4)`.

Your task is to determine the **minimum** number of operations required to reduce all elements of the array to zero for each query. Return the sum of the results for all queries.

**Constraints:**
- `1 <= queries.length <= 10^5`
- `queries[i].length == 2`
- `queries[i] == [l, r]`
- `1 <= l < r <= 10^9`

## Examples

```
Example 1:
  Input: queries = [[1,2],[2,4]]
  Output: 3
  Explanation:
  For queries[0]:
  - The initial array is nums = [1, 2].
  - In the first operation, select nums[0] and nums[1]. The array becomes [0, 0].
  - The minimum number of operations required is 1.
  For queries[1]:
  - The initial array is nums = [2, 3, 4].
  - In the first operation, select nums[0] and nums[2]. The array becomes [0, 3, 1].
  - In the second operation, select nums[1] and nums[2]. The array becomes [0, 0, 0].
  - The minimum number of operations required is 2.
  The output is 1 + 2 = 3.
```

```
Example 2:
  Input: queries = [[2,6]]
  Output: 4
  Explanation:
  For queries[0]:
  - The initial array is nums = [2, 3, 4, 5, 6].
  - In the first operation, select nums[0] and nums[3]. The array becomes [0, 3, 4, 1, 6].
  - In the second operation, select nums[2] and nums[4]. The array becomes [0, 3, 1, 1, 1].
  - In the third operation, select nums[1] and nums[2]. The array becomes [0, 0, 0, 1, 1].
  - In the fourth operation, select nums[3] and nums[4]. The array becomes [0, 0, 0, 0, 0].
  - The minimum number of operations required is 4.
  The output is 4.
```

## Approach
**Greedy with Max-Heap of Reductions**  
Each element contributes a reduction of `x - ⌊x/2⌋` when halved. To minimise total steps, always apply the operation to the element that yields the largest reduction, because it brings the overall sum down fastest. Use a max-heap storing the current value of each element and its potential reduction. Repeatedly extract the maximum reduction, apply the operation, push the new value back, and increment the operation count until all values become zero.

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

## Follow-Up Questions
1. How would the algorithm change if the operation replaced `x` with `⌈x/2⌉`?
2. Can we compute the answer directly using bit-length sums without a heap?
3. What if each halving operation had a different cost per element?

## Key Takeaway
A max-heap that always picks the element offering the largest immediate reduction yields the minimal number of halving steps to bring all numbers to zero.
