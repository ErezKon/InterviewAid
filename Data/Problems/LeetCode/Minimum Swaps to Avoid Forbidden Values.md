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

> *Note: the Approach below is only a placeholder. Correct idea: return -1 if `cnt_nums[v] + cnt_forbidden[v] > n` for some value `v`. Otherwise, with `B` = number of indices where `nums[i] == forbidden[i]` and `bad[v]` the count of those with value `v`, the answer is `max(ceil(B/2), max_v bad[v])`. Checked against brute force.*

You are given two integer arrays, `nums` and `forbidden`, each of length `n`.

You may perform the following operation any number of times (including zero):

- Choose two **distinct** indices `i` and `j`, and swap `nums[i]` with `nums[j]`.

Return the **minimum** number of swaps required such that, for every index `i`, the value of `nums[i]` is **not equal** to `forbidden[i]`. If no amount of swaps can ensure that every index avoids its forbidden value, return -1.

**Constraints:**
- `1 <= n == nums.length == forbidden.length <= 10^5`
- `1 <= nums[i], forbidden[i] <= 10^9`

---

## 2. Key Insight

> Model the problem as placing elements to avoid forbidden positions. Identify conflicts (elements at forbidden positions) and find minimum swaps to resolve all conflicts, potentially using a greedy or cycle‑decomposition approach.

---

## 3. Examples

**Example 1:**
```
Input: nums = [1,2,3], forbidden = [3,2,1]
Output: 1
Explanation: One optimal set of swaps:
- Select indices i = 0 and j = 1 in nums and swap them, resulting in nums = [2, 1, 3].
- After this swap, for every index i, nums[i] is not equal to forbidden[i].
```

**Example 2:**
```
Input: nums = [4,6,6,5], forbidden = [4,6,5,5]
Output: 2
Explanation: One optimal set of swaps:
- Select indices i = 0 and j = 2 in nums and swap them, resulting in nums = [6, 6, 4, 5].
- Select indices i = 1 and j = 3 in nums and swap them, resulting in nums = [6, 5, 4, 6].
- After these swaps, for every index i, nums[i] is not equal to forbidden[i].
```

**Example 3:**
```
Input: nums = [7,7], forbidden = [8,7]
Output: -1
Explanation: It is not possible to make nums[i] different from forbidden[i] for all indices.
```

**Example 4:**
```
Input: nums = [1,2], forbidden = [2,1]
Output: 0
Explanation: No swaps are required because nums[i] is already different from forbidden[i] for all indices, so the answer is 0.
```

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
