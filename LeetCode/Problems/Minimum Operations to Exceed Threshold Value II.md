# 3066. Minimum Operations to Exceed Threshold Value II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-operations-to-exceed-threshold-value-ii](https://leetcode.com/problems/minimum-operations-to-exceed-threshold-value-ii)
**Companies:** Amazon, Google, Meta, Tcs

---

## Problem Description
Given an integer array `nums` and an integer `k`, you may repeatedly perform an operation: pick the two smallest elements `a` and `b`, replace them with `min(a,b) * 2 + max(a,b)`. Return the minimum number of operations required until the smallest element in the array is at least `k`. It is guaranteed that a solution exists.

## Examples
**Example 1:**
```
nums = [1,2,3], k = 10
Output: 2
Explanation: Operation 1 -> replace 1 and 2 with 1*2+2=4, array becomes [3,4]; Operation 2 -> replace 3 and 4 with 3*2+4=10, smallest >=10.
```
**Example 2:**
```
nums = [5,5,5], k = 5
Output: 0
Explanation: All elements already >=5.
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
