# 2282. Number of People That Can Be Seen in a Grid

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-people-that-can-be-seen-in-a-grid](https://leetcode.com/problems/number-of-people-that-can-be-seen-in-a-grid)
**Companies:** Uber

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Monotonic Stack per Row/Column — O(m·n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given a grid of heights, for each person count how many people they can see looking right and down (visibility blocked by taller people).

---

## 2. Key Insight

> Use monotonic decreasing stacks. For each row (looking right) and column (looking down), a person can see the next person, and can see past shorter people to the next taller-or-equal person.

---

## 3. Approach: Monotonic Stack per Row/Column — O(m·n) ✅

```
FUNCTION seePeople(heights):
    result = [[0]*n for _ in range(m)]

    // For each row, process right-to-left with monotonic stack
    FOR r ← 0 TO m-1:
        stack = []
        FOR c ← n-1 DOWNTO 0:
            count = 0
            WHILE stack AND heights[r][c] > stack[-1]:
                stack.POP(); count += 1
            IF stack: count += 1    // can see the blocking taller person
            result[r][c] += count
            stack.APPEND(heights[r][c])

    // Same for each column, process bottom-to-top
    // ...similar logic for columns

    RETURN result
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(m · n) |
| **Space** | O(max(m, n)) for stack |

---

## 5. Key Takeaway

> **Monotonic stack for visibility.** Process in reverse. Pop shorter people (visible), stop at taller-or-equal (also visible but blocks further). Count pops + 1 if stack non-empty.
