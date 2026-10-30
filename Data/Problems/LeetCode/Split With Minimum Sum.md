# 2578. Split With Minimum Sum

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/split-with-minimum-sum](https://leetcode.com/problems/split-with-minimum-sum)
**Companies:** Amazon, Google

---

## Problem Description

> *Note: the Approach/Walkthrough below solve an invented "minimise leftMax + rightMax" array problem. Correct idea: sort the digits of `num` ascending and deal them alternately to `num1` and `num2` (smallest digits get the highest place values); return `num1 + num2`. O(d log d).*

Given a positive integer `num`, split it into two non-negative integers `num1` and `num2` such that:

- The concatenation of `num1` and `num2` is a permutation of `num`.
  - In other words, the sum of the number of occurrences of each digit in `num1` and `num2` is equal to the number of occurrences of that digit in `num`.
- `num1` and `num2` can contain leading zeros.

Return *the **minimum** possible sum of* `num1` *and* `num2`.

**Notes:**

- It is guaranteed that `num` does not contain any leading zeros.
- The order of occurrence of the digits in `num1` and `num2` may differ from the order of occurrence of `num`.

**Constraints:**
- `10 <= num <= 10^9`

## Examples

**Example 1:**
```
Input: num = 4325
Output: 59
Explanation: We can split 4325 so that num1 is 24 and num2 is 35, giving a sum of 59. We can prove that 59 is indeed the minimal possible sum.
```

**Example 2:**
```
Input: num = 687
Output: 75
Explanation: We can split 687 so that num1 is 68 and num2 is 7, which would give an optimal sum of 75.
```

## Approach
Observe that the optimal split occurs where the maximum of the left side is as small as possible while the maximum of the right side is also small. Pre‑compute prefix maximums and suffix maximums, then evaluate `prefixMax[i] + suffixMax[i+1]` for each split.

```text
FUNCTION MinSplitSum(nums):
    SET n ← LENGTH(nums)
    SET prefixMax ← ARRAY of size n
    SET suffixMax ← ARRAY of size n
    // compute prefix maximums
    SET current ← nums[0]
    FOR i ← 0 TO n-1:
        IF nums[i] > current:
            SET current ← nums[i]
        SET prefixMax[i] ← current
    // compute suffix maximums
    SET current ← nums[n-1]
    FOR i ← n-1 DOWNTO 0:
        IF nums[i] > current:
            SET current ← nums[i]
        SET suffixMax[i] ← current
    // evaluate splits
    SET answer ← INFINITY
    FOR i ← 0 TO n-2:
        SET candidate ← prefixMax[i] + suffixMax[i+1]
        IF candidate < answer:
            SET answer ← candidate
    RETURN answer
```

## Walkthrough
| i (split after) | left part | left max | right part | right max | sum |
|----------------|-----------|----------|------------|-----------|-----|
| 0 | [2] | 2 | [1,3,5,4] | 5 | 7 |
| 1 | [2,1] | 2 | [3,5,4] | 5 | 7 |
| 2 | [2,1,3] | 3 | [5,4] | 5 | 8 |
| 3 | [2,1,3,5] | 5 | [4] | 4 | 9 |
The minimum sum among these candidates is 7.

## Complexity Analysis
*Time:* O(n) to compute prefix and suffix maximums and evaluate splits.
*Space:* O(n) for the two auxiliary arrays (can be reduced to O(1) with two passes).

## Follow-Up Questions
1. How would you modify the algorithm if the split must produce parts of equal length?
2. Can you solve the problem using only O(1) extra space?
3. What if the array contains negative numbers?

## Key Takeaway
Pre‑computing prefix and suffix maximums enables a linear‑time solution for finding the split that minimizes the sum of the two part‑maximums.
