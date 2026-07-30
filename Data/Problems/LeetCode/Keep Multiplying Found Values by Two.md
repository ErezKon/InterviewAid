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

Given an array `nums` and integer `original`, repeatedly double `original` while it exists in the array. Return the final value.

---

## 2. Examples

| nums | original | Output |
|------|----------|--------|
| [3,5,6,1,12] | 3 | 24 |
| [2,7,9] | 4 | 4 |
| [1,2,4,8,16] | 2 | 32 |

*Explanation:* In the first example, 3 → 6 → 12 → 24, then 24 is not in the array.

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
| Time | O(n) – building the set and at most O(log max) doublings |
| Space | O(n) – storing the set of numbers |

---

## 7. Key Takeaway

> Use a hash set for constant‑time membership checks and repeatedly double the value until it no longer appears.
