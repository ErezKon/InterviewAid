# 213. House Robber II

**Difficulty:** 🟡 Medium
**Acceptance:** 43.0%
**LeetCode:** [https://leetcode.com/problems/house-robber-ii](https://leetcode.com/problems/house-robber-ii)
**Companies:** Amazon, Apple, Bloomberg, Databricks, Datadog, De Shaw, Docusign, Google, Infosys, Linkedin, Makemytrip, Meta, Microsoft, Salesforce, Servicenow, Tiktok, Uber, Visa, Zoho

---

## 1. Problem Description

You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. All houses at this place are **arranged in a circle.** That means the first house is the neighbor of the last one. Meanwhile, adjacent houses have a security system connected, and **it will automatically contact the police if two adjacent houses were broken into on the same night**.

Given an integer array `nums` representing the amount of money of each house, return *the maximum amount of money you can rob tonight **without alerting the police***.

**Constraints:**
- `1 <= nums.length <= 100`
- `0 <= nums[i] <= 1000`

## 2. Examples

**Example 1:**
```
Input: nums = [2,3,2]
Output: 3
Explanation: You cannot rob house 1 (money = 2) and then rob house 3 (money = 2), because they are adjacent houses.
```

**Example 2:**
```
Input: nums = [1,2,3,1]
Output: 4
Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
Total amount you can rob = 1 + 3 = 4.
```

**Example 3:**
```
Input: nums = [1,2,3]
Output: 3
```

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
