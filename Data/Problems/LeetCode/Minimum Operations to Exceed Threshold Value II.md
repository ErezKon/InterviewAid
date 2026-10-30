# 3066. Minimum Operations to Exceed Threshold Value II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-operations-to-exceed-threshold-value-ii](https://leetcode.com/problems/minimum-operations-to-exceed-threshold-value-ii)
**Companies:** Amazon, Google, Meta, Tcs

---

## Problem Description
You are given a **0-indexed** integer array `nums`, and an integer `k`.

You are allowed to perform some operations on `nums`, where in a single operation, you can:

- Select the two **smallest** integers `x` and `y` from `nums`.
- Remove `x` and `y` from `nums`.
- Insert `(min(x, y) * 2 + max(x, y))` at any position in the array.

**Note** that you can only apply the described operation if `nums` contains **at least** two elements.

Return the **minimum** number of operations needed so that all elements of the array are **greater than or equal to** `k`.

**Constraints:**
- `2 <= nums.length <= 2 * 10^5`
- `1 <= nums[i] <= 10^9`
- `1 <= k <= 10^9`
- The input is generated such that an answer always exists. That is, after performing some number of operations, all elements of the array are greater than or equal to `k`.

## Examples

```
Example 1:
  Input: nums = [2,11,10,1,3], k = 10
  Output: 2
  Explanation:
  1. In the first operation, we remove elements 1 and 2, then add 1 * 2 + 2 to nums. nums becomes equal to [4, 11, 10, 3].
  2. In the second operation, we remove elements 3 and 4, then add 3 * 2 + 4 to nums. nums becomes equal to [10, 11, 10].
  At this stage, all the elements of nums are greater than or equal to 10 so we can stop.
  It can be shown that 2 is the minimum number of operations needed so that all elements of the array are greater than or equal to 10.
```

```
Example 2:
  Input: nums = [1,1,2,4,9], k = 20
  Output: 4
  Explanation:
  1. After one operation, nums becomes equal to [2, 4, 9, 3].
  2. After two operations, nums becomes equal to [7, 4, 9].
  3. After three operations, nums becomes equal to [15, 9].
  4. After four operations, nums becomes equal to [33].
  At this stage, all the elements of nums are greater than 20 so we can stop.
  It can be shown that 4 is the minimum number of operations needed so that all elements of the array are greater than or equal to 20.
```

## Approach
**Greedy with Min‑Heap.** Always combine the two smallest numbers because this yields the smallest possible increase in the minimum value, minimizing the number of operations.

```text
FUNCTION minOperations(nums, k):
    // Build a min‑heap from all numbers
    SET heap ← MIN_HEAP(nums)
    SET ops ← 0
    WHILE heap.PEEK() < k:
        SET a ← heap.POP()   // smallest
        SET b ← heap.POP()   // second smallest
        SET newVal ← (MIN(a, b) * 2) + MAX(a, b)
        heap.PUSH(newVal)
        SET ops ← ops + 1
    RETURN ops
```

## Walkthrough
| Step | Heap (min→max) | a | b | New Value | Ops |
|------|----------------|---|---|-----------|-----|
| 1    | [1,2,3]        | 1 | 2 | 4         | 1 |
| 2    | [3,4]          | 3 | 4 | 10        | 2 |
| End  | [10]           | – | – | –         | 2 |

## Complexity Analysis
- **Time:** O(n log n) to build the heap plus O(m log n) for `m` operations (each heap push/pop is log n).
- **Space:** O(n) for the heap.

## Follow‑Up Questions
1. How would the solution change if you could combine any two elements, not just the smallest?
2. Can you achieve O(n) time using a counting sort‑based bucket for limited value ranges?
3. What if the operation formula were `a + b` instead of `min*2 + max`?

## Key Takeaway
Using a min‑heap to always merge the two smallest elements yields the minimal number of operations to raise the minimum array value to the target.
