# 416. Partition Equal Subset Sum

**Difficulty:** 🟡 Medium
**Acceptance:** 47.0%
**LeetCode:** [https://leetcode.com/problems/partition-equal-subset-sum](https://leetcode.com/problems/partition-equal-subset-sum)
**Companies:** Amazon, Bloomberg, Dream11, Ebay, Epam Systems, Flipkart, Goldman Sachs, Google, Meta, Microsoft, Salesforce, Tcs, Tiktok, Visa, Walmart Labs, Zoho

---

## 1. Problem Description

Given an integer array `nums`, return `true` *if you can partition the array into two subsets such that the sum of the elements in both subsets is equal or* `false` *otherwise*.

**Constraints:**

- `1 <= nums.length <= 200`
- `1 <= nums[i] <= 100`

---

## 2. Examples

```
Example 1:
  Input: nums = [1,5,11,5]
  Output: true
  Explanation: The array can be partitioned as [1, 5, 5] and [11].
```

```
Example 2:
  Input: nums = [1,2,3,5]
  Output: false
  Explanation: The array cannot be partitioned into equal sum subsets.
```

---

## 3. Approach: DP (0/1 Knapsack) — O(n·sum) ✅

```text
FUNCTION canPartition(nums):
    SET total ← SUM(nums)
    IF total MOD 2 ≠ 0:
        RETURN false
    SET target ← total / 2
    SET dp ← ARRAY of BOOLEAN size (target + 1) initialized to false
    SET dp[0] ← true

    FOR each num IN nums:
        FOR j ← target DOWNTO num:
            SET dp[j] ← dp[j] OR dp[j - num]

    RETURN dp[target]
```

---

## 4. Walkthrough

Consider `nums = [1,5,11,5]`.

1. `total = 22`, `target = 11`.
2. Initialize `dp[0] = true`.
3. Process `1`: update `dp[1] = true`.
4. Process `5`: update `dp[5] = true`, `dp[6] = true` (1+5).
5. Process `11`: update `dp[11] = true` (direct), also `dp[12]` etc.
6. Process second `5`: `dp[11]` already true, confirming a subset sums to 11.
7. Return `true`.

---

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(n · target) – each number updates up to target entries | O(target) – boolean array of size target+1 |

---

## 6. Follow-Up Questions

- How would you solve the problem using a bitset to improve performance?
- Can you extend the solution to return the actual subsets?
- What changes are needed for the problem with negative numbers?

---

## Key Takeaway

> Reducing the equal‑partition problem to a subset‑sum (0/1 knapsack) lets you use a compact DP that runs in pseudo‑polynomial time.
