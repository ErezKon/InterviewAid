# 1852. Distinct Numbers in Each Subarray

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/distinct-numbers-in-each-subarray](https://leetcode.com/problems/distinct-numbers-in-each-subarray)
**Companies:** Amazon

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Sliding Window with Hash Map](#approach-sliding-window-with-hash-map)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an integer array `nums` and an integer `k`, return an array of the **number of distinct elements** in each contiguous subarray of size `k`.

**Constraints:**
- `1 <= k <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^5`

---

## Examples

```
Input: nums = [1,2,3,2,2,1,3], k = 3
Output: [3, 2, 2, 2, 3]
Explanation:
  [1,2,3] → 3 distinct
  [2,3,2] → 2 distinct
  [3,2,2] → 2 distinct
  [2,2,1] → 2 distinct
  [2,1,3] → 3 distinct
```

---

## Key Insight

> Classic **sliding window** with a frequency map. As the window slides right, add the incoming element and remove the outgoing one. The number of keys in the map with count > 0 is the distinct count.

---

## Approach: Sliding Window with Hash Map ✅

```
FUNCTION distinctNumbers(nums, k):
    freq ← Counter(nums[0..k-1])
    result ← [len(freq)]

    FOR i ← k TO length(nums) - 1 DO
        // Add incoming element
        freq[nums[i]] += 1

        // Remove outgoing element
        freq[nums[i - k]] -= 1
        IF freq[nums[i - k]] = 0 THEN
            DELETE freq[nums[i - k]]

        result.ADD(len(freq))

    RETURN result
END FUNCTION
```

---

## Walkthrough

```
nums = [1,2,3,2,2,1,3], k = 3
```

| Window | freq | distinct |
|--------|------|----------|
| [1,2,3] | {1:1,2:1,3:1} | 3 |
| [2,3,2] | {2:2,3:1} | 2 |
| [3,2,2] | {3:1,2:2} | 2 |
| [2,2,1] | {2:2,1:1} | 2 |
| [2,1,3] | {2:1,1:1,3:1} | 3 |

Result: `[3, 2, 2, 2, 3]` ✅

---

## Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| **Time** | O(n) | Each element added/removed once |
| **Space** | O(k) | Frequency map holds at most k entries |

---

## Key Takeaway

> **Counting distinct elements in a sliding window — maintain a frequency map, add/remove as the window slides, and report the map's size. O(n) total.**
