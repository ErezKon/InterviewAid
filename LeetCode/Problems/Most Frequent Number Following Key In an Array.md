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

Given array `nums` and integer `key`, find the number that most frequently appears immediately **after** `key` in the array.

**Constraints:**
- `2 <= nums.length <= 1000`

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

**Example 1:**
```
Input: nums = [2,2,1,2,3,2,1,2], key = 2
Output: 1
Explanation: Numbers after 2 are [2,1,3,1]. The most frequent is 1.
```

**Example 2:**
```
Input: nums = [1,2,3,4,5], key = 3
Output: 4
Explanation: Only one occurrence of 3, followed by 4.
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
