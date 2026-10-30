# 1434. Number of Ways to Wear Different Hats to Each Other

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/number-of-ways-to-wear-different-hats-to-each-other](https://leetcode.com/problems/number-of-ways-to-wear-different-hats-to-each-other)
**Companies:** De Shaw, Mindtickle, Roblox

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Bitmask DP — O(40 · 2^n · n)](#4-approach)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

There are `n` people and `40` types of hats labeled from `1` to `40`.

Given a 2D integer array `hats`, where `hats[i]` is a list of all hats preferred by the `i^th` person.

Return the number of ways that `n` people can wear **different** hats from each other.

Since the answer may be too large, return it modulo `10^9 + 7`.

**Constraints:**
- `n == hats.length`
- `1 <= n <= 10`
- `1 <= hats[i].length <= 40`
- `1 <= hats[i][j] <= 40`
- `hats[i]` contains a list of **unique** integers.

---

## 2. Examples

**Example 1:**
```
Input: hats = [[3,4],[4,5],[5]]
Output: 1
Explanation: There is only one way to choose hats given the conditions.
First person chooses hat 3, Second person chooses hat 4 and last one hat 5.
```

**Example 2:**
```
Input: hats = [[3,5,1],[3,5]]
Output: 4
Explanation: There are 4 ways to choose hats:
(3,5), (5,3), (1,3) and (1,5)
```

**Example 3:**
```
Input: hats = [[1,2,3,4],[1,2,3,4],[1,2,3,4],[1,2,3,4]]
Output: 24
Explanation: Each person can choose hats labeled from 1 to 4.
Number of Permutations of (1,2,3,4) = 24.
```

---

## 3. Key Insight

> Bitmask over people (≤ 10), not hats (≤ 40). Iterate hats one by one. For each hat, either skip or assign to a person who likes it.

---

## 4. Approach: Bitmask DP — O(40 · 2^n · n) ✅

```text
FUNCTION countWays(hatPreferences):
    n ← number of people
    dp[mask] ← 0 for all mask in 0..(1<<n)-1
    dp[0] ← 1
    FOR hat FROM 1 TO 40:
        FOR mask FROM (1<<n)-1 DOWNTO 0:
            IF dp[mask] == 0: CONTINUE
            FOR person FROM 0 TO n-1:
                IF (mask >> person) & 1 == 0 AND person likes hat:
                    newMask ← mask | (1 << person)
                    dp[newMask] ← (dp[newMask] + dp[mask]) MOD 1e9+7
    RETURN dp[(1<<n)-1]
```

---

## 5. Walkthrough

Consider 2 people with preferences: Person0 → [1,2], Person1 → [1].

1. Initialize dp[0]=1.
2. Hat 1: assign to Person0 → dp[01]=1, assign to Person1 → dp[10]=1.
3. Hat 2: only Person0 likes it. From dp[01] (Person0 already assigned) no change. From dp[10] (Person1 assigned) we can assign Person0 → dp[11]=1.
4. Final mask 11 (both assigned) has value 1 → one valid assignment.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(40 · 2^n · n) where n ≤ 10 |
| **Space** | O(2^n) |

---

## 7. Key Takeaway

> **Bitmask over the smaller dimension (people, not hats).** Iterate hats sequentially, update the bitmask of satisfied people. Classic assignment DP trick.
