# 3318. Find X-Sum of All K-Long Subarrays I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-x-sum-of-all-k-long-subarrays-i](https://leetcode.com/problems/find-x-sum-of-all-k-long-subarrays-i)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Brute Force per Window — O(n · k log k) ✅](#3-approach-brute-force-per-window)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Examples](#5-examples)
6. [Walkthrough](#6-walkthrough)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

For each window of size `k`, compute the **x-sum**: sum of `val × freq` for the top‑x most frequent elements (ties broken by value).

**Constraints:**
- `1 <= k <= n <= 50`

---

## 2. Key Insight

> With small constraints, count frequencies per window, sort by (frequency, value) descending, take top x entries, and sum their contributions.

---

## 3. Approach: Brute Force per Window — O(n · k log k) ✅

```text
FUNCTION findXSum(nums, k, x):
    result ← []
    n ← LENGTH(nums)
    FOR i ← 0 TO n - k DO
        window ← nums[i : i + k]
        count ← COUNTER(window)               // frequency map
        top ← SORT(count.items(), KEY = (freq, value), DESCENDING)[:x]
        sum ← 0
        FOR (val, freq) IN top DO
            sum ← sum + val * freq
        END FOR
        APPEND sum TO result
    END FOR
    RETURN result
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n · k log k) |
| **Space** | O(k) |

---

## 5. Examples

**Example 1:**
```
nums = [1,2,2,3,3], k = 3, x = 2
```
- Windows: `[1,2,2]`, `[2,2,3]`, `[2,3,3]`
- Top‑2 frequencies per window give sums `1*1 + 2*2 = 5`, `2*2 + 3*1 = 7`, `3*2 + 2*1 = 8`
- Output: `[5,7,8]`

**Example 2:**
```
nums = [4,4,4,4], k = 2, x = 1
```
- Every window has the same element `4` with frequency `2`
- Sum = `4 * 2 = 8` for each window
- Output: `[8,8,8]`

---

## 6. Walkthrough

Consider the first example step‑by‑step:
| Window indices | Window values | Frequency map | Top‑2 (value, freq) | Sum |
|----------------|---------------|---------------|--------------------|-----|
| 0‑2            | 1,2,2         | {1:1,2:2}     | (2,2), (1,1)       | 2*2+1*1 = 5 |
| 1‑3            | 2,2,3         | {2:2,3:1}     | (2,2), (3,1)       | 2*2+3*1 = 7 |
| 2‑4            | 2,3,3         | {2:1,3:2}     | (3,2), (2,1)       | 3*2+2*1 = 8 |

---

## 7. Follow-Up Questions
- How would you adapt the solution for `n, k ≤ 10⁵`?
- Can you maintain the top‑x frequencies with a balanced BST to achieve O(n log n)?
- What if the tie‑breaking rule changes to prioritize smaller values?

---

## 8. Key Takeaway

> For small constraints, a straightforward frequency count per window combined with sorting yields a simple and correct solution. The hard version requires a sliding‑window data structure to keep the top‑x frequencies efficiently.
