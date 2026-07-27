# 2060. Check if an Original String Exists Given Two Encoded Strings

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/check-if-an-original-string-exists-given-two-encoded-strings](https://leetcode.com/problems/check-if-an-original-string-exists-given-two-encoded-strings)
**Companies:** Bitgo, Meta

---

## 1. Problem Description

Given two encoded strings where letters are literal and digits represent wildcard lengths (1-3 digit numbers), determine if there exists an original string that both encodings could represent.

---

## 2. Key Insight

> DP with state `(i, j, diff)` where `i`, `j` are positions in s1, s2, and `diff` is the balance of wildcard characters (positive = s1 ahead, negative = s2 ahead). Transitions: consume letters (must match when diff==0) or expand digit sequences.

---

## 3. Approach: DP with Diff Tracking — O(n × m × 2000) ✅

```
FUNCTION possiblyEquals(s1, s2):
    memo = {}
    FUNCTION dp(i, j, diff):
        // diff > 0: s1 has consumed diff more wildcard chars
        IF (i, j, diff) IN memo: RETURN memo[...]
        IF i == len(s1) AND j == len(s2): RETURN diff == 0
        
        // Try consuming digits from s1 (creates wildcard chars)
        IF i < len(s1) AND s1[i].isdigit():
            parse all possible numbers, add to diff
        // Try consuming digits from s2
        IF j < len(s2) AND s2[j].isdigit():
            parse all possible numbers, subtract from diff
        // If diff > 0, s1 is ahead — consume a char from s2
        // If diff < 0, s2 is ahead — consume a char from s1
        // If diff == 0 and both are letters, they must match
        ...
    RETURN dp(0, 0, 0)
```

| Time | Space |
|------|-------|
| O(n × m × D) where D ≈ 2000 | O(n × m × D) |

---

## Key Takeaway

> Encoded string matching uses DP with a "diff" dimension tracking how many characters one string is ahead. Digit sequences expand into multiple possible wildcard lengths. Complex state space but bounded by max digit values.
