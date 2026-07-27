# 740. Delete and Earn

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/delete-and-earn](https://leetcode.com/problems/delete-and-earn)
**Companies:** Accenture, Akuna Capital, Amazon, Bloomberg, Google, Meesho, Meta, Microsoft, Morgan Stanley, Salesforce, Tiktok

---

## Problem Description

Given an array, pick a number to earn its points, but all instances of `num-1` and `num+1` are deleted. Maximize total points.

---

## Key Insight

Taking value `x` forces skipping `x-1` and `x+1` → reduces to **House Robber** on a points array indexed by value.

---

## Approach: DP (House Robber on Values) — O(n + max) ✅

```
FUNCTION deleteAndEarn(nums):
    maxVal = MAX(nums)
    points = [0] * (maxVal + 1)
    FOR num IN nums: points[num] += num

    // House Robber on points array
    prev2 = 0, prev1 = 0
    FOR i ← 0 TO maxVal:
        curr = MAX(prev1, prev2 + points[i])
        prev2 = prev1
        prev1 = curr

    RETURN prev1
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n + max(nums)) |
| **Space** | O(max(nums)) |

---

## Key Takeaway

> **Delete and Earn = House Robber in disguise. Aggregate points by value, then apply the "can't pick adjacent" DP. Classic reduction pattern.**
