# 2025. Maximum Number of Ways to Partition an Array

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-number-of-ways-to-partition-an-array](https://leetcode.com/problems/maximum-number-of-ways-to-partition-an-array)
**Companies:** Google, Salesforce

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array `nums` and an integer `k`, you can replace **at most one** element with `k`. Return the **maximum number of ways** to partition the array into two non-empty parts with equal sum.

A partition at index `i` means `sum(nums[0..i]) = sum(nums[i+1..n-1])`.

**Constraints:**
- `2 <= nums.length <= 10^5`
- `-10^5 <= nums[i], k <= 10^5`

---

## Examples

**Example 1:**
```
Input:  nums = [0,0,0], k = 1
Output: 2
Explanation: Without replacement: 2 ways (partition after index 0 or 1). With replacement, fewer.
```

---

## Key Insight

> For each possible replacement position `j`, the change `delta = k - nums[j]` shifts prefix sums. A partition at `i` is valid if `prefix[i] = totalSum/2` (no replacement) or if the delta shifts it correctly. Use **prefix difference maps** (left and right) to count valid partitions efficiently.

---

## Approach

```
FUNCTION waysToPartition(nums, k)
    n ← len(nums)
    totalSum ← SUM(nums)
    prefix ← prefix sums of nums

    // Count partitions without replacement
    base ← count of i where prefix[i] = totalSum / 2 (for i < n)

    // For each replacement position j, track how many partitions become valid
    // Use left/right frequency maps of prefix sums
    rightMap ← frequency of prefix[1..n-1]
    leftMap ← empty map
    best ← base

    FOR j ← 0 TO n - 1 DO
        delta ← k - nums[j]
        newTotal ← totalSum + delta
        IF newTotal is even THEN
            half ← newTotal / 2
            // Partitions left of j: prefix[i] = half (unaffected by replacement)
            // Partitions right of j: prefix[i] + delta = half → prefix[i] = half - delta
            count ← leftMap[half] + rightMap[half - delta]
            best ← MAX(best, count)

        // Move prefix[j+1] from right to left
        IF j + 1 < n THEN
            rightMap[prefix[j+1]] ← rightMap[prefix[j+1]] - 1
            leftMap[prefix[j+1]] ← leftMap[prefix[j+1]] + 1

    RETURN best
END FUNCTION
```

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(n)** — single pass with hash maps |
| Space  | **O(n)** — prefix sums + frequency maps |

---

## Follow-Up Questions

1. **Why separate left and right maps?**
   Replacing `nums[j]` only affects prefix sums at indices ≥ j, so partitions before and after j are handled differently.

2. **What if we could replace multiple elements?**
   Much harder — would need DP or different approach.

---

## Key Takeaway

> **Prefix sum frequency maps** — track how replacement at each position shifts partition validity. Left/right split maps handle the asymmetric effect of replacement on prefix sums.
