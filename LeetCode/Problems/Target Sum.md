# 494. Target Sum

**Difficulty:** 🟡 Medium
**Acceptance:** 45.0%
**LeetCode:** [https://leetcode.com/problems/target-sum](https://leetcode.com/problems/target-sum)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Myntra, Nuro, Pinterest, Salesforce, Servicenow, Zoho

---

## 1. Problem Description

Given an array `nums` and a `target`, assign `+` or `-` to each element to make the sum equal to `target`. Return the number of ways.

---

## 2. Examples

**Example 1:**
```
Input: nums = [1,1,1,1,1], target = 3
Output: 5
Explanation: There are 5 ways to assign signs to reach 3.
```

**Example 2:**
```
Input: nums = [1,2,7,9,981], target = 1000000000
Output: 0
Explanation: The target is far larger than any possible sum.
```

---

## 3. Approach: DP (Subset Sum) — O(n·sum) ✅

Transform: if P = sum of positives, N = sum of negatives: `P - N = target` and `P + N = total`. So `P = (target + total) / 2`. Count subsets summing to P.

```text
FUNCTION findTargetSumWays(nums, target):
    total ← SUM(nums)
    IF (target + total) % 2 != 0 OR ABS(target) > total:
        RETURN 0
    subsetSum ← (target + total) / 2
    dp ← array of (subsetSum + 1) zeros
    dp[0] ← 1
    FOR num IN nums:
        FOR j ← subsetSum DOWN TO num:
            dp[j] ← dp[j] + dp[j - num]
    RETURN dp[subsetSum]
```

---

## 4. Walkthrough

Consider Example 1: `nums = [1,1,1,1,1]`, `target = 3`.
1. `total = 5`. Compute `P = (3 + 5) / 2 = 4`.
2. The problem reduces to counting subsets of `nums` that sum to 4.
3. Subsets that sum to 4 are: `[1,1,1,1]` (choose any four of the five ones). There are `5` ways to pick which element is excluded, matching the output.

---

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(n · P) where P is the subset sum | O(P) |

---

## 6. Follow-Up Questions

* How would you modify the solution if the numbers could be negative?
* Can you solve the problem using memoized recursion instead of bottom‑up DP?

---

## Key Takeaway

> Transform the +/- assignment into a subset sum problem. `P = (target + total) / 2` reduces to counting subsets with a given sum — standard 0/1 knapsack.
