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

Given a string `s` consisting only of characters `'a'` and `'b'`, return the **minimum number of deletions** to make `s` **balanced** — meaning no `'b'` comes before an `'a'` in the result (all `'a'`s before all `'b'`s).

**Constraints:**
- `1 ≤ s.length ≤ 10⁵`
- `s[i]` is `'a'` or `'b'`

---

## Examples

**Example 1:**
```
Input: s = "aababbab"
Output: 2
Explanation: Delete s[2]='b' and s[6]='a' → "aaabbb" (balanced).
```

**Example 2:**
```
Input: s = "bbaaaaab"
Output: 2
Explanation: Delete the two leading 'b's → "aaaaab" (balanced).
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
