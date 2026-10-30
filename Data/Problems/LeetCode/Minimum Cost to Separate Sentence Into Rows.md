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

You are given a string `sentence` containing words separated by spaces, and an integer `k`. Your task is to separate `sentence` into **rows** where the number of characters in each row is **at most** `k`. You may assume that `sentence` does not begin or end with a space, and the words in `sentence` are separated by a single space.

You can split `sentence` into rows by inserting line breaks between words in `sentence`. A word **cannot** be split between two rows. Each word must be used exactly once, and the word order cannot be rearranged. Adjacent words in a row should be separated by a single space, and rows should not begin or end with spaces.

The **cost** of a row with length `n` is `(k - n)²`, and the **total cost** is the sum of the **costs** for all rows **except** the last one.
- For example if `sentence = "i love leetcode"` and `k = 12`:
  - Separating `sentence` into `"i"`, `"love"`, and `"leetcode"` has a cost of `(12 - 1)² + (12 - 4)² = 185`.
  - Separating `sentence` into `"i love"`, and `"leetcode"` has a cost of `(12 - 6)² = 36`.
  - Separating `sentence` into `"i"`, and `"love leetcode"` is not possible because the length of `"love leetcode"` is greater than `k`.

Return *the **minimum** possible total cost of separating* `sentence` *into rows.*

**Constraints:**
- `1 ≤ sentence.length ≤ 5000`
- `1 ≤ k ≤ 5000`
- The length of each word in `sentence` is at most `k`.
- `sentence` consists of only lowercase English letters and spaces.
- `sentence` does not begin or end with a space.
- Words in `sentence` are separated by a single space.

---

## Examples

```
Example 1:
  Input: sentence = "i love leetcode", k = 12
  Output: 36
  Explanation:
  Separating sentence into "i", "love", and "leetcode" has a cost of (12 - 1)² + (12 - 4)² = 185.
  Separating sentence into "i love", and "leetcode" has a cost of (12 - 6)² = 36.
  Separating sentence into "i", "love leetcode" is not possible because "love leetcode" has length 13.
  36 is the minimum possible total cost so return it.
```

```
Example 2:
  Input: sentence = "apples and bananas taste great", k = 7
  Output: 21
  Explanation:
  Separating sentence into "apples", "and", "bananas", "taste", and "great" has a cost of (7 - 6)² + (7 - 3)² + (7 - 7)² + (7 - 5)² = 21.
  21 is the minimum possible total cost so return it.
```

```
Example 3:
  Input: sentence = "a", k = 5
  Output: 0
  Explanation:
  The cost of the last row is not included in the total cost, and since there is only one row, return 0.
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
