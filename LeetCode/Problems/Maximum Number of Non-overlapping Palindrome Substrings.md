# 2472. Maximum Number of Non-overlapping Palindrome Substrings

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-number-of-non-overlapping-palindrome-substrings](https://leetcode.com/problems/maximum-number-of-non-overlapping-palindrome-substrings)
**Companies:** Linkedin, Microsoft, Oracle, Salesforce, Sofi

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a string `s` and an integer `k`, return the **maximum number of non-overlapping palindrome substrings** of length **at least** `k`.

**Constraints:**
- `2 <= s.length <= 2000`
- `1 <= k <= s.length`
- `s` consists of lowercase English letters.

---

## Examples

**Example 1:**
```
Input:  s = "abaccdbbd", k = 3
Output: 2
Explanation: "aba" (indices 0-2) and "dbbd" (indices 5-8). Both palindromes, non-overlapping.
```

---

## Key Insight

> Use **DP with greedy palindrome selection**: `dp[i]` = max palindromes in `s[0..i-1]`. For each position, try expanding palindromes centered here. When we find one with length ≥ k, take the **shortest valid** one (greedy — shorter palindromes leave more room for others).

---

## Approach: DP + Expand Around Center — O(n²) ✅

```
FUNCTION maxPalindromes(s, k)
    n ← len(s)
    dp ← array of (n+1) zeros    // dp[i] = max palindromes in s[:i]

    FOR center ← 0 TO n - 1 DO
        // Try odd-length and even-length expansions
        FOR parity IN [0, 1] DO    // 0=odd, 1=even
            lo ← center
            hi ← center + parity

            WHILE lo ≥ 0 AND hi < n AND s[lo] = s[hi] DO
                length ← hi - lo + 1
                IF length ≥ k THEN
                    dp[hi + 1] ← MAX(dp[hi + 1], dp[lo] + 1)
                    BREAK    // greedy: shortest valid palindrome
                lo ← lo - 1
                hi ← hi + 1

        dp[center + 1] ← MAX(dp[center + 1], dp[center])

    RETURN dp[n]
END FUNCTION
```

---

## Walkthrough

```
s = "abaccdbbd", k = 3
```

- Center 1: "aba" (length 3 ≥ 3) → dp[3] = dp[0]+1 = 1
- Center 6: "bbd"? Not palindrome. But "dbbd" (even, center 6-7): d=d, b=b → length 4 ≥ 3 → dp[9] = dp[5]+1 = 2

**Result: 2** ✅

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(n²)** — n centers, each expands up to O(n) |
| Space  | **O(n)** — dp array |

---

## Follow-Up Questions

1. **Why take the shortest palindrome?**
   Greedy: shorter palindromes consume less of the string, leaving more space for additional palindromes.

2. **Could Manacher's algorithm help?**
   Yes — precompute all palindrome radii in O(n), then do the DP. Same O(n²) for the DP step.

3. **What if overlapping were allowed?**
   Then just count all palindromic substrings of length ≥ k.

---

## Key Takeaway

> **DP + greedy shortest palindrome** — expand around centers, take the shortest palindrome ≥ k when found, and track maximum non-overlapping count with a forward DP array.
