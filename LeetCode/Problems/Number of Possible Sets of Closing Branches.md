# 2959. Number of Possible Sets of Closing Branches

**Difficulty:** 🔴 Hard

**Companies:** Atlassian, Meesho, Ta Digital

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

Given `n` branches (0-indexed) and a weighted undirected graph representing roads between them, along with an integer `maxDistance`, determine how many subsets of branches can be **closed** such that every pair of **remaining** (open) branches has a shortest‑path distance ≤ `maxDistance`.  `n ≤ 10`.

---

## 2. Examples

**Example 1**
```
Input: n = 3, edges = [[0,1,2],[1,2,2],[0,2,5]], maxDistance = 4
Output: 4
Explanation: The possible sets of closed branches are:
- {}   (all branches open, distances 2,2,4 ≤ 4)
- {0}  (branches 1 and 2 remain, distance 2 ≤ 4)
- {2}  (branches 0 and 1 remain, distance 2 ≤ 4)
- {0,2} (only branch 1 remains, trivially satisfies the condition)
```

**Example 2**
```
Input: n = 4, edges = [[0,1,1],[1,2,1],[2,3,1],[0,3,10]], maxDistance = 2
Output: 5
Explanation: Valid closed sets are {}, {0}, {3}, {0,3}, {1,2}.
```

---

## 3. Approach

The small bound `n ≤ 10` enables **bitmask enumeration** of all `2ⁿ` subsets of branches to close. For each subset:
1. Derive the set of open branches.
2. Run **Floyd‑Warshall** on the original graph to obtain all‑pairs shortest paths.
3. Verify that every pair of open branches has distance ≤ `maxDistance`.
If the check passes, count the subset.

---

## 4. Walkthrough

Consider Example 1 (`n = 3`).
| Bitmask | Closed Branches | Open Branches | Pairwise Distances | Valid? |
|---------|----------------|--------------|--------------------|--------|
| 000     | {}             | {0,1,2}      | 0‑1:2, 1‑2:2, 0‑2:4 | ✅ |
| 001     | {0}            | {1,2}        | 1‑2:2               | ✅ |
| 010     | {1}            | {0,2}        | 0‑2:4               | ✅ |
| 011     | {0,1}          | {2}          | (single node)      | ✅ |
| 100     | {2}            | {0,1}        | 0‑1:2               | ✅ |
| 101     | {0,2}          | {1}          | (single node)      | ✅ |
| 110     | {1,2}          | {0}          | (single node)      | ✅ |
| 111     | {0,1,2}        | {}           | (empty)            | ✅ |
All eight subsets satisfy the distance constraint, but the problem asks for **closed** sets, so we count the seven where at least one branch remains open, yielding `4` distinct valid closed sets as listed.

---

## 5. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | `O(2ⁿ · n³)` – enumerate subsets and run Floyd‑Warshall (`n³`) for each. |
| **Space** | `O(n²)` – distance matrix for Floyd‑Warshall. |

---

## 6. Follow-Up Questions

1. How would the solution change if `n` were up to 10⁵? (Consider Union‑Find or MST based approaches.)
2. What if the distance constraint applied only to a specific **root** branch instead of all pairs?
3. Can the problem be solved using **bitmask DP** to avoid recomputing Floyd‑Warshall for every subset?

---

## 7. Key Takeaway

> When `n` is tiny, exhaustive bitmask enumeration combined with an all‑pairs shortest‑path check (Floyd‑Warshall) provides a simple yet powerful way to evaluate every possible subset.
