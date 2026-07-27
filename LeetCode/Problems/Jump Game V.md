# 1340. Jump Game V

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/jump-game-v](https://leetcode.com/problems/jump-game-v)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: DP (Sort by Height) — O(n·d) ✅](#4-approach-dp-sort-by-height--ond-)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Key Takeaway](#6-key-takeaway)

---

## 1. Problem Description

Given an array `arr` and integer `d`, from index `i` you can jump to `i+x` or `i-x` (1 ≤ x ≤ d) only if:
- `arr[i] > arr[j]` for all intermediate indices `j` between `i` and the target.

Return the **maximum number of indices** you can visit starting from any index.

**Constraints:**
- `1 <= arr.length <= 1000`
- `1 <= d <= arr.length`

---

## 2. Examples

```
Input: arr = [6,4,14,6,8,13,9,7,10,6,12], d = 2
Output: 4
```

---

## 3. Key Insight

You can only jump to **strictly shorter** positions. Process indices from shortest to tallest. `dp[i]` = max indices visitable starting from `i`. For each `i`, look left and right up to `d` steps, stopping when a taller or equal bar is encountered.

---

## 4. Approach: DP (Sort by Height) — O(n·d) ✅

```
FUNCTION maxJumps(arr, d):
    n = len(arr)
    dp = [1] * n   // at least visit self

    // Process in increasing height order
    FOR idx IN sortedIndicesByHeight(arr):
        // Check left
        FOR j ← idx-1 DOWN TO MAX(0, idx-d):
            IF arr[j] >= arr[idx]: BREAK
            dp[idx] = MAX(dp[idx], dp[j] + 1)
        // Check right
        FOR j ← idx+1 TO MIN(n-1, idx+d):
            IF arr[j] >= arr[idx]: BREAK
            dp[idx] = MAX(dp[idx], dp[j] + 1)

    RETURN MAX(dp)
```

---

## 5. Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| Time | O(n·d) | For each index, scan up to d left and d right |
| Space | O(n) | DP array |

---

## 6. Key Takeaway

> Process from shortest to tallest — when computing `dp[i]`, all shorter neighbors are already computed. The "only jump to shorter" constraint creates a DAG, enabling bottom-up DP.
