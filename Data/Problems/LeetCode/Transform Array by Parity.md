# 3467. Transform Array by Parity

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/transform-array-by-parity](https://leetcode.com/problems/transform-array-by-parity)
**Companies:** Infosys

---

## Problem Description

> *Note: the Approach/Walkthrough below solve an invented "minimum parity operations" problem. Correct idea: count the even numbers `e`; return `e` zeros followed by `n − e` ones. O(n).*

You are given an integer array `nums`. Transform `nums` by performing the following operations in the **exact** order specified:

- Replace each even number with 0.
- Replace each odd numbers with 1.
- Sort the modified array in **non-decreasing** order.

Return the resulting array after performing these operations.

**Constraints:**
- `1 <= nums.length <= 100`
- `1 <= nums[i] <= 1000`

## Examples

**Example 1:**
```
Input: nums = [4,3,2,1]
Output: [0,0,1,1]
Explanation: - Replace the even numbers (4 and 2) with 0 and the odd numbers (3 and 1) with 1. Now, nums = [0, 1, 0, 1].
- After sorting nums in non-descending order, nums = [0, 0, 1, 1].
```

**Example 2:**
```
Input: nums = [1,5,1,4,2]
Output: [0,0,1,1,1]
Explanation: - Replace the even numbers (4 and 2) with 0 and the odd numbers (1, 5 and 1) with 1. Now, nums = [1, 1, 1, 0, 0].
- After sorting nums in non-descending order, nums = [0, 0, 1, 1, 1].
```

## Approach
Count how many even and how many odd numbers are present. To make all elements share parity, you must change the minority group. The answer is `min(evenCount, oddCount)`.

**Pseudocode**
```text
FUNCTION minOperationsParity(nums):
    SET evenCount ← 0
    SET oddCount ← 0
    FOR each num IN nums:
        IF num MOD 2 = 0:
            SET evenCount ← evenCount + 1
        ELSE:
            SET oddCount ← oddCount + 1
    RETURN MIN(evenCount, oddCount)
```

## Walkthrough
| nums | evenCount | oddCount | min → operations |
|------|-----------|----------|-------------------|
| [3,2,1,4] | 2 | 2 | 2 |
| [2,4,6]   | 3 | 0 | 0 |

## Complexity Analysis
- Time: O(n) where n = length of `nums`.
- Space: O(1) – only counters are used.

## Follow-Up Questions
1. How would the solution change if each operation could only increment/decrement by 1?
2. What if you were required to transform the array into a specific target parity (all even) regardless of the minority count?
3. Can you extend the problem to minimize the total sum of changes rather than the number of operations?

## Key Takeaway
The optimal strategy is to convert the smaller parity group, yielding a simple count‑based solution.
