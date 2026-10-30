# 1121. Divide Array Into Increasing Sequences

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/divide-array-into-increasing-sequences](https://leetcode.com/problems/divide-array-into-increasing-sequences)
**Companies:** Google

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Max Frequency Check](#approach-max-frequency-check)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

Given an integer array `nums` sorted in non-decreasing order and an integer `k`, return `true`* if this array can be divided into one or more disjoint increasing subsequences of length at least *`k`*, or *`false`* otherwise*.

**Constraints:**
- `1 <= k <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^5`
- `nums` is sorted in non-decreasing order.

---

## Examples

**Example 1:**
```
Input: nums = [1,2,2,3,3,4,4], k = 3
Output: true
Explanation: The array can be divided into two subsequences [1,2,3,4] and [2,3,4] with lengths at least 3 each.
```

**Example 2:**
```
Input: nums = [5,6,6,7,8], k = 3
Output: false
Explanation: There is no way to divide the array using the conditions required.
```

---

## Key Insight

> The number of subsequences needed = **max frequency** of any element (since identical elements must go to different subsequences). Each subsequence must have length ≥ k, so we need `n / maxFreq ≥ k`, i.e., `maxFreq * k ≤ n`.

---

## Approach: Max Frequency Check ✅

```
FUNCTION canDivideIntoSubsequences(nums, k):
    maxFreq ← max frequency of any element in nums
    RETURN maxFreq * k <= length(nums)
END FUNCTION
```

---

## Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| **Time** | O(n) | Count frequencies |
| **Space** | O(1) | Since sorted, count runs in O(1) extra |

---

## Key Takeaway

> **The bottleneck is the most frequent element — it forces that many separate subsequences. Check if `maxFreq × k ≤ n` to determine feasibility.**
