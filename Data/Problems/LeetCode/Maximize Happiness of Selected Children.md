# 3075. Maximize Happiness of Selected Children

**Difficulty:** 🟡 Medium
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

Given an array `happiness` of children's happiness values and an integer `k`, select `k` children one at a time. Each time you select a child, **all unselected children's happiness decreases by 1** (minimum 0). Return the **maximum total happiness** you can collect.

**Constraints:**
- `1 ≤ n ≤ 2 × 10⁵`
- `1 ≤ happiness[i] ≤ 10⁸`
- `1 ≤ k ≤ n`

---

## Examples

**Example 1:**
```
Input:  happiness = [1,2,3], k = 2
Output: 4
Explanation: Pick 3 first (3), then 2 - 1 = 1. Total = 3 + 1 = 4.
```

**Example 2:**
```
Input:  happiness = [1,1,1,1], k = 2
Output: 1
Explanation: Pick 1 first (1), then 1-1 = 0. Total = 1 + 0 = 1.
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
