# 1512. Number of Good Pairs

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/number-of-good-pairs](https://leetcode.com/problems/number-of-good-pairs)
**Companies:** Accenture, Amazon, Bloomberg, Google, Htc, Meta, Microsoft, Sony, Tcs, Zoho

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Counter — O(n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Count pairs `(i, j)` where `i < j` and `nums[i] == nums[j]`.

---

## 2. Key Insight

> When we encounter a number that appeared `k` times before, it forms `k` new good pairs with the previous occurrences.

---

## 3. Approach: Counter — O(n) ✅

```text
FUNCTION numIdenticalPairs(nums):
    count ← MAP()
    pairs ← 0
    FOR num IN nums:
        pairs ← pairs + count.get(num, 0)
        count[num] ← count.get(num, 0) + 1
    RETURN pairs
```

---

## Examples

**Example 1:** `nums = [1,2,3,1,1,3]`

Pairs: `(0,3)`, `(0,4)`, `(3,4)`, `(2,5)` → total `4`.

**Example 2:** `nums = [1,1,1,1]`

All six possible index pairs are good → answer `6`.

---

## Walkthrough

For `nums = [1,2,3,1,1,3]`:

| Index | num | count before | new pairs added | cumulative pairs |
|-------|-----|--------------|----------------|------------------|
| 0 | 1 | {} | 0 | 0 |
| 1 | 2 | {1:1} | 0 | 0 |
| 2 | 3 | {1:1,2:1} | 0 | 0 |
| 3 | 1 | {1:1,2:1,3:1} | 1 (previous 1) | 1 |
| 4 | 1 | {1:2,2:1,3:1} | 2 (two previous 1s) | 3 |
| 5 | 3 | {1:3,2:1,3:1} | 1 (previous 3) | 4 |

The final count is `4`.

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(n) |

---

## 5. Key Takeaway

> **Accumulate before incrementing.** Each new occurrence of a value pairs with all previous occurrences. Classic counting pairs pattern.
