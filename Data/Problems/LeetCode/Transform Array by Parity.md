# 3467. Transform Array by Parity

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/transform-array-by-parity](https://leetcode.com/problems/transform-array-by-parity)
**Companies:** Infosys

---

## Problem Description
You are given an integer array `nums`. In one operation you may choose any element and replace it with any **even** integer if the element is currently odd, or with any **odd** integer if the element is currently even. Determine the minimum number of operations required to make all elements in the array have the same parity (all even or all odd). Return that minimum count.

## Examples
**Example 1:**
```
Input: nums = [3,2,1,4]
Output: 2
Explanation: Change the two even numbers (2,4) to odd numbers → array becomes all odd.
```

**Example 2:**
```
Input: nums = [2,4,6]
Output: 0
Explanation: All numbers are already even.
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
