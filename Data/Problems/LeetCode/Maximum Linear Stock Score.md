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

Given a **1-indexed** integer array `prices` of length `n` representing stock prices, the **linear stock score** of a subsequence is the sum of prices in the subsequence. The constraint is that the selected indices must form an **arithmetic progression** with difference equal to 1 when mapped: specifically, you pick indices `i1 < i2 < ... < ik` such that `prices[i1] - i1 == prices[i2] - i2 == ... == prices[ik] - ik`.

Return the **maximum sum** of such a valid subsequence.

**Constraints:**
- `1 <= n <= 10^5`
- `1 <= prices[i] <= 10^9`

---

## Examples

**Example 1:**
```
Input:  prices = [1, 5, 3, 7, 8]
Output: 20
Explanation: Pick indices 2,3,4,5 → prices[2]-2=3, prices[3]-3=0... 
Actually group by (prices[i]-i): elements with same key can be summed.
```

**Example 2:**
```
Input:  prices = [5, 6, 7, 8, 9]
Output: 35
Explanation: All have prices[i]-i = 4, so take all. Sum = 35.
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
