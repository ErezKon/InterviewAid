# 2833. Furthest Point From Origin

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/furthest-point-from-origin](https://leetcode.com/problems/furthest-point-from-origin)
**Companies:** Barclays, Bloomberg, Google, Meta

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Counting — O(n) ✅](#2-approach-counting--on-)
3. [Key Takeaway](#3-key-takeaway)

---

## 1. Problem Description

Given a string of moves `'L'`, `'R'`, `'_'` (wildcard), find the furthest distance from origin by choosing the direction of each `'_'`.

---

## 2. Approach: Counting — O(n) ✅

```
FUNCTION furthestDistanceFromOrigin(moves):
    L = moves.count('L'); R = moves.count('R'); U = moves.count('_')
    RETURN ABS(L - R) + U
```

---

## 3. Key Takeaway

> All wildcards should go in the same direction as the majority. Max distance = `|L - R| + wildcards`.
