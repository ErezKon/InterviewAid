# 1798. Maximum Number of Consecutive Values You Can Make

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-number-of-consecutive-values-you-can-make](https://leetcode.com/problems/maximum-number-of-consecutive-values-you-can-make)
**Companies:** Infosys

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

Given an integer array `coins` of length `n`, return the **maximum** number of **consecutive** integer values starting from `0` that you can make using subsets of the coins.

**Constraints:**
- `1 <= coins.length <= 4 × 10^4`
- `1 <= coins[i] <= 4 × 10^4`

---

## Examples

**Example 1:**
```
Input:  coins = [1, 3]
Output: 2
Explanation: Can make 0 and 1. Can't make 2 (gap). Answer = 2 values (0, 1).
```

**Example 2:**
```
Input:  coins = [1, 1, 1, 4]
Output: 8
Explanation: Can make 0,1,2,3 (using 1s), then adding 4: 4,5,6,7. Total 0-7 = 8 values.
```

---

## Key Insight

> Sort coins. Maintain `reach` = the current maximum consecutive value we can form (starting from 0). For each coin: if `coin ≤ reach + 1`, we extend our range to `reach + coin`. Otherwise, there's a gap.

This is the same insight as the classic "minimum number of coins to make change" greedy.

---

## Approach

```
FUNCTION getMaximumConsecutive(coins)
    SORT coins
    reach ← 0     // can make [0..reach]

    FOR each coin IN coins DO
        IF coin > reach + 1 THEN
            BREAK   // gap found
        reach ← reach + coin

    RETURN reach + 1   // number of consecutive values [0..reach]
END FUNCTION
```

---

## Walkthrough

```
coins = [1, 1, 1, 4]  →  sorted: [1, 1, 1, 4]
```

| Step | coin | reach before | coin ≤ reach+1? | reach after |
|------|------|-------------|-----------------|-------------|
| 1    | 1    | 0           | 1 ≤ 1 ✅        | 1           |
| 2    | 1    | 1           | 1 ≤ 2 ✅        | 2           |
| 3    | 1    | 2           | 1 ≤ 3 ✅        | 3           |
| 4    | 4    | 3           | 4 ≤ 4 ✅        | 7           |

**Result: 7 + 1 = 8** ✅ (values 0 through 7)

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(n log n)** — sorting |
| Space  | **O(1)** — single variable |

---

## Follow-Up Questions

1. **Why does this greedy work?**
   If we can make [0..reach], adding any coin ≤ reach+1 extends the range to [0..reach+coin] because we can combine it with every existing value.

2. **What if coins had duplicates?**
   Works the same — each coin is processed individually.

3. **How does this relate to "Patching Array" (LeetCode 330)?**
   Patching Array asks: how many coins must you ADD to reach a target? Same greedy framework but with insertion.

---

## Key Takeaway

> **Greedy range extension**: sort and expand `[0..reach]` by each coin — if `coin ≤ reach + 1`, we bridge the gap. This elegant O(n log n) pattern solves a family of consecutive-sum problems.
