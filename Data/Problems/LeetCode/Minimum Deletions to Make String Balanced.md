# 1653. Minimum Deletions to Make String Balanced

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-deletions-to-make-string-balanced](https://leetcode.com/problems/minimum-deletions-to-make-string-balanced)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Redbus, Urban Company

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Track b's before — O(n)](#approach-track-bs-before--on)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given a string `s` consisting only of characters `'a'` and `'b'`.

You can delete any number of characters in `s` to make `s` **balanced**. `s` is **balanced** if there is no pair of indices `(i,j)` such that `i < j` and `s[i] = 'b'` and `s[j]= 'a'`.

Return *the **minimum** number of deletions needed to make *`s`* **balanced***.

**Constraints:**
- `1 <= s.length <= 10^5`
- `s[i]` is `'a'` or `'b'`.

---

## Examples

**Example 1:**
```
Input: s = "aababbab"
Output: 2
Explanation: You can either:
Delete the characters at 0-indexed positions 2 and 6 ("aababbab" -> "aaabbb"), or
Delete the characters at 0-indexed positions 3 and 6 ("aababbab" -> "aabbbb").
```

**Example 2:**
```
Input: s = "bbaaaaabb"
Output: 2
Explanation: The only solution is to delete the first two characters.
```

---

## Key Insight

> Each `'a'` after a `'b'` creates a violation. For each violation, we either delete the `'a'` or one of the preceding `'b'`s — always costing exactly 1 deletion. Greedily resolve each violation as encountered, decrementing the `'b'` count to simulate deleting the oldest `'b'`.

---

## Approach: Track b's before — O(n) ✅

```
FUNCTION minimumDeletions(s):
    bCount = 0
    deletions = 0

    FOR char IN s:
        IF char == 'b':
            bCount += 1
        ELSE:    // 'a' after some 'b's
            IF bCount > 0:
                deletions += 1
                bCount -= 1

    RETURN deletions
```

---

## Walkthrough

```
s = "aababbab"
```

| i | char | bCount | Action | deletions |
|---|------|--------|--------|-----------|
| 0 | a | 0 | No b's before, skip | 0 |
| 1 | a | 0 | No b's before, skip | 0 |
| 2 | b | 1 | Count b | 0 |
| 3 | a | 1→0 | Violation! Delete one (b or a) | 1 |
| 4 | b | 1 | Count b | 1 |
| 5 | b | 2 | Count b | 1 |
| 6 | a | 2→1 | Violation! Delete one | 2 |
| 7 | b | 2 | Count b | 2 |

**Result:** **2** deletions ✅

---

## Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) — single pass |
| **Space** | O(1) — two counters |

---

## Follow-Up Questions

1. **Why does decrementing bCount work?** It simulates deleting the earliest `'b'` — once removed, it can't cause future violations.
2. **Alternative DP approach?** `dp[i]` = min deletions for `s[0..i]`. At each `'a'`, `dp[i] = min(dp[i-1]+1, bCount)`. Same O(n) result.
3. **What if there were 3 characters (a, b, c) in order?** Extend to two passes or DP with more states.

---

## Key Takeaway

> For "make all X's before all Y's" problems, **count violations greedily**: each time a Y-before-X pair is found, resolve it at cost 1 by simulating the cheapest deletion.
