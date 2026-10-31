# 1863. Sum of All Subset XOR Totals

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/sum-of-all-subset-xor-totals](https://leetcode.com/problems/sum-of-all-subset-xor-totals)
**Companies:** Adobe, Amazon, Bloomberg, Google, Microsoft

---

## Problem Description

The **XOR total** of an array is defined as the bitwise `XOR` of **all its elements**, or `0` if the array is **empty**.

- For example, the **XOR total** of the array `[2,5,6]` is `2 XOR 5 XOR 6 = 1`.

Given an array `nums`, return *the **sum** of all **XOR totals** for every **subset** of* `nums`.

**Note:** Subsets with the **same** elements should be counted **multiple** times.

An array `a` is a **subset** of an array `b` if `a` can be obtained from `b` by deleting some (possibly zero) elements of `b`.

**Constraints:**
- `1 <= nums.length <= 12`
- `1 <= nums[i] <= 20`

## Examples

**Example 1:**
```
Input: nums = [1,3]
Output: 6
Explanation: The 4 subsets of [1,3] are:
- The empty subset has an XOR total of 0.
- [1] has an XOR total of 1.
- [3] has an XOR total of 3.
- [1,3] has an XOR total of 1 XOR 3 = 2.
0 + 1 + 3 + 2 = 6
```

**Example 2:**
```
Input: nums = [5,1,6]
Output: 28
Explanation: The 8 subsets of [5,1,6] are:
- The empty subset has an XOR total of 0.
- [5] has an XOR total of 5.
- [1] has an XOR total of 1.
- [6] has an XOR total of 6.
- [5,1] has an XOR total of 5 XOR 1 = 4.
- [5,6] has an XOR total of 5 XOR 6 = 3.
- [1,6] has an XOR total of 1 XOR 6 = 7.
- [5,1,6] has an XOR total of 5 XOR 1 XOR 6 = 2.
0 + 5 + 1 + 6 + 4 + 3 + 7 + 2 = 28
```

**Example 3:**
```
Input: nums = [3,4,5,6,7,8]
Output: 480
Explanation: The sum of all XOR totals for every subset is 480.
```

## Approach
The contribution of each bit is independent. If a bit is set in any element, it appears in exactly half of the subsets (2^(n-1)). Therefore, the total sum equals `(OR of all numbers) * 2^(n-1)`.

## Walkthrough
| Step | OR so far | Explanation |
|------|----------|-------------|
| Start | 0 | Initialize |
| after 5 | 0101 | 5 sets bits 0 and 2 |
| after 1 | 0101 | 1 adds no new bits |
| after 6 | 0111 | 6 adds bit 1 |
Resulting OR = 7. Multiply by 2^(3-1)=4 → 28.

## Complexity Analysis
Time: O(n) to compute OR.
Space: O(1).

## Follow-Up Questions
* How would the solution change if subsets must be of size at least k?
* Can you extend the idea to compute the sum of AND over all subsets?

## Key Takeaway
Each set bit contributes to half of the subsets, allowing a simple O(n) OR-times-power calculation.
