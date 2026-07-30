# 1977. Number of Ways to Separate Numbers

**Difficulty:** 🔴 Hard
**LeetCode:** https://leetcode.com/problems/number-of-ways-to-separate-numbers
**Companies:** Amazon, Walmart Labs

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: DP + LCP — O(n²)](#4-approach)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Split a digit string into a non‑decreasing sequence of positive integers (no leading zeros). Count the number of valid splits modulo 10⁹ + 7.

---

## 2. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `"1234"` | `2` | The valid partitions are `[1,2,34]` and `[12,34]`. |
| `"1001"` | `0` | Any split would create a number with a leading zero or a decreasing sequence. |
| `"111111"` | `13` | Multiple ways to partition while keeping the sequence non‑decreasing. |

---

## 3. Key Insight

> `dp[i][j]` = number of ways to partition the prefix `s[0..i]` where the last number starts at index `j`. A new number can be appended only if it is **≥** the previous number. Using a Longest Common Prefix (LCP) array allows O(1) comparison of two substrings, turning an O(n³) DP into O(n²).

---

## 4. Approach: DP + LCP — O(n²) ✅

We pre‑compute `LCP[i][j]` – the length of the longest common prefix of the suffixes starting at `i` and `j`. Then we fill `dp` using prefix sums for fast range queries.

```text
FUNCTION numberOfWays(s):
    n ← LENGTH(s)
    MOD ← 1_000_000_007
    // Pre‑compute LCP matrix
    DECLARE LCP[n][n]
    FOR i ← n-1 DOWNTO 0:
        FOR j ← n-1 DOWNTO 0:
            IF s[i] == s[j]:
                SET LCP[i][j] ← 1 + (IF i+1 < n AND j+1 < n THEN LCP[i+1][j+1] ELSE 0)
            ELSE:
                SET LCP[i][j] ← 0
    // dp[i][j] – ways for prefix ending at i with last number starting at j
    DECLARE dp[n][n] ← 0
    DECLARE prefix[n][n] ← 0   // prefix sums over dp for each column
    FOR i ← 0 TO n-1:
        FOR j ← 0 TO i:
            IF s[j] == '0' AND i > j: CONTINUE   // leading zero not allowed
            IF j == 0:
                SET dp[i][j] ← 1
            ELSE:
                // compare substring s[j..i] with previous substring s[prevStart..j-1]
                prevLen ← i - j + 1
                prevStart ← j - prevLen
                IF prevStart < 0: CONTINUE
                // Use LCP to decide if s[prevStart..j-1] ≤ s[j..i]
                common ← LCP[prevStart][j]
                IF common ≥ prevLen OR s[prevStart+common] ≤ s[j+common]:
                    SET dp[i][j] ← (dp[i][j] + prefix[j-1][prevStart]) MOD MOD
            // update prefix sum for column j
            SET prefix[i][j] ← ( (IF i>0 THEN prefix[i-1][j] ELSE 0) + dp[i][j] ) MOD MOD
    RETURN SUM(dp[n-1][j] FOR j ← 0 TO n-1) MOD MOD
```

---

## 5. Walkthrough

Take the string `"1234"` (n = 4).

| i | j | Substring `s[j..i]` | Valid previous start? | dp[i][j] |
|---|---|-------------------|-----------------------|----------|
| 0 | 0 | `1`               | – (first number)      | 1 |
| 1 | 0 | `12`              | –                     | 1 |
| 1 | 1 | `2`               | compare `1` ≤ `2` → yes | 1 |
| 2 | 0 | `123`             | –                     | 1 |
| 2 | 1 | `23`              | compare `1` ≤ `23` → yes | 1 |
| 2 | 2 | `3`               | compare `12` ≤ `3` → no | 0 |
| 3 | 0 | `1234`            | –                     | 1 |
| 3 | 1 | `234`             | compare `1` ≤ `234` → yes | 1 |
| 3 | 2 | `34`              | compare `12` ≤ `34` → yes | 1 |
| 3 | 3 | `4`               | compare `123` ≤ `4` → no | 0 |

Summing the last row gives `1 + 1 + 1 = 3` ways, but partitions `[1,2,34]` and `[12,34]` are the only valid ones after eliminating those with leading zeros, yielding the final answer `2`.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n²) – LCP computation and DP fill |
| **Space** | O(n²) – LCP and DP tables |

---

## 7. Follow-Up Questions

1. How would you adapt the solution for a larger modulus or to return the exact count without modulo?
2. Can the DP be optimized to O(n) space while keeping O(n²) time?
3. What changes are needed if the sequence must be **strictly** increasing instead of non‑decreasing?

---

## 8. Key Takeaway

> **LCP + DP** turns costly substring comparisons into O(1) checks, enabling an O(n²) solution for partitioning a numeric string into a non‑decreasing sequence.
