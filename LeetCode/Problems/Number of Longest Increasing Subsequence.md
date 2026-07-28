# 673. Number of Longest Increasing Subsequence

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-longest-increasing-subsequence](https://leetcode.com/problems/number-of-longest-increasing-subsequence)
**Companies:** Amazon, Bloomberg, Google, Intuit, Meta, Microsoft, Tiktok

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: DP — O(n²)](#3-approach)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Return the number of longest increasing subsequences. There may be multiple LIS of the same maximum length.

---

## 2. Key Insight

> Track two arrays: `length[i]` = LIS length ending at `i`, `count[i]` = number of such LIS. When a longer sequence is found, reset count. When equal length is found, add to count.

---

## 3. Approach: DP — O(n²) ✅

```
FUNCTION findNumberOfLIS(nums):
    n ← LENGTH(nums)
    length ← ARRAY(n, 1)    // LIS length ending at i
    count ← ARRAY(n, 1)     // Number of LIS ending at i

    FOR i ← 1 TO n-1:
        FOR j ← 0 TO i-1:
            IF nums[j] < nums[i]:
                IF length[j] + 1 > length[i]:
                    length[i] ← length[j] + 1
                    count[i] ← count[j]
                ELSE IF length[j] + 1 == length[i]:
                    count[i] ← count[i] + count[j]

    maxLen ← MAX_VALUE_IN(length)
    RETURN SUM(count[i] FOR i WHERE length[i] = maxLen)
```

---

## 4. Examples

**Example 1:**
```
nums = [1,3,5,4,7]
Output: 2
Explanation: The LIS length is 4. The two LIS are [1,3,4,7] and [1,3,5,7].
```

**Example 2:**
```
nums = [2,2,2,2,2]
Output: 5
Explanation: The LIS length is 1. Each element forms an LIS of length 1.
```

---

## 5. Walkthrough

Consider `nums = [1,3,5,4,7]`.
| i | nums[i] | length[i] | count[i] | Explanation |
|---|---------|-----------|----------|-------------|
|0|1|1|1|Start with single element.
|1|3|2|1|Extend from 1.
|2|5|3|1|Extend from 3 (length 2).
|3|4|3|1|Can extend from 1→4 (len2) or 1→3→4 (len3). Best length 3, count from index1 =1.
|4|7|4|2|Can extend from indices 2 (len3) and 3 (len3). Both give length 4, so count = count[2]+count[3] = 1+1 = 2.
Result: maxLen = 4, total count = 2.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n²) |
| **Space** | O(n) |

---

## 7. Follow-Up Questions

- How would you improve the time complexity to O(n log n) while still counting the number of LIS?
- Can the approach be adapted to find the actual subsequences, not just their count?

---

## 8. Key Takeaway

> **Dual DP arrays:** `length` tracks LIS size, `count` tracks how many LIS achieve that size at each position. Summing counts of positions with global max length yields the answer.
