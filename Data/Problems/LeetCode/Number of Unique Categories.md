# 2782. Number of Unique Categories

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-unique-categories](https://leetcode.com/problems/number-of-unique-categories)
**Companies:** Amazon

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Union-Find with API — O(n²)](#3-approach)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given `n` items and an API `haveSameCategory(a, b)`, find the number of unique categories.

---

## 2. Key Insight

> Use Union-Find. For each pair, if `haveSameCategory` returns true, union them. Count distinct roots.

---

## 3. Approach: Union-Find with API — O(n²) ✅

```text
FUNCTION numberOfCategories(n, categoryHandler):
    parent ← [0..n-1]
    FUNCTION find(x):
        WHILE parent[x] != x:
            x ← parent[x]
        RETURN x
    FUNCTION union(a, b):
        ra ← find(a)
        rb ← find(b)
        IF ra != rb:
            parent[rb] ← ra
    FOR i ← 0 TO n-1:
        FOR j ← i+1 TO n-1:
            IF categoryHandler.haveSameCategory(i, j):
                union(i, j)
    SET roots ← EMPTY SET
    FOR i ← 0 TO n-1:
        roots.ADD(find(i))
    RETURN SIZE(roots)
```

---

## 4. Examples

**Example 1:**
```
Input: n = 4, haveSameCategory pairs = [(0,1), (2,3)]
Output: 2
Explanation: Items {0,1} form one category, {2,3} another.
```

**Example 2:**
```
Input: n = 3, haveSameCategory pairs = []
Output: 3
Explanation: No items share a category, each is unique.
```

---

## 5. Walkthrough

| Step | i | j | Action | Union performed? | Current sets |
|------|---|---|--------|------------------|--------------|
| 1 | 0 | 1 | API true | union(0,1) | {0,1}, {2}, {3} |
| 2 | 0 | 2 | API false | — | unchanged |
| 3 | 0 | 3 | API false | — | unchanged |
| 4 | 1 | 2 | API false | — | unchanged |
| 5 | 1 | 3 | API false | — | unchanged |
| 6 | 2 | 3 | API true | union(2,3) | {0,1}, {2,3} |

After processing all pairs, two distinct roots remain → 2 categories.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n² · α(n)) (α = inverse Ackermann) |
| **Space** | O(n) |

---

## 7. Follow-Up Questions

- How would you reduce the number of API calls if the API were expensive?
- Can you adapt the solution for a streaming scenario where items arrive online?
- What changes if the API also provides a `mergeCategories(a, b)` operation?

---

## 8. Key Takeaway

> **Union-Find with black-box API.** When you can only query pairwise membership, check all pairs and union. Count connected components.
