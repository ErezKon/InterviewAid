# 2585. Number of Ways to Earn Points

**Difficulty:** 🔴 Hard
**LeetCode:** https://leetcode.com/problems/number-of-ways-to-earn-points
**Companies:** Tusimple

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Bounded Knapsack DP — O(n · target · maxCount)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

There is a test that has `n` types of questions. You are given an integer `target` and a **0-indexed** 2D integer array `types` where `types[i] = [count_i, marks_i]` indicates that there are `count_i` questions of the `i^th` type, and each one of them is worth `marks_i` points.

Return *the number of ways you can earn **exactly** *`target`* points in the exam*. Since the answer may be too large, return it **modulo** `10^9 + 7`.

**Note** that questions of the same type are indistinguishable.

- For example, if there are `3` questions of the same type, then solving the `1^st` and `2^nd` questions is the same as solving the `1^st` and `3^rd` questions, or the `2^nd` and `3^rd` questions.

**Constraints:**
- `1 <= target <= 1000`
- `n == types.length`
- `1 <= n <= 50`
- `types[i].length == 2`
- `1 <= count_i, marks_i <= 50`

---

## Examples

**Example 1:**
```
Input: target = 6, types = [[6,1],[3,2],[2,3]]
Output: 7
Explanation: You can earn 6 points in one of the seven ways:
- Solve 6 questions of the 0^th type: 1 + 1 + 1 + 1 + 1 + 1 = 6
- Solve 4 questions of the 0^th type and 1 question of the 1^st type: 1 + 1 + 1 + 1 + 2 = 6
- Solve 2 questions of the 0^th type and 2 questions of the 1^st type: 1 + 1 + 2 + 2 = 6
- Solve 3 questions of the 0^th type and 1 question of the 2^nd type: 1 + 1 + 1 + 3 = 6
- Solve 1 question of the 0^th type, 1 question of the 1^st type and 1 question of the 2^nd type: 1 + 2 + 3 = 6
- Solve 3 questions of the 1^st type: 2 + 2 + 2 = 6
- Solve 2 questions of the 2^nd type: 3 + 3 = 6
```

**Example 2:**
```
Input: target = 5, types = [[50,1],[50,2],[50,5]]
Output: 4
Explanation: You can earn 5 points in one of the four ways:
- Solve 5 questions of the 0^th type: 1 + 1 + 1 + 1 + 1 = 5
- Solve 3 questions of the 0^th type and 1 question of the 1^st type: 1 + 1 + 1 + 2 = 5
- Solve 1 questions of the 0^th type and 2 questions of the 1^st type: 1 + 2 + 2 = 5
- Solve 1 question of the 2^nd type: 5
```

**Example 3:**
```
Input: target = 18, types = [[6,1],[3,2],[2,3]]
Output: 1
Explanation: You can only earn 18 points by answering all questions.
```

---

## 2. Key Insight

> Treat each question type as a bounded item in a knapsack. Process types one by one, updating DP in reverse to avoid reuse within the same type.

---

## 3. Approach: Bounded Knapsack DP — O(n · target · maxCount) ✅

```text
FUNCTION waysToReachTarget(target, types):
    MOD ← 10^9 + 7
    dp ← ARRAY[0..target] FILLED WITH 0
    dp[0] ← 1
    FOR [count, marks] IN types:
        FOR j ← target DOWNTO 0:
            FOR k ← 1 TO count:
                IF j + k * marks ≤ target:
                    dp[j + k * marks] ← (dp[j + k * marks] + dp[j]) MOD MOD
    RETURN dp[target]
```

---

## Walkthrough

Consider `target = 6` and `types = [[3,1],[2,2]]`:
1. Initialize `dp[0]=1`.
2. Process first type (1‑point, up to 3): update dp for sums 1..3.
3. Process second type (2‑point, up to 2): for each existing sum, add 2‑point combos respecting count.
4. Final `dp[6] = 7` representing all valid selections.

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n · target · maxCount) |
| **Space** | O(target) |

---

## Follow-Up Questions

1. How would you modify the solution if the number of each question type were unlimited?
2. Can you optimize the DP using combinatorial formulas for large `target` values?

---

## 5. Key Takeaway

> **Bounded knapsack variant.** Iterate each type, using reverse DP to combine counts without double‑counting within the same type.
