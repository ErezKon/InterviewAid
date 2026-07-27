# 339. Nested List Weight Sum

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/nested-list-weight-sum](https://leetcode.com/problems/nested-list-weight-sum)
**Companies:** Adobe, Amazon, Apple, Google, Linkedin, Meta, Oracle

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: DFS — O(n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given a nested list of integers, return the sum where each integer is multiplied by its **depth** (1-indexed).

---

## 2. Key Insight

> Recursive DFS: pass depth as parameter. Integers are multiplied by their depth; nested lists recurse with `depth + 1`.

---

## 3. Approach: DFS — O(n) ✅

```
FUNCTION depthSum(nestedList, depth=1):
    total = 0
    FOR item IN nestedList:
        IF item.isInteger():
            total += item.getInteger() * depth
        ELSE:
            total += depthSum(item.getList(), depth + 1)
    RETURN total
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) — each element visited once |
| **Space** | O(d) — recursion depth |

---

## 5. Key Takeaway

> **DFS with depth parameter.** Multiply values by nesting depth. Simple recursive traversal of a nested structure.
