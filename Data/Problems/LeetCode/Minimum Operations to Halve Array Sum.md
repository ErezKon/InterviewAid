# 2208. Minimum Operations to Halve Array Sum

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-operations-to-halve-array-sum](https://leetcode.com/problems/minimum-operations-to-halve-array-sum)
**Companies:** Microsoft, Oracle

---

## Problem Description
You are given an array `nums` of positive integers. In one operation, you can choose **any** number from `nums` and reduce it to **exactly** half the number. (Note that you may choose this reduced number in future operations.)

Return *the **minimum** number of operations to reduce the sum of* `nums` *by **at least** half.*

**Constraints:**
- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^7`

## Examples

```
Example 1:
  Input: nums = [5,19,8,1]
  Output: 3
  Explanation: The initial sum of nums is equal to 5 + 19 + 8 + 1 = 33.
  The following is one of the ways to reduce the sum by at least half:
  Pick the number 19 and reduce it to 9.5.
  Pick the number 9.5 and reduce it to 4.75.
  Pick the number 8 and reduce it to 4.
  The final array is [5, 4.75, 4, 1] with a total sum of 5 + 4.75 + 4 + 1 = 14.75.
  The sum of nums has been reduced by 33 - 14.75 = 18.25, which is at least half of the initial sum, 18.25 >= 33/2 = 16.5.
  Overall, 3 operations were used so we return 3.
  It can be shown that we cannot reduce the sum by at least half in less than 3 operations.
```

```
Example 2:
  Input: nums = [3,8,20]
  Output: 3
  Explanation: The initial sum of nums is equal to 3 + 8 + 20 = 31.
  The following is one of the ways to reduce the sum by at least half:
  Pick the number 20 and reduce it to 10.
  Pick the number 10 and reduce it to 5.
  Pick the number 3 and reduce it to 1.5.
  The final array is [1.5, 8, 5] with a total sum of 1.5 + 8 + 5 = 14.5.
  The sum of nums has been reduced by 31 - 14.5 = 16.5, which is at least half of the initial sum, 16.5 >= 31/2 = 15.5.
  Overall, 3 operations were used so we return 3.
  It can be shown that we cannot reduce the sum by at least half in less than 3 operations.
```

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
