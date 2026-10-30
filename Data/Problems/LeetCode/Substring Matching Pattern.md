# 3407. Substring Matching Pattern

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/substring-matching-pattern](https://leetcode.com/problems/substring-matching-pattern)
**Companies:** Amazon

---

## Problem Description

> *Note: the Approach/Walkthrough below ignore the `'*'` wildcard. Correct idea: split `p` at `'*'` into `left` and `right`; find the first occurrence `i` of `left` in `s`, then check whether `right` occurs in `s` at or after `i + len(left)`. O(n·m).*

You are given a string `s` and a pattern string `p`, where `p` contains **exactly one** `'*'` character.

The `'*'` in `p` can be replaced with any sequence of zero or more characters.

Return `true` if `p` can be made a substring of `s`, and `false` otherwise.

**Constraints:**
- `1 <= s.length <= 50`
- `1 <= p.length <= 50`
- `s` contains only lowercase English letters.
- `p` contains only lowercase English letters and exactly one `'*'`

## Examples

**Example 1:**
```
Input: s = "leetcode", p = "ee*e"
Output: true
Explanation: By replacing the '*' with "tcod", the substring "eetcode" matches the pattern.
```

**Example 2:**
```
Input: s = "car", p = "c*v"
Output: false
Explanation: There is no substring matching the pattern.
```

**Example 3:**
```
Input: s = "luck", p = "u*"
Output: true
Explanation: The substrings "u", "uc", and "uck" match the pattern.
```

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
