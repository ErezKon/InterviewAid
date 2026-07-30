# 3065. Minimum Operations to Exceed Threshold Value I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/minimum-operations-to-exceed-threshold-value-i](https://leetcode.com/problems/minimum-operations-to-exceed-threshold-value-i)
**Companies:** Tcs

---

## Problem Description
Given an integer array `nums` and an integer `threshold`, you can perform operations where you pick any element from `nums` and add its value to a running sum. Return the minimum number of operations required for the sum to strictly exceed `threshold`. It is guaranteed that the sum of all elements is greater than `threshold`.

## Examples
**Example 1:**
```
nums = [1,2,3,4,5], threshold = 10
Output: 3
Explanation: Pick 5, 4, and 2 (5+4+2 = 11 > 10). Minimum operations = 3.
```
**Example 2:**
```
nums = [2,2,2], threshold = 3
Output: 2
Explanation: Any two 2's give sum 4 > 3.
```

## Approach
**Greedy – pick largest values first.** Sorting the array in descending order ensures each operation contributes the maximum possible sum, minimizing the count.

```text
FUNCTION minOperations(nums, threshold):
    SORT nums DESCENDING
    SET ops ← 0
    SET currentSum ← 0
    FOR value IN nums:
        IF currentSum > threshold:
            BREAK
        SET currentSum ← currentSum + value
        SET ops ← ops + 1
    RETURN ops
```

## Walkthrough
| Step | Sorted nums | Current Sum | Operations |
|------|-------------|-------------|------------|
| 1    | [5,4,3,2,1] | 0           | 0 |
| 2    | 5 added     | 5           | 1 |
| 3    | 4 added     | 9           | 2 |
| 4    | 2 added     | 11 (>10)    | 3 |

## Complexity Analysis
- **Time:** O(n log n) for sorting.
- **Space:** O(1) extra (in‑place sort) or O(n) if a copy is made.

## Follow‑Up Questions
1. What if you could only pick each element at most once?
2. How would you handle a stream of numbers where you cannot store all values?
3. Can you solve it in O(n) time using a selection algorithm?

## Key Takeaway
Sorting in descending order and greedily taking the largest elements yields the minimum number of operations to exceed the threshold.
