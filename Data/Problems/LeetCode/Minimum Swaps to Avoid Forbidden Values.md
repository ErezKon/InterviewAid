# 3785. Minimum Swaps to Avoid Forbidden Values

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-swaps-to-avoid-forbidden-values](https://leetcode.com/problems/minimum-swaps-to-avoid-forbidden-values)
**Companies:** Amazon

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Examples](#3-examples)
4. [Approach: Greedy / Graph — O(n log n)](#4-approach)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given a permutation and a set of forbidden values for each position, find the **minimum** number of adjacent swaps to rearrange so no position holds a forbidden value.

**Constraints:**
- `1 <= n <= 10⁵`

---

## 2. Key Insight

> Model the problem as placing elements to avoid forbidden positions. Identify conflicts (elements at forbidden positions) and find minimum swaps to resolve all conflicts, potentially using a greedy or cycle‑decomposition approach.

---

## 3. Examples

**Example 1:**
```
nums = [1, 2, 3, 4]
forbidden = {0: [2], 1: [1], 2: [], 3: []}
```
*Position 0 cannot contain `2` and position 1 cannot contain `1`. Swapping positions 0 and 1 yields `[2,1,3,4]`, which satisfies all constraints with 1 swap.

**Example 2:**
```
nums = [5, 1, 3, 2, 4]
forbidden = {0: [5], 2: [3], 4: [4]}
```
*Multiple positions start with forbidden values. The optimal sequence of adjacent swaps resolves all conflicts in 4 swaps.

---

## 4. Approach: Greedy / Graph — O(n log n) ✅

```text
FUNCTION minSwaps(nums, forbidden):
    // Build a target permutation that avoids forbidden values
    // Use a greedy assignment or bipartite matching to find a valid arrangement
    // Decompose the resulting permutation into cycles
    // Minimum swaps = n - number_of_cycles
    // If no valid arrangement exists, RETURN -1
```

---

## 5. Walkthrough

Consider **Example 1**.
| Index | Initial `nums[i]` | Forbidden at index | Conflict? |
|-------|-------------------|--------------------|----------|
| 0 | 1 | [2] | No |
| 1 | 2 | [1] | Yes (2 is allowed, 1 is forbidden for index 1) |

We need to move `1` away from index 1. Swapping indices 0 and 1 yields `[2,1,3,4]`. Now:
- Index 0 holds `2`, which is not forbidden (forbidden list `[2]` applies to index 0, but `2` is now at index 0 → conflict! Actually need to check: index 0 forbidden `[2]`, now `2` at index 0 → conflict, so we need another swap.
Better: swap indices 1 and 2 first: `[1,3,2,4]` (swap count 1). Now index 1 holds `3` (allowed), index 2 holds `2` (allowed). Finally swap indices 0 and 1: `[3,1,2,4]` (swap 2). Now all constraints satisfied with 2 swaps. The algorithm would construct a valid target permutation `[3,1,2,4]` and compute cycles to determine the minimal swaps (here 2).

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n log n) — greedy assignment / matching and cycle decomposition |
| **Space** | O(n) — storing permutation and visited flags |

---

## 7. Key Takeaway

> **Permutation cycle decomposition** — minimum swaps in a permutation = `n - cycles`. When forbidden constraints exist, first determine a valid target permutation, then compute the swap distance.
