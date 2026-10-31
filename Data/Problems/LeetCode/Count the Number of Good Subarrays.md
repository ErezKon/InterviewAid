# 2537. Count the Number of Good Subarrays

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-the-number-of-good-subarrays](https://leetcode.com/problems/count-the-number-of-good-subarrays)
**Companies:** Amazon, Google, Meta, Microsoft, Roblox, Tiktok, Uber

---

## Problem Description

Given an integer array `nums` and an integer `k`, return *the number of **good** subarrays of* `nums`.

A subarray `arr` is **good** if there are **at least **`k` pairs of indices `(i, j)` such that `i < j` and `arr[i] == arr[j]`.

A **subarray** is a contiguous **non-empty** sequence of elements within an array.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `1 <= nums[i], k <= 10^9`

---

## Examples

**Example 1:**
```
Input: nums = [1,1,1,1,1], k = 10
Output: 1
Explanation: The only good subarray is the array nums itself.
```

**Example 2:**
```
Input: nums = [3,1,4,3,2,2,4], k = 2
Output: 4
Explanation: There are 4 different good subarrays:
- [3,1,4,3,2,2] that has 2 pairs.
- [3,1,4,3,2,2,4] that has 3 pairs.
- [1,4,3,2,2,4] that has 2 pairs.
- [4,3,2,2,4] that has 2 pairs.
```

---

## Approach

```text
FUNCTION countGood(nums, k):
    SET count ← MAP()          // frequency of each value in window
    SET pairs ← 0
    SET left ← 0
    SET result ← 0
    SET n ← LENGTH(nums)

    FOR right ← 0 TO n - 1:
        // Adding nums[right] creates `count[nums[right]]` new equal-element pairs
        SET pairs ← pairs + count.GET(nums[right], 0)
        SET count[nums[right]] ← count.GET(nums[right], 0) + 1

        // While window already has enough pairs, all extensions to the right are valid
        WHILE pairs >= k:
            SET result ← result + (n - right)   // every longer subarray starting at `left` works
            // Shrink from left
            SET count[nums[left]] ← count[nums[left]] - 1
            SET pairs ← pairs - count[nums[left]]   // removing left element destroys `count[nums[left]]` pairs
            SET left ← left + 1

    RETURN result
```

---

## Walkthrough

**Using Example 1 (`nums = [1,1,1,1,1]`, `k = 10`):**
| Step | right | left | count[1] | pairs | result |
|------|-------|------|----------|-------|--------|
| 1 | 0 | 0 | 1 | 0 | 0 |
| 2 | 1 | 0 | 2 | 1 | 0 |
| 3 | 2 | 0 | 3 | 3 | 0 |
| 4 | 3 | 0 | 4 | 6 | 0 |
| 5 | 4 | 0 | 5 | 10 | 0 |
| – | – | – | – | – | **pairs ≥ k, add `n-right = 5-4 = 1` to result → result=1** |
| Shrink left | left=1, count[1]=4, pairs = 10-4 = 6 (now < k) |

Result = 1, matching the expected output.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) — each element enters and leaves the sliding window at most once |
| **Space** | O(m) where m is the number of distinct values (frequency map) |

---

## Key Takeaway

> **Counting equal-element pairs in a sliding window: adding an element creates `count[x]` new pairs, removing it destroys `count[x]-1` pairs. When the pair count reaches the threshold, all right-extensions are automatically good.**