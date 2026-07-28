# 2306. Naming a Company

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/naming-a-company](https://leetcode.com/problems/naming-a-company)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: Group by First Letter — O(n · 26)](#3-approach)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given an array of strings `ideas`, form a company name by swapping the first letters of two different ideas. The name is valid if neither swapped idea already exists in `ideas`. Return the number of valid distinct names.

**Constraints:**
- `2 <= ideas.length <= 5 × 10⁴`

---

## 2. Examples

| ideas | Output |
|-------|--------|
| `["coffee","donuts","time","toffee"]` | `6` |
| `["lack","back","black","lacking"]` | `0` |

*Explanation*: In the first example, swapping the first letters of "coffee" and "donuts" yields "doffee" and "conuts", both not present in the original list, contributing to the count. The total number of distinct valid names is 6.

---

## 3. Approach: Group by First Letter — O(n · 26) ✅

```text
FUNCTION distinctNames(ideas):
    groups ← ARRAY[26] OF SET
    FOR idea IN ideas:
        first ← ASCII(idea[0]) - ASCII('a')
        suffix ← SUBSTRING(idea, 1)
        groups[first].ADD(suffix)
    ans ← 0
    FOR i ← 0 TO 24:
        FOR j ← i + 1 TO 25:
            common ← SIZE( INTERSECTION(groups[i], groups[j]) )
            ans ← ans + 2 * (SIZE(groups[i]) - common) * (SIZE(groups[j]) - common)
    RETURN ans
```

---

## 4. Walkthrough

Consider `ideas = ["coffee","donuts","time","toffee"]`.

| Step | groups[2] (c) suffixes | groups[3] (d) suffixes | common | contribution |
|------|------------------------|------------------------|--------|--------------|
| Init | {"offee"} | {"onuts"} | 0 | 2 * (1-0)*(1-0) = 2 |
| Next pair (t & c) | {"offee"} | {"ime","offee"} | 1 ("offee") | 2 * (1-1)*(2-1) = 0 |
| Next pair (t & d) | {"ime","offee"} | {"onuts"} | 0 | 2 * (2-0)*(1-0) = 4 |
| Total | — | — | — | 2 + 4 = 6 |

The algorithm counts valid swaps for each pair of first‑letter groups, subtracting the suffixes that appear in both groups because they would create collisions.

---

## 5. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n · 26) for building groups and O(26²) for pairwise intersections |
| **Space** | O(n) to store suffix sets |

---

## 6. Follow-Up Questions

1. How would you adapt the solution if the alphabet were Unicode characters beyond 26 letters?
2. Can you compute the answer using bit‑mask representations for each suffix to speed up intersections?
3. How does the approach change if you must output the actual valid company names instead of just the count?

---

## 7. Key Takeaway

> **Group by first letter and count non‑overlapping suffixes.** The exclusion of common suffixes between two groups ensures swapped names remain unique.
