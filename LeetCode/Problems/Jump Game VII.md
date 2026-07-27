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

Given a binary string `s`, starting at index 0, you can jump from index `i` to any index `j` where `i + minJump <= j <= i + maxJump` and `s[j] == '0'`. Return whether you can reach the last index.

**Constraints:**
- `2 <= s.length <= 10⁵`
- `s[0] == '0'`, `s[s.length - 1] == '0'`

---

## 2. Examples

```
Input: s = "011010", minJump = 2, maxJump = 3
Output: true (0 → 2 → 5)

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
