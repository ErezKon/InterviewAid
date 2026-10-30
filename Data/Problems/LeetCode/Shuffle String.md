# 1528. Shuffle String

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/shuffle-string](https://leetcode.com/problems/shuffle-string)
**Companies:** Google, Microsoft

---

## Problem Description

You are given a string `s` and an integer array `indices` of the **same length**. The string `s` will be shuffled such that the character at the `i^th` position moves to `indices[i]` in the shuffled string.

Return *the shuffled string*.

**Constraints:**
- `s.length == indices.length == n`
- `1 <= n <= 100`
- `s` consists of only lowercase English letters.
- `0 <= indices[i] < n`
- All values of `indices` are **unique**.

**Examples:**

**Example 1:**
```
Input: s = "codeleet", indices = [4,5,6,7,0,2,1,3]
Output: "leetcode"
Explanation: As shown, "codeleet" becomes "leetcode" after shuffling.
```

**Example 2:**
```
Input: s = "abc", indices = [0,1,2]
Output: "abc"
Explanation: After shuffling, each character remains in its position.
```

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
