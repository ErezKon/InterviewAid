# 1274. Number of Ships in a Rectangle

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/number-of-ships-in-a-rectangle](https://leetcode.com/problems/number-of-ships-in-a-rectangle)
**Companies:** Applied Intuition, Bloomberg

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach](#3-approach)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

You are given an API `hasShips(topRight, bottomLeft)` that returns `true` if there is at least one ship inside the axis‑aligned rectangle defined by the two points `topRight` and `bottomLeft`. The board is a 2‑D grid of size `10⁹ × 10⁹` and contains at most 10 ships. Implement a function that returns the exact number of ships inside a given rectangle while making as few API calls as possible.

---

## 2. Examples

**Example 1:**
```
Input: topRight = (2, 2), bottomLeft = (0, 0)
Output: 1
Explanation: There is exactly one ship in the rectangle.
```

**Example 2:**
```
Input: topRight = (5, 5), bottomLeft = (0, 0)
Output: 3
Explanation: Three ships are located within the larger rectangle.
```

---

## 3. Approach

**Algorithm:** Quad‑tree divide and conquer with API pruning.

Recursively split the current rectangle into four quadrants. Before recursing, call `hasShips` on each quadrant; if it returns `false`, that quadrant contains no ships and can be discarded. The recursion stops when the rectangle collapses to a single point, at which point a ship is counted if `hasShips` is `true`.

**Pseudocode:**
```text
FUNCTION countShips(topRight, bottomLeft):
    // Base cases
    IF bottomLeft.x > topRight.x OR bottomLeft.y > topRight.y:
        RETURN 0
    IF NOT hasShips(topRight, bottomLeft):
        RETURN 0
    IF topRight == bottomLeft:
        RETURN 1

    // Compute mid points (integer division)
    SET midX ← (bottomLeft.x + topRight.x) DIV 2
    SET midY ← (bottomLeft.y + topRight.y) DIV 2

    // Recurse on four sub‑rectangles
    RETURN countShips((midX, midY), bottomLeft) +
           countShips((midX, topRight.y), (bottomLeft.x, midY + 1)) +
           countShips(topRight, (midX + 1, midY + 1)) +
           countShips((topRight.x, midY), (midX + 1, bottomLeft.y))
```

---

## 4. Walkthrough

Assume ships are located at points `(1,1)`, `(3,4)`, and `(6,2)` and we query the rectangle `bottomLeft = (0,0)`, `topRight = (7,5)`.

1. Call `hasShips((7,5),(0,0))` → `true`.
2. Split at `midX = 3`, `midY = 2` → four quadrants:
   - Q1: `(3,2),(0,0)` → contains ship `(1,1)` → recurse → eventually counts 1.
   - Q2: `(3,5),(0,3)` → contains ship `(3,4)` → recurse → counts 1.
   - Q3: `(7,5),(4,3)` → contains ship `(6,2)`? No, y‑range excludes it → `hasShips` false → 0.
   - Q4: `(7,2),(4,0)` → contains ship `(6,2)` → recurse → counts 1.
3. Sum of counts = 3, which matches the expected answer.

---

## 5. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(S · log(area)) where `S` is the number of ships |
| **Space** | O(log(area)) recursion depth |

---

## 6. Follow-Up Questions

1. How would the solution change if the API returned the exact count of ships in a rectangle instead of a boolean?
2. Can you adapt the algorithm for a three‑dimensional space with a similar `hasShips3D` API?
3. What optimizations are possible if ships are known to be clustered in a small region?

---

## 7. Key Takeaway

> **Quad‑tree search with API pruning** efficiently locates a few ships in a huge grid by discarding empty quadrants early, achieving near‑optimal query complexity.
