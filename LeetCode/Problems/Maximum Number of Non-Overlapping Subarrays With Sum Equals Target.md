# 1546. Maximum Number of Non-Overlapping Subarrays With Sum Equals Target

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-number-of-non-overlapping-subarrays-with-sum-equals-target](https://leetcode.com/problems/maximum-number-of-non-overlapping-subarrays-with-sum-equals-target)
**Companies:** Google

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array `nums` and an integer `target`, return the **maximum number of non-overlapping subarrays** that sum to `target`.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `-10^4 <= nums[i] <= 10^4`
- `0 <= target <= 10^6`

---

## Examples

**Example 1:**
```
Input:  nums = [1,1,1,1,1], target = 2
Output: 2
Explanation: Subarrays [1,1] at indices 0-1 and [1,1] at indices 2-3.
```

**Example 2:**
```
Input:  nums = [-1,3,5,1,4,2,-9], target = 6
Output: 2
Explanation: [5,1] and [4,2] both sum to 6.
```

---

## Key Insight

> **Greedy with prefix sums**: use a prefix sum hash map. When we find a subarray summing to target, take it (greedily — the earliest-ending subarray leaves most room). Reset the prefix map to avoid overlapping.

---

## Approach

```
FUNCTION maxNonOverlapping(nums, target)
    prefixSum ← 0
    seen ← {0: -1}    // prefix sum → last index
    count ← 0
    lastEnd ← -1      // end index of last chosen subarray

    FOR i ← 0 TO len(nums) - 1 DO
        prefixSum ← prefixSum + nums[i]
        need ← prefixSum - target

        IF need IN seen AND seen[need] ≥ lastEnd THEN
            count ← count + 1
            lastEnd ← i

        seen[prefixSum] ← i

    RETURN count
END FUNCTION
```

---

## Walkthrough

```
nums = [1,1,1,1,1], target = 2
```

| i | prefixSum | need=pSum-2 | In seen? | lastEnd | count |
|---|-----------|-------------|----------|---------|-------|
| 0 | 1         | -1          | No       | -1      | 0     |
| 1 | 2         | 0           | Yes (idx -1 ≥ -1) | 1 | **1** |
| 2 | 3         | 1           | Yes (idx 0 < 1) | 1 | 1   |
| 3 | 4         | 2           | Yes (idx 1 ≥ 1) | 3 | **2** |
| 4 | 5         | 3           | Yes (idx 2 < 3) | 3 | 2   |

**Result: 2** ✅

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(n)** — single pass |
| Space  | **O(n)** — hash map |

---

## Follow-Up Questions

1. **Why greedy (take the earliest-ending)?**
   The earliest-ending subarray leaves the most elements for future subarrays — classic interval scheduling.

2. **What if we wanted the minimum number of subarrays to cover the array?**
   Different problem — would need a different approach (possibly DP).

3. **What if subarrays could overlap?**
   Then just count all subarrays summing to target using prefix sums.

---

## Key Takeaway

> **Greedy prefix sum** — find subarrays summing to target via hash map, greedily take the earliest-ending one to maximize non-overlapping count. O(n) time.
