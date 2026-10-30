# 1576. Replace All ?'s to Avoid Consecutive Repeating Characters

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/replace-all-s-to-avoid-consecutive-repeating-characters](https://leetcode.com/problems/replace-all-s-to-avoid-consecutive-repeating-characters)
**Companies:** Microsoft

---

## Table of Contents

- **[Problem Description](#problem-description)**
- **[Examples](#examples)**
- **[Key Insight](#key-insight)**
- **[Approach](#approach)**
- **[Walkthrough](#walkthrough)**
- **[Complexity Analysis](#complexity-analysis)**
- **[Follow-Up Questions](#follow-up-questions)**
- **[Key Takeaway](#key-takeaway)**

## Problem Description

Given a string `s` containing only lowercase English letters and the `'?'` character, convert **all **the `'?'` characters into lowercase letters such that the final string does not contain any **consecutive repeating **characters. You **cannot **modify the non `'?'` characters.

It is **guaranteed **that there are no consecutive repeating characters in the given string **except **for `'?'`.

Return *the final string after all the conversions (possibly zero) have been made*. If there is more than one solution, return **any of them**. It can be shown that an answer is always possible with the given constraints.

**Constraints:**
- `1 <= s.length <= 100`
- `s` consist of lowercase English letters and `'?'`.

## Examples

**Example 1:**
```
Input: s = "?zs"
Output: "azs"
Explanation: There are 25 solutions for this problem. From "azs" to "yzs", all are valid. Only "z" is an invalid modification as the string will consist of consecutive repeating characters in "zzs".
```

**Example 2:**
```
Input: s = "ubv?w"
Output: "ubvaw"
Explanation: There are 24 solutions for this problem. Only "v" and "w" are invalid modifications as the strings will consist of consecutive repeating characters in "ubvvw" and "ubvww".
```

## Key Insight

You only need to ensure each replacement differs from its immediate neighbors. A simple left-to-right greedy pass works: at each `?`, pick any letter different from the previous placed character and the next original character (if the next is known and not `?`). Using just `{a, b, c}` is sufficient because with at most two neighbors, at least one of these three letters will differ from both.

## Approach

- **Traverse** the string left to right.
- **When you see a `?`**:
  - Consider candidates from `{a, b, c}`.
  - Exclude the character equal to the previous character (if any).
  - Exclude the character equal to the next character (if it exists and is not `?`).
  - Pick any remaining candidate (choose the smallest lexicographically for determinism).
- **Otherwise**, keep the current letter.

This guarantees no two adjacent characters are equal.

Visual intuition:

```
Index:      0 1 2 3 4 5 6
String:     j ? q g ? ? b
Neighbors:    ^   ^ ^
Pick for i=1: not j, not q  -> a
Pick for i=4: not g, not ?  -> a (tentative, next will adjust independently)
Pick for i=5: not a, not b  -> c
```

### Pseudocode

```text
FUNCTION ReplaceQuestions(s):
    n ← LENGTH(s)
    chars ← ARRAY OF CHARACTERS FROM s

    FOR i FROM 0 TO n - 1 DO
        IF chars[i] = '?' THEN
            prev ← (i > 0) ? chars[i - 1] : NONE
            next ← (i + 1 < n AND chars[i + 1] != '?') ? chars[i + 1] : NONE

            FOR c IN ['a', 'b', 'c'] DO
                IF c != prev AND c != next THEN
                    chars[i] ← c
                    BREAK
                END IF
            END FOR
        END IF
    END FOR

    RETURN STRING_FROM(chars)
```

## Walkthrough

Example: `s = "j?qg??b"`

- i=0: `j` → keep → `j`
- i=1: `?` → neighbors: prev=`j`, next=`q` → choose `a` (≠`j`, ≠`q`) → `ja`
- i=2: `q` → keep → `jaq`
- i=3: `g` → keep → `jaqg`
- i=4: `?` → neighbors: prev=`g`, next is `?` → choose `a` (≠`g`) → `jaqga`
- i=5: `?` → neighbors: prev=`a`, next=`b` → choose `c` (≠`a`, ≠`b`) → `jaqgac`
- i=6: `b` → keep → `jaqgacb`

Final string: `"jaqgacb"` (valid; no equal adjacent letters).

## Complexity Analysis

| Time | Space |
| --- | --- |
| O(n) – single pass over the string | O(1) extra (if modifying in place) or O(n) to build a new string |

## Follow-Up Questions

- **What if the alphabet size were only 2?**
  - It may become impossible for certain patterns (e.g., fixed neighbors both equal force a conflict). You can still attempt a greedy fill and detect failure when no candidate remains.

- **How to get the lexicographically smallest valid string?**
  - Always pick the smallest candidate at each `?` (e.g., try `a`, then `b`, then `c`). This greedy choice is optimal because it never blocks feasibility (you still have another letter available for the next position).

- **How to count the number of valid fillings?**
  - Adjacent `?` blocks interact, so counting requires DP over positions with state reflecting the previous letter. With 26 letters, transitions exclude the previous and (fixed) next letters.

- **Can we do it in-place?**
  - Yes. Convert to a mutable array (or operate on a char array) and write replacements directly.

## Key Takeaway

Local greedy replacement using just three letters `{a, b, c}` suffices to avoid consecutive repeats in a single linear pass.
