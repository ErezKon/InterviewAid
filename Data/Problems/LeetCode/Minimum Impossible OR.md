# 2568. Minimum Impossible OR

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-impossible-or](https://leetcode.com/problems/minimum-impossible-or)
**Companies:** Amazon

---

## Problem Description

Given an array `nums`, find the **smallest positive integer** that cannot be represented as the OR of any subset of `nums`.

## Examples

**Example 1:**
```
Input: nums = [1,2,3]
Output: 8
Explanation: Subset ORs can produce 1,2,3,3 (1|2),3 (1|3),3 (2|3),3 (1|2|3). The smallest missing positive integer is 8.
```

**Example 2:**
```
Input: nums = [5,2,1]
Output: 4
Explanation: Subset ORs produce 1,2,3,5,7,6,7,7. 4 is missing.
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
