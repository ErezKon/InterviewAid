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

> *Note: premium problem — statement verified via doocs/leetcode.*

You are given an integer array `nums` of length `n` and an integer `k`. Your task is to find the number of **distinct** elements in **every** subarray of size `k` within `nums`.

Return an array `ans` such that `ans[i]` is the count of distinct elements in `nums[i..(i + k - 1)]` for each index `0 <= i < n - k`.

**Constraints:**
- `1 <= k <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^5`

---

## Examples

**Example 1:**
```
Input: nums = [1,2,3,2,2,1,3], k = 3
Output: [3,2,2,2,3]
Explanation: The number of distinct elements in each subarray goes as follows:
- nums[0..2] = [1,2,3] so ans[0] = 3
- nums[1..3] = [2,3,2] so ans[1] = 2
- nums[2..4] = [3,2,2] so ans[2] = 2
- nums[3..5] = [2,2,1] so ans[3] = 2
- nums[4..6] = [2,1,3] so ans[4] = 3
```

**Example 2:**
```
Input: nums = [1,1,1,1,2,3,4], k = 4
Output: [1,2,3,4]
Explanation: The number of distinct elements in each subarray goes as follows:
- nums[0..3] = [1,1,1,1] so ans[0] = 1
- nums[1..4] = [1,1,1,2] so ans[1] = 2
- nums[2..5] = [1,1,2,3] so ans[2] = 3
- nums[3..6] = [1,2,3,4] so ans[3] = 4
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
