# 2190. Most Frequent Number Following Key In an Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/most-frequent-number-following-key-in-an-array](https://leetcode.com/problems/most-frequent-number-following-key-in-an-array)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Counter — O(n)](#3-approach)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

You are given a **0-indexed** integer array `nums`. You are also given an integer `key`, which is present in `nums`.

For every unique integer `target` in `nums`, **count** the number of times `target` immediately follows an occurrence of `key` in `nums`. In other words, count the number of indices `i` such that:

- `0 <= i <= nums.length - 2`,
- `nums[i] == key` and,
- `nums[i + 1] == target`.

Return *the* `target` *with the **maximum** count*. The test cases will be generated such that the `target` with maximum count is unique.

**Constraints:**
- `2 <= nums.length <= 1000`
- `1 <= nums[i] <= 1000`
- The test cases will be generated such that the answer is unique.

---

## 2. Key Insight

> Scan consecutive pairs. When `nums[i] == key`, count `nums[i+1]`. Return the most frequent.

---

## 3. Approach: Counter — O(n) ✅

```text
FUNCTION mostFrequent(nums, key):
    // count frequencies of numbers following key
    SET count ← empty map
    FOR i ← 0 TO LENGTH(nums) - 2:
        IF nums[i] == key:
            SET follower ← nums[i + 1]
            INCREMENT count[follower] BY 1
    // find number with max count
    SET result ← NONE
    SET maxFreq ← 0
    FOR each (num, freq) IN count:
        IF freq > maxFreq:
            SET maxFreq ← freq
            SET result ← num
    RETURN result
```

---

## 4. Examples

```
Example 1:
  Input: nums = [1,100,200,1,100], key = 1
  Output: 100
  Explanation: For target = 100, there are 2 occurrences at indices 1 and 4 which follow an occurrence of key.
  No other integers follow an occurrence of key, so we return 100.
```

```
Example 2:
  Input: nums = [2,2,2,2,3], key = 2
  Output: 2
  Explanation: For target = 2, there are 3 occurrences at indices 1, 2, and 3 which follow an occurrence of key.
  For target = 3, there is only one occurrence at index 4 which follows an occurrence of key.
  target = 2 has the maximum number of occurrences following an occurrence of key, so we return 2.
```

---

## 5. Walkthrough

| Step | i | nums[i] | Action | count map |
|------|---|----------|--------|-----------|
| 1 | 0 | 2 | equals key → increment count[2] | {2:1}
| 2 | 1 | 2 | equals key → increment count[1] | {2:1, 1:1}
| 3 | 2 | 1 | not key | {2:1, 1:1}
| 4 | 3 | 2 | equals key → increment count[3] | {2:1, 1:1, 3:1}
| 5 | 4 | 3 | not key | {2:1, 1:1, 3:1}
| 6 | 5 | 2 | equals key → increment count[1] | {2:1, 1:2, 3:1}
| 7 | 6 | 1 | not key | {2:1, 1:2, 3:1}
| End |   |   | max count is 2 for number 1 | result = 1

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(n) |

---

## 7. Key Takeaway

> **Scan pairs, count followers.** Simple frequency counting of the element after each occurrence of key.
