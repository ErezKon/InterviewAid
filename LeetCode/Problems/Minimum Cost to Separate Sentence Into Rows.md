# 2052. Minimum Cost to Separate Sentence Into Rows

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-cost-to-separate-sentence-into-rows](https://leetcode.com/problems/minimum-cost-to-separate-sentence-into-rows)
**Companies:** Microsoft

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: DP — O(n²)](#approach-dp--on)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a sentence (string of words) and a row width `k`, split the sentence into rows where each row has at most `k` characters (words separated by single spaces). The cost of a row (except the last) is `(k - row_length)²`. The last row has zero cost. Return the **minimum total cost**.

**Constraints:**
- `1 ≤ sentence.length ≤ 5000`
- `1 ≤ k ≤ 5000`
- Each word length ≤ `k`

---

## Examples

**Example 1:**
```
Input: sentence = "i love leetcode", k = 12
Output: 1
Explanation: 
  Row 1: "i love" (length 6) → cost = (12-6)² = 36? 
  Actually: "i love" = 6, but try "i love leetcode" won't fit (15 > 12).
  Row 1: "i love" → cost (12-6)²=36, Row 2: "leetcode" → last row, cost 0. Total = 36.
  Better: Row 1: "i" → cost (12-1)²=121, Row 2: "love leetcode" = 13 > 12. No.
  Row 1: "i love" (6), cost 36; Row 2: "leetcode" (8), cost 0. Total = 36.
  Hmm, or Row 1: "i" cost 121; Row 2: "love" cost 64; Row 3: "leetcode" cost 0 = 185.
  Min = 36.
```

**Example 2:**
```
Input: sentence = "apples and bananas", k = 7
Output: 21
Explanation: "apples" (6) cost=(7-6)²=1, "and" (3) cost=(7-3)²=16, "bananas" last row cost=0. Total=17.
Or "apples" cost 1, "and bananas" = 11 > 7. So: "apples"→1, "and"→16, "bananas"→0 = 17.
```

---

## Key Insight

> This is a classic **word wrap / text justification** DP problem. Define `dp[i]` = minimum cost to arrange words `i..n-1` into rows. For each starting word `i`, try packing words `i..j` into one row, and recurse on word `j+1`.

The last row (containing the final word) has zero cost, which is the base case.

---

## Approach: DP — O(n²) ✅

```
FUNCTION minimumCost(sentence, k):
    words ← SPLIT(sentence)
    n ← len(words)
    dp ← array of size n+1, filled with infinity
    dp[n] ← 0    // base case: no words left

    FOR i ← n-1 DOWNTO 0:
        length ← 0
        FOR j ← i TO n-1:
            length ← length + len(words[j])
            IF j > i: length ← length + 1   // space between words
            IF length > k: BREAK

            IF j == n - 1:                   // last row
                dp[i] ← 0
            ELSE:
                cost ← (k - length)²
                dp[i] ← MIN(dp[i], cost + dp[j + 1])

    RETURN dp[0]
```

---

## Walkthrough

```
sentence = "i love leetcode", k = 12
words = ["i", "love", "leetcode"]
```

| i | Words tried | Row length | Cost | dp[i] |
|---|-------------|-----------|------|-------|
| 2 | "leetcode" | 8 ≤ 12 | Last row → 0 | **0** |
| 1 | "love" | 4 | (12-4)²=64 + dp[2]=0 → 64 | |
| 1 | "love leetcode" | 13 > 12 | Break | **64** |
| 0 | "i" | 1 | (12-1)²=121 + dp[1]=64 → 185 | |
| 0 | "i love" | 6 | (12-6)²=36 + dp[2]=0 → 36 | |
| 0 | "i love leetcode" | 15 > 12 | Break | **36** |

**Result:** dp[0] = **36** ✅

---

## Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n²) — for each word, try all valid row endings |
| **Space** | O(n) — DP array |

---

## Follow-Up Questions

1. **How does this relate to Knuth's word wrap?** Knuth's algorithm optimizes this with the SMAWK algorithm for O(n) in special cases, but O(n²) DP is standard for interviews.
2. **What if the cost function is linear (not squared)?** Greedy (pack as many words per line) works optimally for linear cost.
3. **What about LeetCode #68 (Text Justification)?** That's the formatting variant — same DP structure but outputs the actual formatted text.

---

## Key Takeaway

> Word-wrap minimization is a classic DP problem: define states by the starting word index, try all valid row endings, and handle the last-row special case as the base condition.
