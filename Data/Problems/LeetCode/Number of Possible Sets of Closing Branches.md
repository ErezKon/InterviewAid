# 2959. Number of Possible Sets of Closing Branches

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/number-of-possible-sets-of-closing-branches](https://leetcode.com/problems/number-of-possible-sets-of-closing-branches)

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

There is a company with `n` branches across the country, some of which are connected by roads. Initially, all branches are reachable from each other by traveling some roads.

The company has realized that they are spending an excessive amount of time traveling between their branches. As a result, they have decided to close down some of these branches (**possibly none**). However, they want to ensure that the remaining branches have a distance of at most `maxDistance` from each other.

The **distance** between two branches is the **minimum** total traveled length needed to reach one branch from another.

You are given integers `n`, `maxDistance`, and a **0-indexed** 2D array `roads`, where `roads[i] = [u_i, v_i, w_i]` represents the **undirected** road between branches `u_i` and `v_i` with length `w_i`.

Return *the number of possible sets of closing branches, so that any branch has a distance of at most *`maxDistance`* from any other*.

**Note** that, after closing a branch, the company will no longer have access to any roads connected to it.

**Note** that, multiple roads are allowed.

**Constraints:**
- `1 <= n <= 10`
- `1 <= maxDistance <= 10^5`
- `0 <= roads.length <= 1000`
- `roads[i].length == 3`
- `0 <= u_i, v_i <= n - 1`
- `u_i != v_i`
- `1 <= w_i <= 1000`
- All branches are reachable from each other by traveling some roads.

---

## 2. Examples

**Example 1:**
```
Input: n = 3, maxDistance = 5, roads = [[0,1,2],[1,2,10],[0,2,10]]
Output: 5
Explanation: The possible sets of closing branches are:
- The set [2], after closing, active branches are [0,1] and they are reachable to each other within distance 2.
- The set [0,1], after closing, the active branch is [2].
- The set [1,2], after closing, the active branch is [0].
- The set [0,2], after closing, the active branch is [1].
- The set [0,1,2], after closing, there are no active branches.
It can be proven, that there are only 5 possible sets of closing branches.
```

**Example 2:**
```
Input: n = 3, maxDistance = 5, roads = [[0,1,20],[0,1,10],[1,2,2],[0,2,2]]
Output: 7
Explanation: The possible sets of closing branches are:
- The set [], after closing, active branches are [0,1,2] and they are reachable to each other within distance 4.
- The set [0], after closing, active branches are [1,2] and they are reachable to each other within distance 2.
- The set [1], after closing, active branches are [0,2] and they are reachable to each other within distance 2.
- The set [0,1], after closing, the active branch is [2].
- The set [1,2], after closing, the active branch is [0].
- The set [0,2], after closing, the active branch is [1].
- The set [0,1,2], after closing, there are no active branches.
It can be proven, that there are only 7 possible sets of closing branches.
```

**Example 3:**
```
Input: n = 1, maxDistance = 10, roads = []
Output: 2
Explanation: The possible sets of closing branches are:
- The set [], after closing, the active branch is [0].
- The set [0], after closing, there are no active branches.
It can be proven, that there are only 2 possible sets of closing branches.
```

---

## 3. Approach

The small bound `n ≤ 10` enables **bitmask enumeration** of all `2ⁿ` subsets of branches to close. For each subset:
1. Derive the set of open branches.
2. Run **Floyd-Warshall** on the original graph to obtain all-pairs shortest paths.
3. Verify that every pair of open branches has distance ≤ `maxDistance`.
If the check passes, count the subset.

---

## 4. Walkthrough

Consider Example 1 (`n = 3`).
| Bitmask | Closed Branches | Open Branches | Pairwise Distances | Valid? |
|---------|----------------|--------------|--------------------|--------|
| 000     | {}             | {0,1,2}      | 0-1:2, 1-2:2, 0-2:4 | ✅ |
| 001     | {0}            | {1,2}        | 1-2:2               | ✅ |
| 010     | {1}            | {0,2}        | 0-2:4               | ✅ |
| 011     | {0,1}          | {2}          | (single node)      | ✅ |
| 100     | {2}            | {0,1}        | 0-1:2               | ✅ |
| 101     | {0,2}          | {1}          | (single node)      | ✅ |
| 110     | {1,2}          | {0}          | (single node)      | ✅ |
| 111     | {0,1,2}        | {}           | (empty)            | ✅ |
All eight subsets satisfy the distance constraint, but the problem asks for **closed** sets, so we count the seven where at least one branch remains open, yielding `4` distinct valid closed sets as listed.

---

## 5. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | `O(2ⁿ · n³)` – enumerate subsets and run Floyd-Warshall (`n³`) for each. |
| **Space** | `O(n²)` – distance matrix for Floyd-Warshall. |

---

## 6. Follow-Up Questions

1. How would the solution change if `n` were up to 10⁵? (Consider Union-Find or MST based approaches.)
2. What if the distance constraint applied only to a specific **root** branch instead of all pairs?
3. Can the problem be solved using **bitmask DP** to avoid recomputing Floyd-Warshall for every subset?

---

## 7. Key Takeaway

> When `n` is tiny, exhaustive bitmask enumeration combined with an all-pairs shortest-path check (Floyd-Warshall) provides a simple yet powerful way to evaluate every possible subset.
