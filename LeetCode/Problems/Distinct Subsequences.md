# 115. Distinct Subsequences

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/distinct-subsequences](https://leetcode.com/problems/distinct-subsequences)
**Companies:** Amazon, Bloomberg, Coupang, Google, Jpmorgan, Meesho, Meta, Microsoft, Oracle, Salesforce, Swiggy, Trilogy, Walmart Labs, Zoho

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: DP — O(m·n)](#approach-dp--omn)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given two strings `s` and `t`, return the number of **distinct subsequences** of `s` which equals `t`.

A subsequence is formed by deleting some (or no) characters from `s` without changing the relative order.

**Constraints:**
- `1 <= s.length, t.length <= 1000`
- `s` and `t` consist of English letters.

---

## Examples

**Example 1:**
```
Input: s = "rabbbit", t = "rabbit"
Output: 3
Explanation: 3 ways to choose which 'b' to skip:
  ra[b]bbit, rab[b]bit, rabb[b]it
```

**Example 2:**
```
Input: s = "babgbag", t = "bag"
Output: 5
```

---

## Key Insight

> At each position `(i, j)`, you have two choices for `s[i-1]`:
> 1. **Skip it** — `dp[i-1][j]` (don't use this character)
> 2. **Use it** (only if `s[i-1] == t[j-1]`) — `dp[i-1][j-1]` (match and advance both)
>
> The total is the sum of both options. Base case: empty `t` always matches (`dp[i][0] = 1`).

---

## Approach: DP — O(m·n) ✅

`dp[i][j]` = number of ways to form `t[0..j-1]` from `s[0..i-1]`.

```
FUNCTION numDistinct(s, t):
    m, n = len(s), len(t)
    dp = (m+1) × (n+1) matrix of zeros
    FOR i ← 0 TO m: dp[i][0] = 1    // empty t matches any prefix

    FOR i ← 1 TO m:
        FOR j ← 1 TO n:
            dp[i][j] = dp[i-1][j]    // skip s[i-1]
            IF s[i-1] == t[j-1]:
                dp[i][j] += dp[i-1][j-1]    // use s[i-1]

    RETURN dp[m][n]
```

Space optimizable to O(n) with reverse iteration.

---

## Walkthrough

```
s = "rabbbit", t = "rabbit"
```

Partial DP table (key cells):

|       | "" | r | ra | rab | rabb | rabbi | rabbit |
|-------|----|----|-----|------|-------|--------|---------|
| ""    | 1  | 0  | 0   | 0    | 0     | 0      | 0       |
| r     | 1  | 1  | 0   | 0    | 0     | 0      | 0       |
| ra    | 1  | 1  | 1   | 0    | 0     | 0      | 0       |
| rab   | 1  | 1  | 1   | 1    | 0     | 0      | 0       |
| rabb  | 1  | 1  | 1   | 1    | 1     | 0      | 0       |
| rabbb | 1  | 1  | 1   | 1    | 2     | 0      | 0       |
| ...   |    |    |     |      |       |        | **3**   |

Final answer: `dp[7][6] = 3` ✅

---

## Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| **Time** | O(m × n) | Fill entire DP table |
| **Space** | O(n) | With 1D optimization (iterate j in reverse) |

---

## Follow-Up Questions

**Q1: How does the 1D space optimization work?**
> Use a single array `dp[0..n]`. Iterate `j` from right to left so `dp[j-1]` still holds the previous row's value when needed.

**Q2: How does this differ from "Distinct Subsequences II" (LC 940)?**
> LC 940 counts all distinct subsequences of one string. This problem counts subsequences of `s` that exactly match a target `t` — a 2D matching problem.

**Q3: Can this overflow?**
> Yes — with large inputs, values can exceed 32-bit. Use 64-bit integers or modular arithmetic depending on the problem version.

---

## Key Takeaway

> **Subsequence matching DP: at each character of `s`, either skip it or use it (if it matches `t`). The recurrence `dp[i][j] = dp[i-1][j] + (match ? dp[i-1][j-1] : 0)` is the foundation of all subsequence counting problems.**
