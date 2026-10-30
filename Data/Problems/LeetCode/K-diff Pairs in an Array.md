# 532. K-diff Pairs in an Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/k-diff-pairs-in-an-array](https://leetcode.com/problems/k-diff-pairs-in-an-array)
**Companies:** Amazon, Apple, Bloomberg, Expedia, Google, Infosys, Microsoft, Salesforce, Tcs

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Hash Map — O(n) ✅](#4-approach-hash-map--on-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given an array of integers `nums` and an integer `k`, return *the number of **unique** k-diff pairs in the array*.

A **k-diff** pair is an integer pair `(nums[i], nums[j])`, where the following are true:

- `0 <= i, j < nums.length`
- `i != j`
- `|nums[i] - nums[j]| == k`

**Notice** that `|val|` denotes the absolute value of `val`.

**Constraints:**
- `1 <= nums.length <= 10^4`
- `-10^7 <= nums[i] <= 10^7`
- `0 <= k <= 10^7`

---

## 2. Examples

**Example 1:**
```
Input: nums = [3,1,4,1,5], k = 2
Output: 2
Explanation: There are two 2-diff pairs in the array, (1, 3) and (3, 5).
Although we have two 1s in the input, we should only return the number of unique pairs.
```

**Example 2:**
```
Input: nums = [1,2,3,4,5], k = 1
Output: 4
Explanation: There are four 1-diff pairs in the array, (1, 2), (2, 3), (3, 4) and (4, 5).
```

**Example 3:**
```
Input: nums = [1,3,1,5,4], k = 0
Output: 1
Explanation: There is one 0-diff pair in the array, (1, 1).
```

---

## 3. Key Insight

Use a **frequency counter**. Two cases:
- **k = 0:** Count numbers appearing ≥ 2 times (pair with itself).
- **k > 0:** For each unique number, check if `num + k` exists. Only check one direction to avoid double-counting.

---

## 4. Approach: Hash Map — O(n) ✅

```
FUNCTION findPairs(nums, k):
    count = Counter(nums)
    pairs = 0

    FOR num IN count:
        IF k == 0:
            IF count[num] >= 2: pairs += 1
        ELSE:
            IF num + k IN count: pairs += 1

    RETURN pairs
```

---

## 5. Walkthrough

```
nums = [3,1,4,1,5], k = 2
count = {3:1, 1:2, 4:1, 5:1}
```

| num | num + k | In count? | Pair? |
|-----|---------|-----------|-------|
| 3 | 5 | ✅ | (3,5) |
| 1 | 3 | ✅ | (1,3) |
| 4 | 6 | No | — |
| 5 | 7 | No | — |

**Result:** 2 pairs ✅

---

## 6. Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| Time | O(n) | Build counter + iterate unique elements |
| Space | O(n) | Counter |

---

## 7. Key Takeaway

> Frequency counter handles both k=0 (duplicates) and k>0 (complement lookup) cases elegantly. Only check `num + k` (not `num - k`) to avoid counting each pair twice.
