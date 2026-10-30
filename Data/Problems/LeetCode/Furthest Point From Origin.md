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

You are given a string `moves` of length `n` consisting only of characters `'L'`, `'R'`, and `'_'`. The string represents your movement on a number line starting from the origin `0`.

In the `i^th` move, you can choose one of the following directions:

- move to the left if `moves[i] = 'L'` or `moves[i] = '_'`
- move to the right if `moves[i] = 'R'` or `moves[i] = '_'`

Return *the **distance from the origin** of the **furthest** point you can get to after *`n`* moves*.

**Constraints:**
- `1 <= moves.length == n <= 50`
- `moves` consists only of characters `'L'`, `'R'` and `'_'`.

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

**Example 1:**
```
Input: moves = "L_RL__R"
Output: 3
Explanation: The furthest point we can reach from the origin 0 is point -3 through the following sequence of moves "LLRLLLR".
```

**Example 2:**
```
Input: moves = "_R__LL_"
Output: 5
Explanation: The furthest point we can reach from the origin 0 is point -5 through the following sequence of moves "LRLLLLL".
```

**Example 3:**
```
Input: moves = "_______"
Output: 7
Explanation: The furthest point we can reach from the origin 0 is point 7 through the following sequence of moves "RRRRRRR".
```

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
