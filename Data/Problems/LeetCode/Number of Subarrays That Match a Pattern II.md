# 3036. Number of Subarrays That Match a Pattern II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/number-of-subarrays-that-match-a-pattern-ii](https://leetcode.com/problems/number-of-subarrays-that-match-a-pattern-ii)
**Companies:** Autodesk, Thoughtworks

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: KMP / Z-Algorithm — O(n + m)](#3-approach)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

You are given a **0-indexed** integer array `nums` of size `n`, and a **0-indexed** integer array `pattern` of size `m` consisting of integers `-1`, `0`, and `1`.

A subarray `nums[i..j]` of size `m + 1` is said to match the `pattern` if the following conditions hold for each element `pattern[k]`:

- `nums[i + k + 1] > nums[i + k]` if `pattern[k] == 1`.
- `nums[i + k + 1] == nums[i + k]` if `pattern[k] == 0`.
- `nums[i + k + 1] < nums[i + k]` if `pattern[k] == -1`.

Return *the** count** of subarrays in* `nums` *that match the* `pattern`.

**Constraints:**
- `2 <= n == nums.length <= 10^6`
- `1 <= nums[i] <= 10^9`
- `1 <= m == pattern.length < n`
- `-1 <= pattern[i] <= 1`

---

## 2. Key Insight

> Convert `nums` to a difference-sign array. Then pattern matching becomes string matching → use KMP or Z-algorithm.

---

## 3. Approach: KMP / Z-Algorithm — O(n + m) ✅

```text
FUNCTION countMatchingSubarrays(nums, pattern):
    // Convert nums to sign array: sign(nums[i+1] - nums[i])
    text ← []
    FOR i ← 0 TO LENGTH(nums) - 2:
        SET diff ← nums[i+1] - nums[i]
        IF diff > 0:
            APPEND 1 TO text
        ELSE IF diff < 0:
            APPEND -1 TO text
        ELSE:
            APPEND 0 TO text
    // Build failure function for pattern
    failure ← BUILD_FAILURE(pattern)
    // KMP search
    SET i ← 0, j ← 0, count ← 0
    WHILE i < LENGTH(text):
        IF text[i] = pattern[j]:
            SET i ← i + 1
            SET j ← j + 1
            IF j = LENGTH(pattern):
                SET count ← count + 1
                SET j ← failure[j-1]
        ELSE:
            IF j != 0:
                SET j ← failure[j-1]
            ELSE:
                SET i ← i + 1
    RETURN count
```

---

## 4. Examples

**Example 1:**
```
Input: nums = [1,2,3,4,5,6], pattern = [1,1]
Output: 4
Explanation: The pattern [1,1] indicates that we are looking for strictly increasing subarrays of size 3. In the array nums, the subarrays [1,2,3], [2,3,4], [3,4,5], and [4,5,6] match this pattern.
Hence, there are 4 subarrays in nums that match the pattern.
```

**Example 2:**
```
Input: nums = [1,4,4,1,3,5,5,3], pattern = [1,0,-1]
Output: 2
Explanation: Here, the pattern [1,0,-1] indicates that we are looking for a sequence where the first number is smaller than the second, the second is equal to the third, and the third is greater than the fourth. In the array nums, the subarrays [1,4,4,1], and [3,5,5,3] match this pattern.
Hence, there are 2 subarrays in nums that match the pattern.
```

---

## 5. Walkthrough

Consider `nums = [5,3,1,2]` and `pattern = [-1,-1]`.

1. **Build sign array**: differences are `[-2, -2, 1]` → sign array `[-1, -1, 1]`.
2. **KMP failure table** for pattern `[-1, -1]` is `[0,1]`.
3. **Search**:
   - Compare first two signs `-1,-1` → match → count = 1.
   - Continue scanning, no further matches.
4. **Result**: Only one subarray matches the pattern.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n + m) |
| **Space** | O(m) for failure function |

---

## 7. Follow-Up Questions

- How would you handle patterns with wildcards (e.g., any positive difference)?
- Can you adapt the solution for streaming data where the array is received incrementally?
- What changes are needed if the pattern length is very large compared to the array?

---

## 8. Key Takeaway

> **Reduce to string matching on the difference-sign array.** KMP or Z-algorithm gives linear time. Classic reduction from subarray pattern to string matching.
