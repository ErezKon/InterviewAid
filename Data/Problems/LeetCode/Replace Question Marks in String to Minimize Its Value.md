# 3081. Replace Question Marks in String to Minimize Its Value

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/replace-question-marks-in-string-to-minimize-its-value](https://leetcode.com/problems/replace-question-marks-in-string-to-minimize-its-value)
**Companies:** Amazon

---

## Problem Description

> *Note: the Approach/Walkthrough below solve an invented "no two adjacent equal" problem. Correct idea: count the fixed letters; for each `'?'` pop the letter with the smallest count (min-heap keyed by `(count, letter)`), record it and push it back with `count + 1`; finally **sort** the chosen letters and write them into the `'?'` positions left to right (value depends only on counts, sorting gives the lexicographically smallest string). O(n log 26).*

You are given a string `s`. `s[i]` is either a lowercase English letter or `'?'`.

For a string `t` having length `m` containing **only** lowercase English letters, we define the function `cost(i)` for an index `i` as the number of characters **equal** to `t[i]` that appeared before it, i.e. in the range `[0, i - 1]`.

The **value** of `t` is the **sum** of `cost(i)` for all indices `i`.

For example, for the string `t = "aab"`:

- `cost(0) = 0`
- `cost(1) = 1`
- `cost(2) = 0`
- Hence, the value of `"aab"` is `0 + 1 + 0 = 1`.

Your task is to **replace all** occurrences of `'?'` in `s` with any lowercase English letter so that the **value** of `s` is **minimized**.

Return *a string denoting the modified string with replaced occurrences of* `'?'`*. If there are multiple strings resulting in the **minimum value**, return the lexicographically smallest one.*

**Constraints:**
- `1 <= s.length <= 10^5`
- `s[i]` is either a lowercase English letter or `'?'`.

## Examples

**Example 1:**
```
Input: s = "???"
Output: "abc"
Explanation: In this example, we can replace the occurrences of '?' to make s equal to "abc".
For "abc", cost(0) = 0, cost(1) = 0, and cost(2) = 0.
The value of "abc" is 0.
Some other modifications of s that have a value of 0 are "cba", "abz", and, "hey".
Among all of them, we choose the lexicographically smallest.
```

**Example 2:**
```
Input: s = "a?a?"
Output: "abac"
Explanation: In this example, the occurrences of '?' can be replaced to make s equal to "abac".
For "abac", cost(0) = 0, cost(1) = 0, cost(2) = 1, and cost(3) = 0.
The value of "abac" is 1.
```

## Approach
Iterate through the string, and for each `'?'` choose the smallest letter (`'a'`‑`'z'`) that differs from its immediate neighbors.

```text
FUNCTION MinimizeString(s):
    CONVERT s TO mutable list chars
    FOR i ← 0 TO LENGTH(chars) - 1:
        IF chars[i] = '?':
            FOR c ← 'a' TO 'z':
                IF (i > 0 AND chars[i-1] = c) OR (i < LENGTH(chars)-1 AND chars[i+1] = c):
                    CONTINUE
                SET chars[i] ← c
                BREAK
    RETURN JOIN(chars)
```

## Walkthrough
| Index | Original | Chosen Char | Result So Far |
|------|----------|-------------|--------------|
| 0 | ? | a (no left neighbor, right is 'a') | a |
| 1 | a | – | a |
| 2 | b | – | ab |
| 3 | ? | a (left is 'b', right is '?') | aba |
| 4 | ? | c (left is 'a', no right) | abac |

## Complexity Analysis
- Time: O(n·26) → O(n) since 26 is constant.
- Space: O(n) for mutable character list.

## Follow‑Up Questions
1. How would you handle uppercase letters as well?
2. Can the algorithm be adapted to minimize the number of distinct letters used?
3. What if the string must also avoid forming a given forbidden substring?

## Key Takeaway
Greedy selection of the smallest valid character at each `'?'` yields the lexicographically minimal string while respecting adjacency constraints.
