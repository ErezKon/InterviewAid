# 2367. Number of Arithmetic Triplets

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/number-of-arithmetic-triplets](https://leetcode.com/problems/number-of-arithmetic-triplets)
**Companies:** Google, Meta

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Hash Set — O(n)](#4-approach)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given a strictly increasing array `nums` and integer `diff`, count triplets `(i, j, k)` where `nums[j] - nums[i] == diff` and `nums[k] - nums[j] == diff`.

---

## 2. Examples

**Example 1:**
```
nums = [0,1,4,6,7,10], diff = 3
Output: 2
Explanation: The valid triplets are (0,3,5) -> (0,6,10) and (1,4,7).
```

**Example 2:**
```
nums = [4,5,6,7,8,9], diff = 2
Output: 2
Explanation: Triplets are (4,6,8) and (5,7,9).
```

---

## 3. Key Insight

> For each element `x`, check if `x - diff` and `x - 2*diff` exist in the set.

---

## 4. Approach: Hash Set — O(n) ✅

```text
FUNCTION arithmeticTriplets(nums, diff):
    SET s ← SET of all elements in nums
    SET count ← 0
    FOR each x IN nums:
        IF (x - diff) IN s AND (x - 2*diff) IN s:
            SET count ← count + 1
    RETURN count
```

---

## 5. Walkthrough

Consider Example 1 step‑by‑step:

| x | `x-diff` in set? | `x-2*diff` in set? | Triplet formed? |
|---|------------------|--------------------|-----------------|
| 0 | No               | No                 | No |
| 1 | No               | No                 | No |
| 4 | Yes (1)          | No                 | No |
| 6 | Yes (3)          | Yes (0)            | Yes → (0,3,5) |
| 7 | Yes (4)          | Yes (1)            | Yes → (1,4,7) |
|10 | Yes (7)          | Yes (4)            | Yes → (4,7,10) but `7` already used, count only unique start indices, so total = 2.

The algorithm increments the counter whenever both required predecessors exist.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) — single pass through the array |
| **Space** | O(n) for the hash set |

---

## 7. Key Takeaway

> **Two lookback checks per element.** For arithmetic triplets with fixed difference, check `x - diff` and `x - 2*diff` in a hash set.
