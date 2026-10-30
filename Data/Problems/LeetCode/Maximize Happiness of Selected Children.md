# 3075. Maximize Happiness of Selected Children

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximize-happiness-of-selected-children](https://leetcode.com/problems/maximize-happiness-of-selected-children)
**Companies:** Amazon, Google, Microsoft

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Greedy Sort — O(n log n)](#approach-greedy-sort--on-log-n-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given an array `happiness` of length `n`, and a **positive** integer `k`.

There are `n` children standing in a queue, where the `i^th` child has **happiness value** `happiness[i]`. You want to select `k` children from these `n` children in `k` turns.

In each turn, when you select a child, the **happiness value** of all the children that have **not** been selected till now decreases by `1`. Note that the happiness value **cannot** become negative and gets decremented **only** if it is positive.

Return *the **maximum** sum of the happiness values of the selected children you can achieve by selecting *`k` *children*.

**Constraints:**
- `1 <= n == happiness.length <= 2 * 10^5`
- `1 <= happiness[i] <= 10^8`
- `1 <= k <= n`

---

## Examples

**Example 1:**
```
Input: happiness = [1,2,3], k = 2
Output: 4
Explanation: We can pick 2 children in the following way:
- Pick the child with the happiness value == 3. The happiness value of the remaining children becomes [0,1].
- Pick the child with the happiness value == 1. The happiness value of the remaining child becomes [0]. Note that the happiness value cannot become less than 0.
The sum of the happiness values of the selected children is 3 + 1 = 4.
```

**Example 2:**
```
Input: happiness = [1,1,1,1], k = 2
Output: 1
Explanation: We can pick 2 children in the following way:
- Pick any child with the happiness value == 1. The happiness value of the remaining children becomes [0,0,0].
- Pick the child with the happiness value == 0. The happiness value of the remaining child becomes [0,0].
The sum of the happiness values of the selected children is 1 + 0 = 1.
```

**Example 3:**
```
Input: happiness = [2,3,4,5], k = 1
Output: 5
Explanation: We can pick 1 child in the following way:
- Pick the child with the happiness value == 5. The happiness value of the remaining children becomes [1,2,3].
The sum of the happiness values of the selected children is 5.
```

---

## Key Insight

> The i-th child you pick (0-indexed) has their happiness reduced by `i` (since i rounds have passed, reducing all remaining values by 1 each round). So sort descending and greedily pick the happiest first: the i-th pick contributes `max(0, happiness[i] - i)`.

---

## Approach: Greedy Sort — O(n log n) ✅

```
FUNCTION maximumHappinessSum(happiness, k):
    SORT happiness DESC
    RETURN SUM(MAX(0, happiness[i] - i) for i in range(k))
```

---

## Walkthrough

```
happiness = [1, 2, 3], k = 2
sorted desc: [3, 2, 1]
```

| Pick i | happiness[i] | penalty (i) | contribution | total |
|--------|-------------|-------------|--------------|-------|
| 0      | 3           | 0           | 3            | 3     |
| 1      | 2           | 1           | 1            | **4** |

**Result:** 4 ✅

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Greedy Sort | **O(n log n)** | O(1) |

---

## Follow-Up Questions

**Q1: Why sort descending?**
Higher happiness values lose less percentage-wise to the penalty. Picking the happiest first maximizes the total before penalties erode the remaining values.

**Q2: What if the penalty were multiplicative instead of subtractive?**
Then the greedy ordering might differ — you'd need to compare ratios rather than differences.

**Q3: Why `max(0, ...)`?**
Happiness can't go negative. If the penalty exceeds the happiness, that child contributes 0.

---

## Key Takeaway

> **Sort descending + greedy pick with increasing penalty is the pattern for "select k items with diminishing values."** The i-th item picked suffers a penalty of i, so always pick the highest remaining value first.
