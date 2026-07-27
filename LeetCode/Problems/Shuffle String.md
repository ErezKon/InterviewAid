# 1528. Shuffle String

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/shuffle-string](https://leetcode.com/problems/shuffle-string)
**Companies:** Google, Microsoft

---

## Problem Description

You are given a string `s` and an integer array `indices` of the same length. The string `s` will be shuffled such that the character at position `i` moves to `indices[i]` in the shuffled string.

Return the shuffled string.

### Examples

**Example 1:**
- **Input:** `s = "codeleet"`, `indices = [4,5,6,7,0,2,1,3]`
- **Output:** `"leetcode"`
- **Explanation:** `s[0]='c'` goes to position `4`, `s[4]='l'` goes to position `0`, etc.

**Example 2:**
- **Input:** `s = "abc"`, `indices = [0,1,2]`
- **Output:** `"abc"`

### Constraints

- `s.length == indices.length == n`
- `1 <= n <= 100`
- `s` contains only lowercase English letters.
- All values of `indices` are unique and in range `[0, n-1]`.

---

## Approach: Direct Placement — O(n) ✅

Create a result array and place each character at its target index.

```
FUNCTION restoreString(s, indices):
    result = [''] * LENGTH(s)
    FOR i ← 0 TO LENGTH(s) - 1:
        result[indices[i]] = s[i]
    RETURN JOIN(result)
```

### Walkthrough — `s = "codeleet"`, `indices = [4,5,6,7,0,2,1,3]`

| i | s[i] | indices[i] | result |
|---|------|------------|--------|
| 0 | c    | 4          | `____c___` |
| 1 | o    | 5          | `____co__` |
| 2 | d    | 6          | `____cod_` |
| 3 | e    | 7          | `____code` |
| 4 | l    | 0          | `l___code` |
| 5 | e    | 2          | `l_e_code` |
| 6 | e    | 1          | `lee_code` |
| 7 | t    | 3          | `leetcode` |

Result: `"leetcode"`

| Time | Space |
|------|-------|
| O(n) | O(n) |
