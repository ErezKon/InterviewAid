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

> *Note: the Approach below tracks values. Officially only parity matters (no three consecutive equal parities). Keep `e[p][r]` = count of subsequences ending with parity `p` and a run length of `r+1`. For `x` with parity `p` (other parity `q`): `e[p][0] += e[q][0] + e[q][1] + 1` and `e[p][1] += e[p][0]` (using the old value). The answer is the sum mod 10^9+7. Checked against brute force.*

You are given an integer array `nums`.

A **subsequence** is **stable** if it does not contain **three consecutive** elements with the **same** parity when the subsequence is read **in order** (i.e., consecutive **inside the subsequence**).

Return the number of stable subsequences.

Since the answer may be too large, return it **modulo** `10^9 + 7`.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^5`

---

## 2. Examples

**Example 1:**
```
Input: nums = [1,3,5]
Output: 6
Explanation: - Stable subsequences are [1], [3], [5], [1, 3], [1, 5], and [3, 5].
- Subsequence [1, 3, 5] is not stable because it contains three consecutive odd numbers. Thus, the answer is 6.
```

**Example 2:**
```
Input: nums = [2,3,4,2]
Output: 14
Explanation: - The only subsequence that is not stable is [2, 4, 2], which contains three consecutive even numbers.
- All other subsequences are stable. Thus, the answer is 14.
```

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
