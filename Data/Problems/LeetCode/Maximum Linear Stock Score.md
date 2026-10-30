# 2898. Maximum Linear Stock Score

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-linear-stock-score](https://leetcode.com/problems/maximum-linear-stock-score)
**Companies:** Amazon

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

Given a **1-indexed** integer array `prices`, where `prices[i]` is the price of a particular stock on the `i^th` day, your task is to select some of the elements of `prices` such that your selection is **linear**.

A selection `indexes`, where `indexes` is a **1-indexed** integer array of length `k` which is a subsequence of the array `[1, 2, ..., n]`, is **linear** if:

- For every `1 < j <= k`, `prices[indexes[j]] - prices[indexes[j - 1]] == indexes[j] - indexes[j - 1]`.

A **subsequence** is an array that can be derived from another array by deleting some or no elements without changing the order of the remaining elements.

The **score** of a selection `indexes`, is equal to the sum of the following array: `[prices[indexes[1]], prices[indexes[2]], ..., prices[indexes[k]]`.

Return *the **maximum** **score** that a linear selection can have*.

**Constraints:**
- `1 <= prices.length <= 10^5`
- `1 <= prices[i] <= 10^9`

---

## Examples

**Example 1:**
```
Input: prices = [1,5,3,7,8]
Output: 20
Explanation: We can select the indexes [2,4,5]. We show that our selection is linear:
For j = 2, we have:
indexes[2] - indexes[1] = 4 - 2 = 2.
prices[4] - prices[2] = 7 - 5 = 2.
For j = 3, we have:
indexes[3] - indexes[2] = 5 - 4 = 1.
prices[5] - prices[4] = 8 - 7 = 1.
The sum of the elements is: prices[2] + prices[4] + prices[5] = 20.
It can be shown that the maximum sum a linear selection can have is 20.
```

**Example 2:**
```
Input: prices = [5,6,7,8,9]
Output: 35
Explanation: We can select all of the indexes [1,2,3,4,5]. Since each element has a difference of exactly 1 from its previous element, our selection is linear.
The sum of all the elements is 35 which is the maximum possible some out of every selection.
```

---

## Key Insight

> If we define `key[i] = prices[i] - i`, then all elements with the same key can be part of the same linear subsequence. The maximum score is the **maximum group sum** over all keys.

---

## Approach

```
FUNCTION maxScore(prices)
    groups ← HashMap()

    FOR i ← 0 TO len(prices) - 1 DO
        key ← prices[i] - i
        groups[key] ← groups.getOrDefault(key, 0) + prices[i]

    RETURN MAX(groups.values())
END FUNCTION
```

---

## Walkthrough

```
prices = [5, 6, 7, 8, 9]   (1-indexed: i = 1..5)
```

| i | prices[i] | key = prices[i] - i | Group sum |
|---|-----------|---------------------|-----------|
| 1 | 5         | 4                   | 5         |
| 2 | 6         | 4                   | 11        |
| 3 | 7         | 4                   | 18        |
| 4 | 8         | 4                   | 26        |
| 5 | 9         | 4                   | **35**    |

All elements share key=4. **Result: 35** ✅

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(n)** — single pass with hash map |
| Space  | **O(n)** — hash map for group sums |

---

## Follow-Up Questions

1. **Why does grouping by `prices[i] - i` work?**
   For a valid linear subsequence at indices `i, j`: `prices[i] - prices[j] = i - j` ↔ `prices[i] - i = prices[j] - j`.

2. **What if we wanted the longest such subsequence instead of max sum?**
   Count elements per group instead of summing. Return the max count.

3. **What if negative prices were allowed?**
   Same algorithm works — just be careful that the max sum could be negative.

---

## Key Takeaway

> **Algebraic rearrangement** (`prices[i] - i` as a grouping key) reduces a seemingly complex subsequence problem to a simple hash map aggregation in O(n).
