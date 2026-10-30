# 2182. Construct String With Repeat Limit

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/construct-string-with-repeat-limit](https://leetcode.com/problems/construct-string-with-repeat-limit)
**Companies:** Arista Networks, Fortinet, Google, Jpmorgan, Meta, Microsoft

---

## Problem Description
You are given a string `s` and an integer `repeatLimit`. Construct a new string `repeatLimitedString` using the characters of `s` such that no letter appears **more than** `repeatLimit` times **in a row**. You do **not** have to use all characters from `s`.

Return *the **lexicographically largest*** `repeatLimitedString` *possible*.

A string `a` is **lexicographically larger** than a string `b` if in the first position where `a` and `b` differ, string `a` has a letter that appears later in the alphabet than the corresponding letter in `b`. If the first `min(a.length, b.length)` characters do not differ, then the longer string is the lexicographically larger one.

**Constraints:**
- `1 <= repeatLimit <= s.length <= 10^5`
- `s` consists of lowercase English letters.

## Examples
```
Example 1:
  Input: s = "cczazcc", repeatLimit = 3
  Output: "zzcccac"
  Explanation: We use all of the characters from s to construct the repeatLimitedString "zzcccac".
    The letter 'a' appears at most 1 time in a row.
    The letter 'c' appears at most 3 times in a row.
    The letter 'z' appears at most 2 times in a row.
    Hence, no letter appears more than repeatLimit times in a row and the string is a valid repeatLimitedString.
    The string is the lexicographically largest repeatLimitedString possible so we return "zzcccac".
    Note that the string "zzcccca" is lexicographically larger but the letter 'c' appears more than 3 times in a row, so it is not a valid repeatLimitedString.
```
```
Example 2:
  Input: s = "aababab", repeatLimit = 2
  Output: "bbabaa"
  Explanation: We use only some of the characters from s to construct the repeatLimitedString "bbabaa".
    The letter 'a' appears at most 2 times in a row.
    The letter 'b' appears at most 2 times in a row.
    Hence, no letter appears more than repeatLimit times in a row and the string is a valid repeatLimitedString.
    The string is the lexicographically largest repeatLimitedString possible so we return "bbabaa".
    Note that the string "bbabaaa" is lexicographically larger but the letter 'a' appears more than 2 times in a row, so it is not a valid repeatLimitedString.
```

## Approach
The problem can be solved greedily using a max‑heap (or sorted frequency map) to always pick the currently largest available character. When the chosen character reaches the repeat limit, we temporarily pick the next largest character to break the streak, then push the original character back with its remaining count.

**Pseudocode**
```text
FUNCTION constructString(s, repeatLimit):
    SET freq ← COUNTER(s)                     // character → count
    SET heap ← MAX_HEAP()                     // stores (char, count) ordered by char descending
    FOR each (char, cnt) IN freq:
        heap.PUSH((char, cnt))
    SET result ← []
    SET prevChar ← ''
    SET prevCount ← 0
    WHILE heap NOT EMPTY:
        SET (c, cnt) ← heap.POP()
        IF c = prevChar AND prevCount = repeatLimit:
            IF heap EMPTY: BREAK
            SET (c2, cnt2) ← heap.POP()
            APPEND c2 TO result
            SET cnt2 ← cnt2 - 1
            IF cnt2 > 0: heap.PUSH((c2, cnt2))
            heap.PUSH((c, cnt))
            SET prevChar ← c2
            SET prevCount ← 1
        ELSE:
            SET use ← MIN(cnt, repeatLimit)
            APPEND c repeated use times TO result
            SET cnt ← cnt - use
            IF cnt > 0: heap.PUSH((c, cnt))
            SET prevChar ← c
            SET prevCount ← use
    RETURN JOIN(result)
```

## Walkthrough
Consider `s = "cczazcc"`, `repeatLimit = 3`.
| Step | Heap (top→bottom) | Result | Action |
|------|-------------------|--------|--------|
| 1 | (z,1), (c,4), (a,1) | "" | Pop `z`, use 1 → result `z` |
| 2 | (c,4), (a,1) | "z" | Pop `c`, use min(4,3)=3 → result `zccc` |
| 3 | (c,1), (a,1) | "zccc" | `c` reached limit, pop next `a`, use 1 → result `zccca` |
| 4 | (c,1) | "zccca" | Push back `c` (1), pop `c`, use 1 → result `zcccac` |
The final string respects the repeat limit and is lexicographically maximal.

## Complexity Analysis
- **Time:** O(N log K) where N is the length of `s` and K is the number of distinct characters (≤26). Each heap operation costs log K.
- **Space:** O(K) for the frequency map and heap.

## Follow‑Up Questions
1. How would the solution change if the repeat limit applied globally (total occurrences) instead of consecutively?
2. Can the algorithm be adapted to output the *smallest* possible string under the same constraints?
3. What modifications are needed if characters include uppercase letters or digits?

## Key Takeaway
Use a greedy max‑heap to always place the largest possible character, inserting a smaller character only when the repeat limit forces a break.
