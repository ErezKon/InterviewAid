# 2154. Keep Multiplying Found Values by Two

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/keep-multiplying-found-values-by-two](https://leetcode.com/problems/keep-multiplying-found-values-by-two)
**Companies:** Bloomberg, Goldman Sachs, Google, Meta

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Hash Set — O(n) ✅](#4-approach-hash-set---on---✅)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

You are given an array of integers `nums`. You are also given an integer `original` which is the first number that needs to be searched for in `nums`.

You then do the following steps:

- If `original` is found in `nums`, **multiply** it by two (i.e., set `original = 2 * original`).
- Otherwise, **stop** the process.
- **Repeat** this process with the new number as long as you keep finding the number.

Return *the **final** value of *`original`.

**Constraints:**
- `1 <= nums.length <= 1000`
- `1 <= nums[i], original <= 1000`

---

## 2. Examples

**Example 1:**
```
Input: nums = [5,3,6,1,12], original = 3
Output: 24
Explanation: - 3 is found in nums. 3 is multiplied by 2 to obtain 6.
- 6 is found in nums. 6 is multiplied by 2 to obtain 12.
- 12 is found in nums. 12 is multiplied by 2 to obtain 24.
- 24 is not found in nums. Thus, 24 is returned.
```

**Example 2:**
```
Input: nums = [2,7,9], original = 4
Output: 4
Explanation: - 4 is not found in nums. Thus, 4 is returned.
```

---

## 3. Key Insight

Using a hash set gives O(1) lookup for whether the current value exists, allowing the loop to double the value efficiently.

---

## 4. Approach: Hash Set — O(n) ✅

```text
FUNCTION findFinalValue(nums, original):
    SET s ← SET(nums)
    WHILE original IN s:
        SET original ← original * 2
    RETURN original
```

---

## 5. Walkthrough

**Example:** `nums = [3,5,6,1,12]`, `original = 3`

| Step | original | In set? | Action |
|------|----------|---------|--------|
| 1 | 3 | yes | double → 6 |
| 2 | 6 | yes | double → 12 |
| 3 | 12 | yes | double → 24 |
| 4 | 24 | no | stop, return 24 |

---

## 6. Complexity Analysis

| Metric | Value |
|--------|-------|
| Time | O(n) – building the set and at most O(log max) doublings |
| Space | O(n) – storing the set of numbers |

---

## 7. Key Takeaway

> Use a hash set for constant-time membership checks and repeatedly double the value until it no longer appears.
