# 2306. Naming a Company

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/naming-a-company](https://leetcode.com/problems/naming-a-company)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Group by First Letter — O(n · 26)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given array of strings `ideas`, form a company name by swapping the first letters of two different ideas. The name is valid if neither swapped idea already exists in `ideas`. Return the number of valid distinct names.

**Constraints:**
- `2 <= ideas.length <= 5 × 10⁴`

---

## 2. Key Insight

> Group suffixes by their first letter. For two groups `A` and `B` (first letters `a` and `b`), count common suffixes `c`. Valid pairs = `2 × (|A| - c) × (|B| - c)`. Suffixes that exist in both groups would cause collision when swapped.

---

## 3. Approach: Group by First Letter — O(n · 26) ✅

```
FUNCTION distinctNames(ideas):
    groups = [set() for _ in range(26)]
    FOR idea IN ideas:
        groups[idea[0] - 'a'].ADD(idea[1:])

    ans = 0
    FOR i ← 0 TO 25:
        FOR j ← i + 1 TO 25:
            common = len(groups[i] & groups[j])
            ans += 2 * (len(groups[i]) - common) * (len(groups[j]) - common)

    RETURN ans
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n · 26) for set intersections |
| **Space** | O(n) |

---

## 5. Key Takeaway

> **Group by first letter, count non-overlapping suffixes.** Common suffixes between two groups cause invalid swaps. Exclusion principle: `(|A| - common) × (|B| - common)` valid pairs per letter pair.
