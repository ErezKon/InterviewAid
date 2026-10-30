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

Given an array of integers `arr` and an integer `d`. In one step you can jump from index `i` to index:

- `i + x` where: `i + x < arr.length` and ` 0 < x <= d`.
- `i - x` where: `i - x >= 0` and ` 0 < x <= d`.

In addition, you can only jump from index `i` to index `j` if `arr[i] > arr[j]` and `arr[i] > arr[k]` for all indices `k` between `i` and `j` (More formally `min(i, j) < k < max(i, j)`).

You can choose any index of the array and start jumping. Return *the maximum number of indices* you can visit.

Notice that you can not jump outside of the array at any time.

**Constraints:**
- `1 <= arr.length <= 1000`
- `1 <= arr[i] <= 10^5`
- `1 <= d <= arr.length`

---

## 2. Examples

**Example 1:**
```
Input: arr = [6,4,14,6,8,13,9,7,10,6,12], d = 2
Output: 4
Explanation: You can start at index 10. You can jump 10 --> 8 --> 6 --> 7 as shown.
Note that if you start at index 6 you can only jump to index 7. You cannot jump to index 5 because 13 > 9. You cannot jump to index 4 because index 5 is between index 4 and 6 and 13 > 9.
Similarly You cannot jump from index 3 to index 2 or index 1.
```

**Example 2:**
```
Input: arr = [3,3,3,3,3], d = 3
Output: 1
Explanation: You can start at any index. You always cannot jump to any index.
```

**Example 3:**
```
Input: arr = [7,6,5,4,3,2,1], d = 1
Output: 7
Explanation: Start at index 0. You can visit all the indicies.
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
