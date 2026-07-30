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

Given a **non-decreasing** sorted array `nums` and an integer `k`, return `true` if it's possible to divide the array into one or more **strictly increasing** subsequences of length ≥ `k`.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `1 <= k <= nums.length`

---

## Examples

```
Input: nums = [1,2,2,3,3,4,4], k = 3
Output: true → [1,2,3,4] and [2,3,4]
```

```
Input: nums = [5,6,6,7,8], k = 3
Output: false
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
