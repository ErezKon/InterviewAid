# 3407. Substring Matching Pattern

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/substring-matching-pattern](https://leetcode.com/problems/substring-matching-pattern)
**Companies:** Amazon

---

## Problem Description

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
Split `p` at the single `'*'` into `left` and `right`. A match is `left`, then any gap, then `right`. Greedily take the **earliest** occurrence of `left` in `s` (an earlier end leaves the most room for `right`), then check whether `right` occurs anywhere starting at or after the end of that occurrence. Empty `left`/`right` match trivially.

```text
FUNCTION HasMatch(s, p):
    SET star ← INDEX_OF(p, '*')
    SET left ← p[0 : star]
    SET right ← p[star + 1 : ]
    SET i ← FIND(s, left, from 0)
    IF i = -1:
        RETURN false
    SET j ← FIND(s, right, from i + LENGTH(left))
    RETURN j ≠ -1
```

## Walkthrough
`s = "leetcode"`, `p = "ee*e"` → `left = "ee"`, `right = "e"`.

| Step | Action | Result |
|------|--------|--------|
| 1 | Find `"ee"` in `"leetcode"` | first at index 1 (`s[1..2] = "ee"`) |
| 2 | Search `"e"` starting at index `1 + 2 = 3` (`"tcode"`) | found at index 7 |
| 3 | Both found | return `true` |

The matched substring is `s[1..7] = "eetcode"`, with `'*'` = `"tcod"`.

## Complexity Analysis
- **Time:** O(n · m) in the worst case with naive substring search, where `n` is `|s|` and `m` is `|p|` (O(n + m) with KMP).
- **Space:** O(m) for the two pattern halves.

## Follow-Up Questions
- How would you handle a pattern with **multiple** `'*'` characters (greedy left-to-right matching of each piece)?
- What if `'?'` (match exactly one character) were also allowed?
- Why is choosing the earliest occurrence of `left` always safe?

## Key Takeaway
A single wildcard splits the pattern into two literal pieces; greedily matching the first piece as early as possible and then searching for the second piece after it decides the match.
