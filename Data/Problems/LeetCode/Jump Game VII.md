# 1871. Jump Game VII

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/jump-game-vii](https://leetcode.com/problems/jump-game-vii)
**Companies:** Amazon, Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: BFS with Pointer — O(n) ✅](#4-approach-bfs-with-pointer--on-)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Key Takeaway](#6-key-takeaway)

---

## 1. Problem Description

You are given a **0-indexed** binary string `s` and two integers `minJump` and `maxJump`. In the beginning, you are standing at index `0`, which is equal to `'0'`. You can move from index `i` to index `j` if the following conditions are fulfilled:

- `i + minJump <= j <= min(i + maxJump, s.length - 1)`, and
- `s[j] == '0'`.

Return `true`* if you can reach index *`s.length - 1`* in *`s`*, or *`false`* otherwise.*

**Constraints:**
- `2 <= s.length <= 10^5`
- `s[i]` is either `'0'` or `'1'`.
- `s[0] == '0'`
- `1 <= minJump <= maxJump < s.length`

---

## 2. Examples

**Example 1:**
```
Input: s = "011010", minJump = 2, maxJump = 3
Output: true
Explanation: In the first step, move from index 0 to index 3.
In the second step, move from index 3 to index 5.
```

**Example 2:**
```
Input: s = "01101110", minJump = 2, maxJump = 3
Output: false
```

---

## 3. Key Insight

Use BFS but track a **pointer** `farthest` to avoid re-scanning indices already added to the queue. At each step, only scan from `max(i + minJump, farthest + 1)` to `i + maxJump`.

---

## 4. Approach: BFS with Pointer — O(n) ✅

```
FUNCTION canReach(s, minJump, maxJump):
    IF s[-1] != '0': RETURN false
    queue = [0]
    farthest = 0

    FOR i IN queue:
        lo = MAX(i + minJump, farthest + 1)
        hi = MIN(i + maxJump, len(s) - 1)
        FOR j ← lo TO hi:
            IF s[j] == '0':
                IF j == len(s) - 1: RETURN true
                queue.APPEND(j)
        farthest = MAX(farthest, hi)

    RETURN false
```

---

## 5. Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| Time | O(n) | Each index visited at most once via `farthest` pointer |
| Space | O(n) | Queue |

---

## 6. Key Takeaway

> The `farthest` pointer prevents re-scanning, turning naive O(n · maxJump) BFS into O(n). Alternative: prefix sum on a DP array to check if any reachable index in `[i-maxJump, i-minJump]` is true.
