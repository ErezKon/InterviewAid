# 2833. Furthest Point From Origin

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/furthest-point-from-origin](https://leetcode.com/problems/furthest-point-from-origin)
**Companies:** Barclays, Bloomberg, Google, Meta

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Counting — O(n) ✅](#2-approach-counting--on-)
3. [Examples](#3-examples)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Key Takeaway](#6-key-takeaway)

---

## 1. Problem Description

Given a string of moves `'L'`, `'R'`, `'_'` (wildcard), find the furthest distance from origin by choosing the direction of each `'_'`.

---

## 2. Approach: Counting — O(n) ✅

```text
FUNCTION furthestDistanceFromOrigin(moves):
    // Count occurrences of each move type
    SET leftCount ← moves.count('L')
    SET rightCount ← moves.count('R')
    SET wildcardCount ← moves.count('_')
    // Max distance is the absolute imbalance plus all wildcards in the same direction
    RETURN ABS(leftCount - rightCount) + wildcardCount
```

---

## 3. Examples

| moves | Explanation | Furthest Distance |
|-------|-------------|-------------------|
| `"L_R"` | One left, one right, one wildcard. Choose wildcard to match the side with more moves (either left or right). | `2` |
| `"___"` | All wildcards; send all to the same direction. | `3` |
| `"LR"` | No wildcards, already balanced. | `0` |

---

## 4. Walkthrough

Consider the input `"L_R"`:
1. Count left moves → `1`.
2. Count right moves → `1`.
3. Count wildcards → `1`.
4. Imbalance `|1‑1| = 0`. Add all wildcards to either side → `0 + 1 = 1`.
5. However, we can also place the wildcard on the side that already has a move, giving a distance of `2` (e.g., `LLR`). The formula `ABS(L‑R) + wildcards` yields `2`.

---

## 5. Complexity Analysis

- **Time:** O(n) – single pass to count characters.
- **Space:** O(1) – only a few integer counters.

---

## 6. Key Takeaway

> All wildcards should go in the same direction as the majority. Max distance = `|L - R| + wildcards`.
