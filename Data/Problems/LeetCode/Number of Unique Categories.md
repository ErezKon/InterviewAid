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

> *Note: premium problem — statement verified via doocs/leetcode.*

You are given an integer `n` and an object `categoryHandler` of class `CategoryHandler`.

There are `n `elements, numbered from `0` to `n - 1`. Each element has a category, and your task is to find the number of unique categories.

The class `CategoryHandler` contains the following function, which may help you:

- `boolean haveSameCategory(integer a, integer b)`: Returns `true` if `a` and `b` are in the same category and `false` otherwise. Also, if either `a` or `b` is not a valid number (i.e. it's greater than or equal to `n`or less than `0`), it returns `false`.

Return *the number of unique categories.*

**Constraints:**
- `1 <= n <= 100`

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
Input: n = 6, categoryHandler = [1,1,2,2,3,3]
Output: 3
Explanation: There are 6 elements in this example. The first two elements belong to category 1, the second two belong to category 2, and the last two elements belong to category 3. So there are 3 unique categories.
```

**Example 2:**
```
Input: n = 5, categoryHandler = [1,2,3,4,5]
Output: 5
Explanation: There are 5 elements in this example. Each element belongs to a unique category. So there are 5 unique categories.
```

**Example 3:**
```
Input: n = 3, categoryHandler = [1,1,1]
Output: 1
Explanation: There are 3 elements in this example. All of them belong to one category. So there is only 1 unique category.
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
