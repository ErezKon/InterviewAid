# 1944. Number of Visible People in a Queue

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/number-of-visible-people-in-a-queue](https://leetcode.com/problems/number-of-visible-people-in-a-queue)
**Companies:** Amazon, Bloomberg, Citi, Doordash, Expedia, Google, Linkedin, Meesho, Meta, Microsoft, Nvidia, Oracle, Rippling, Salesforce, Servicenow, Tiktok, Waymo

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Monotonic Stack (right to left) — O(n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

For each person in a queue, count how many people to their right they can see (not blocked by a taller person in between).

---

## 2. Key Insight

> Monotonic decreasing stack from right. Pop everyone shorter (visible). If stack non-empty after popping, the top is also visible (first blocker).

---

## 3. Approach: Monotonic Stack (right to left) — O(n) ✅

```
FUNCTION canSeePersonsCount(heights):
    n = len(heights)
    result = [0] * n
    stack = []    // monotonic decreasing stack

    FOR i ← n - 1 DOWN TO 0:
        count = 0
        WHILE stack AND stack.TOP() < heights[i]:
            stack.POP()
            count += 1
        IF stack:
            count += 1    // can see the first taller person
        result[i] = count
        stack.PUSH(heights[i])

    RETURN result
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(n) |

---

## 5. Key Takeaway

> **Monotonic stack for visibility.** Person sees everyone they pop (shorter) plus the blocker (first taller). Each element pushed/popped at most once → O(n).
