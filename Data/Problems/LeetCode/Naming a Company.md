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

You are given an array of strings `ideas` that represents a list of names to be used in the process of naming a company. The process of naming a company is as follows:

- Choose 2 **distinct** names from `ideas`, call them `idea_A` and `idea_B`.
- Swap the first letters of `idea_A` and `idea_B` with each other.
- If **both** of the new names are not found in the original `ideas`, then the name `idea_A idea_B` (the **concatenation** of `idea_A` and `idea_B`, separated by a space) is a valid company name.
- Otherwise, it is not a valid name.

Return *the number of **distinct** valid names for the company*.

**Constraints:**
- `2 <= ideas.length <= 5 * 10^4`
- `1 <= ideas[i].length <= 10`
- `ideas[i]` consists of lowercase English letters.
- All the strings in `ideas` are **unique**.

---

## 2. Examples

**Example 1:**
```
Input: ideas = ["coffee","donuts","time","toffee"]
Output: 6
Explanation: The following selections are valid:
- ("coffee", "donuts"): The company name created is "doffee conuts".
- ("donuts", "coffee"): The company name created is "conuts doffee".
- ("donuts", "time"): The company name created is "tonuts dime".
- ("donuts", "toffee"): The company name created is "tonuts doffee".
- ("time", "donuts"): The company name created is "dime tonuts".
- ("toffee", "donuts"): The company name created is "doffee tonuts".
Therefore, there are a total of 6 distinct company names.
The following are some examples of invalid selections:
- ("coffee", "time"): The name "toffee" formed after swapping already exists in the original array.
- ("time", "toffee"): Both names are still the same after swapping and exist in the original array.
- ("coffee", "toffee"): Both names formed after swapping already exist in the original array.
```

**Example 2:**
```
Input: ideas = ["lack","back"]
Output: 0
Explanation: There are no valid selections. Therefore, 0 is returned.
```

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
