# 3407. Substring Matching Pattern

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/substring-matching-pattern](https://leetcode.com/problems/substring-matching-pattern)
**Companies:** Amazon

---

## Problem Description
Given two strings `s` and `p`, determine whether `p` occurs as a substring of `s`. Return `true` if `p` is found, otherwise return `false`. The strings consist of lowercase English letters.

## Examples
- **Input:** `s = "leetcode", p = "code"`
  **Output:** `true`
  **Explanation:** "code" appears starting at index 4.
- **Input:** `s = "apple", p = "plea"`
  **Output:** `false`
  **Explanation:** No contiguous occurrence of "plea" in "apple".

## Approach
Iterate through `s` and compare each window of length `len(p)` with `p`. Stop early when a match is found.

```text
FUNCTION IsSubstring(s, p):
    SET n ← LENGTH(s)
    SET m ← LENGTH(p)
    IF m = 0:
        RETURN true
    FOR i FROM 0 TO n - m:
        IF SUBSTRING(s, i, i + m) = p:
            RETURN true
    RETURN false
```

## Walkthrough
| i | Substring `s[i:i+m]` | Match? |
|---|----------------------|--------|
| 0 | "leet" | no |
| 1 | "eetc" | no |
| 2 | "etco" | no |
| 3 | "tco..." | no |
| 4 | "code" | **yes** → return `true` |

## Complexity Analysis
- **Time:** O(n · m) in the worst case, where `n` is `|s|` and `m` is `|p|`. With simple character comparison it is effectively O(n) when `m` is small.
- **Space:** O(1) extra space.

## Follow-Up Questions
- How would you improve the runtime using KMP or Rabin‑Karp algorithms?
- Can the solution be adapted for multiple pattern queries on the same text?
- What changes are needed to support wildcard characters in the pattern?

## Key Takeaway
A straightforward sliding‑window scan checks each possible position, providing a simple O(n · m) solution for exact substring matching.
