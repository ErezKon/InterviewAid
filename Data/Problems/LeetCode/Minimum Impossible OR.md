# 2568. Minimum Impossible OR

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-impossible-or](https://leetcode.com/problems/minimum-impossible-or)
**Companies:** Amazon

---

## Problem Description

You are given a **0-indexed** integer array `nums`.

We say that an integer x is **expressible** from `nums` if there exist some integers `0 <= index_1 < index_2 < ... < index_k < nums.length` for which `nums[index_1] | nums[index_2] | ... | nums[index_k] = x`. In other words, an integer is expressible if it can be written as the bitwise OR of some subsequence of `nums`.

Return *the minimum **positive non-zero integer** that is not **expressible from *`nums`.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^9`

## Examples

**Example 1:**
```
Input: nums = [2,1]
Output: 4
Explanation: 1 and 2 are already present in the array. We know that 3 is expressible, since nums[0] | nums[1] = 2 | 1 = 3. Since 4 is not expressible, we return 4.
```

**Example 2:**
```
Input: nums = [5,3,2]
Output: 1
Explanation: We can show that 1 is the smallest number that is not expressible.
```

## Approach: Check Powers of 2 — O(n) ✅

The answer is always a **power of 2**. If all powers of 2 up to 2^k are present, every number up to 2^(k+1)-1 can be formed by OR. The first missing power of 2 is the answer.

```text
FUNCTION minImpossibleOR(nums):
    numSet ← SET(nums)
    power ← 1
    WHILE power IN numSet:
        power ← power * 2
    RETURN power
```

## Walkthrough

| Step | Power Checked | Present? |
|------|---------------|----------|
| 1 | 1 | Yes (1 in array) |
| 2 | 2 | Yes (2 in array) |
| 3 | 4 | No → return 4 |

## Complexity Analysis

| Time | Space |
|------|-------|
| O(n) | O(n) |

## Follow-Up Questions

- How would the solution change if numbers could be negative?
- Can you extend the approach to find the smallest missing **XOR** value?
- What is the impact of duplicate numbers on the answer?

## Key Takeaway

> OR can combine any subset, but each power of 2 sets a unique bit. The first missing power of 2 can never be formed by OR of elements without it.
