# 3025. Find the Number of Ways to Place People I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-the-number-of-ways-to-place-people-i](https://leetcode.com/problems/find-the-number-of-ways-to-place-people-i)
**Companies:** Amazon, Bloomberg, Google, Meta

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Enumerate Pairs — O(n³) ✅](#3-approach-enumerate-pairs--on³-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given `n` points, count pairs `(i, j)` where point `i` is upper-left and point `j` is lower-right of an axis-aligned rectangle with no other points strictly inside.

**Constraints:**
- `2 <= n <= 50`

---

## 2. Key Insight

> For each ordered pair (Alice, Bob), check if Alice is upper-left (x ≤, y ≥) of Bob, then verify no third point lies strictly inside the rectangle.

---

## 3. Approach: Enumerate Pairs — O(n³) ✅

```
FUNCTION numberOfPairs(points):
    count = 0
    FOR i ← 0 TO n - 1:
        FOR j ← 0 TO n - 1:
            IF i == j: CONTINUE
            // Alice upper-left, Bob lower-right
            IF points[i][0] <= points[j][0] AND points[i][1] >= points[j][1]:
                // Check no other point inside rectangle
                valid = true
                FOR k: check if inside
                IF valid: count += 1
    RETURN count
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n³) — n² pairs × n checks |
| **Space** | O(1) |

---

## 5. Key Takeaway

> With n ≤ 50, brute force O(n³) works. For the Hard version (n ≤ 1000), sort by x ascending and y descending, then use a greedy scan tracking the maximum y seen.
