# 2560. House Robber IV

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/house-robber-iv](https://leetcode.com/problems/house-robber-iv)
**Companies:** Amazon, Arcesium, Bloomberg, Cashfree, Google, Meta, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Binary Search on Answer — O(n log max) ✅](#3-approach-binary-search-on-answer)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

There are several consecutive houses along a street, each of which has some money inside. There is also a robber, who wants to steal money from the homes, but he **refuses to steal from adjacent homes**.

The **capability** of the robber is the maximum amount of money he steals from one house of all the houses he robbed.

You are given an integer array `nums` representing how much money is stashed in each house. More formally, the `i^th` house from the left has `nums[i]` dollars.

You are also given an integer `k`, representing the **minimum** number of houses the robber will steal from. It is always possible to steal at least `k` houses.

Return *the **minimum** capability of the robber out of all the possible ways to steal at least *`k`* houses*.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^9`
- `1 <= k <= (nums.length + 1)/2`

---

## 2. Key Insight

> Binary search on the capability. For a given cap, greedily check if we can pick ≥ k non-adjacent houses with value ≤ cap.

---

## 3. Approach: Binary Search on Answer — O(n log max) ✅

```
FUNCTION minCapability(nums, k):
    lo ← MIN(nums)
    hi ← MAX(nums)

    WHILE lo < hi:
        mid ← (lo + hi) / 2
        IF canRob(nums, k, mid):
            hi ← mid
        ELSE:
            lo ← mid + 1

    RETURN lo

FUNCTION canRob(nums, k, cap):
    count ← 0
    i ← 0
    WHILE i < LENGTH(nums):
        IF nums[i] ≤ cap:
            count ← count + 1
            i ← i + 2    // skip adjacent house
        ELSE:
            i ← i + 1
    RETURN count ≥ k
```

---

## 4. Examples

**Example 1:**
```
Input: nums = [2,3,5,9], k = 2
Output: 5
Explanation: There are three ways to rob at least 2 houses:
- Rob the houses at indices 0 and 2. Capability is max(nums[0], nums[2]) = 5.
- Rob the houses at indices 0 and 3. Capability is max(nums[0], nums[3]) = 9.
- Rob the houses at indices 1 and 3. Capability is max(nums[1], nums[3]) = 9.
Therefore, we return min(5, 9, 9) = 5.
```

**Example 2:**
```
Input: nums = [2,7,9,3,1], k = 2
Output: 2
Explanation: There are 7 ways to rob the houses. The way which leads to minimum capability is to rob the house at index 0 and 4. Return max(nums[0], nums[4]) = 2.
```

---

## 5. Walkthrough

Take `nums = [2,3,5,9]`, `k = 2`.
1. lo=2, hi=9 → mid=5. `canRob` with cap=5 picks 2 (index0) then skips index1, picks 5 (index2) → count=2 ≥ k, so hi=5.
2. lo=2, hi=5 → mid=3. `canRob` with cap=3 picks 2 (index0), skips index1, cannot pick 5 → count=1 < k, so lo=4.
3. lo=4, hi=5 → mid=4. `canRob` with cap=4 picks 2 only → count=1 < k, lo=5.
Now lo=hi=5, answer=5.

---

## 6. Complexity Analysis

| Time | Space |
|------|-------|
| O(n log M) | O(1) |
where `M` is the range between min and max house values.

---

## 7. Follow-Up Questions

1. How would the solution change if houses were arranged in a binary tree?
2. Can you extend the approach to handle a variable cooldown period between robberies?
3. What if each house also had a penalty cost for robbing it?

---

## Key Takeaway

> **Binary search on the answer** combined with a greedy feasibility check efficiently finds the minimal capability for robbing at least `k` non-adjacent houses.
