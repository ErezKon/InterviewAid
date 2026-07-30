# 213. House Robber II

**Difficulty:** 🟡 Medium
**Acceptance:** 43.0%
**LeetCode:** [https://leetcode.com/problems/house-robber-ii](https://leetcode.com/problems/house-robber-ii)
**Companies:** Amazon, Apple, Bloomberg, Databricks, Datadog, De Shaw, Docusign, Google, Infosys, Linkedin, Makemytrip, Meta, Microsoft, Salesforce, Servicenow, Tiktok, Uber, Visa, Zoho

---

## 1. Problem Description

A row of houses forms a circle. Each house contains a certain amount of money. You cannot rob two adjacent houses. Return the maximum amount of money you can rob without alerting the police.

## 2. Examples

| houses | max rob |
|--------|---------|
| [2,3,2] | 3 |
| [1,2,3,1] | 4 |
| [1,2,3] | 3 |

*Explanation*: In the first example, you can only rob house 2 (value 3) because houses 1 and 3 are adjacent to each other.

## 3. Approach

Treat the circular arrangement as two linear House Robber I problems: one excluding the first house, the other excluding the last house. The answer is the maximum of the two results.

```text
FUNCTION rob(nums):
    IF LENGTH(nums) == 1:
        RETURN nums[0]
    RETURN MAX(robLinear(nums[0..n-2]), robLinear(nums[1..n-1]))

FUNCTION robLinear(arr):
    SET prev2 ← 0
    SET prev1 ← 0
    FOR value IN arr:
        SET curr ← MAX(prev1, prev2 + value)
        SET prev2 ← prev1
        SET prev1 ← curr
    RETURN prev1
```

## 4. Walkthrough

Consider `nums = [1,2,3,1]`:
1. Exclude first house → subarray `[2,3,1]` → `robLinear` yields 4 (houses 2 and 4).
2. Exclude last house → subarray `[1,2,3]` → `robLinear` yields 4 (houses 1 and 3).
3. Max of both cases = 4.

## 5. Complexity Analysis

- **Time**: O(n) – each house is processed twice.
- **Space**: O(1) – only constant extra variables are used.

## 6. Follow-Up Questions

- How would you modify the solution if houses were arranged in a binary tree?
- What if each house had a cooldown period after being robbed?
- Can you extend the algorithm to handle k‑adjacent restriction?

## 7. Key Takeaway

> Convert the circular constraint into two linear sub‑problems and take the maximum, achieving linear time and constant space.
