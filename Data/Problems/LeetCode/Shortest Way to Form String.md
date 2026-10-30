# 1055. Shortest Way to Form String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/shortest-way-to-form-string](https://leetcode.com/problems/shortest-way-to-form-string)
**Companies:** Google, Meta, Pinterest

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

A **subsequence** of a string is a new string that is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (i.e., `"ace"` is a subsequence of `"abcde"` while `"aec"` is not).

Given two strings `source` and `target`, return *the minimum number of **subsequences** of *`source`* such that their concatenation equals *`target`. If the task is impossible, return `-1`.

**Constraints:**
- `1 <= source.length, target.length <= 1000`
- `source` and `target` consist of lowercase English letters.

**Examples:**

**Example 1:**
```
Input: source = "abc", target = "abcbc"
Output: 2
Explanation: The target "abcbc" can be formed by "abc" and "bc", which are subsequences of source "abc".
```

**Example 2:**
```
Input: source = "abc", target = "acdbc"
Output: -1
Explanation: The target string cannot be constructed from the subsequences of source string due to the character "d" in target string.
```

**Example 3:**
```
Input: source = "xyz", target = "xzyxz"
Output: 3
Explanation: The target string can be constructed as follows "xz" + "y" + "xz".
```

---

## Approach: Greedy Two Pointer — O(m · n)

Greedily match as many characters of `target` as possible in each pass through `source`. Each full pass counts as one subsequence. If a pass makes no progress, a character in `target` doesn't exist in `source` → return `-1`.

```
FUNCTION shortestWay(source, target):
    count = 0; i = 0
    WHILE i < len(target):
        j = 0; start = i
        WHILE i < len(target) AND j < len(source):
            IF source[j] == target[i]: i += 1
            j += 1
        IF i == start: RETURN -1    // char not in source
        count += 1
    RETURN count
```

### Walkthrough — `source = "abc"`, `target = "abcbc"`

| Pass | source scan | target chars matched | i after |
|------|-------------|----------------------|---------|
| 1    | a→b→c       | a, b, c              | 3       |
| 2    | a→b→c       | b, c                 | 5       |

Result: `2`

| Time | Space |
|------|-------|
| O(m · n) | O(1) |

Where `m = len(target)`, `n = len(source)`. At most `m` passes, each scanning `source` once.

---

## Follow-up

- **O(m · log n)** optimization: precompute for each character, the list of positions in `source`. Use binary search to jump to the next occurrence instead of linear scanning.
