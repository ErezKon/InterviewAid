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

Given question types with counts and marks, count ways to earn exactly `target` points. Return result modulo 10⁹+7.

---

## Examples

| target | types (count, marks) | output |
|--------|----------------------|--------|
| 6 | [[3,1],[2,2]] | 7 |
| 5 | [[2,2],[1,3]] | 3 |

*Explanation*: For the first case, various combinations of 1‑point and 2‑point questions sum to 6.

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
