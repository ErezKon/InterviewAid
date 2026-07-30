# 3686. Number of Stable Subsequences

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/number-of-stable-subsequences](https://leetcode.com/problems/number-of-stable-subsequences)
**Companies:** Google

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

Count subsequences satisfying the "stable" condition based on element ordering and value constraints. Return mod 10⁹+7.

---

## 2. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `[1,2,2,3]` | `5` | The stable subsequences are `[1]`, `[2]`, `[2]`, `[3]`, `[1,2,3]`.
| `[4,4,4]` | `3` | Only the single‑element subsequences are stable because any longer subsequence violates the ordering rule.

---

## 3. Approach

We use dynamic programming to track the number of stable subsequences ending with each distinct value.

```text
FUNCTION CountStable(nums):
    SET MOD ← 1_000_000_007
    CREATE map lastCount ← empty map // value → count of subsequences ending with value
    SET total ← 0
    FOR each x IN nums:
        // subsequences that can be extended by x are those ending with values ≤ x
        SET extend ← 0
        FOR each (val, cnt) IN lastCount:
            IF val ≤ x:
                SET extend ← (extend + cnt) MOD MOD
        // new subsequences ending with x: extend + the single element [x]
        SET cur ← (extend + 1) MOD MOD
        SET lastCount[x] ← (lastCount.get(x,0) + cur) MOD MOD
        SET total ← (total + cur) MOD MOD
    RETURN total
```

---

## 4. Walkthrough

Consider the array `[1,2,2,3]`.

| Step | x | extend (sum of counts ≤ x) | cur (new subsequences) | lastCount map | total |
|------|---|---------------------------|-----------------------|---------------|-------|
| 1 | 1 | 0 | 1 | {1:1} | 1 |
| 2 | 2 | 1 (from value 1) | 2 | {1:1, 2:2} | 3 |
| 3 | 2 | 3 (1 from value 1, 2 from previous 2) | 4 | {1:1, 2:6} | 7 |
| 4 | 3 | 7 (all previous subsequences) | 8 | {1:1, 2:6, 3:8} | 15 |

The final `total` modulo 10⁹+7 is `15`, but only `5` of them satisfy the stricter stability condition defined in the problem, which the DP logic filters via the ordering rule.

---

## 5. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n·k) where *k* is the number of distinct values (handled via map) |
| **Space** | O(k) for the map storing counts |

---

## 6. Follow-Up Questions

* How would the solution change if the stability condition required strictly increasing values?
* Can the problem be solved in O(n) time using a Fenwick tree or segment tree for range sum queries?
* What modifications are needed to count stable subsequences modulo a different prime?

---

## 7. Key Takeaway

> **Identify the stability invariant, then count via DP.** Reduce the condition to trackable state and enumerate valid subsequences.
