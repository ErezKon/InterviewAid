# 3297. Count Substrings That Can Be Rearranged to Contain a String I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-substrings-that-can-be-rearranged-to-contain-a-string-i](https://leetcode.com/problems/count-substrings-that-can-be-rearranged-to-contain-a-string-i)
**Companies:** Amazon

---

## Problem Description

Given strings `word1` and `word2`, count substrings of `word1` that can be rearranged to **contain** `word2` as a substring (i.e., the substring has at least as many of each character as `word2`).

---

## Examples

| Input | Output |
|-------|--------|
| `word1 = "ababc", word2 = "abc"` | `3` |
| `word1 = "aaaa", word2 = "aa"` | `6` |

*Explanation*: For the first case, the valid substrings are `"ababc"` (positions 0‑4), `"bab"` (1‑3) after rearrangement contains `abc`, and `"abc"` (2‑4).

---

## Approach

```
FUNCTION countSubstrings(word1, word2):
    need = Counter(word2)
    have = Counter()
    formed = 0; required = len(need)
    left = 0; result = 0

    FOR right ← 0 TO LENGTH(word1) - 1 DO
        c = word1[right]
        have[c] += 1
        IF have[c] == need[c]: formed += 1

        WHILE formed == required:
            result += LENGTH(word1) - right  // all extensions valid
            lc = word1[left]
            have[lc] -= 1
            IF have[lc] < need[lc]: formed -= 1
            left += 1

    RETURN result
```

---

## Walkthrough

Take `word1 = "ababc"`, `word2 = "abc"`.

1. `need` = {a:1, b:1, c:1}. Start with `right = 0` (`'a'`): `have`={a:1}, `formed`=0.
2. `right = 1` (`'b'`): `have`={a:1,b:1}, `formed`=0.
3. `right = 2` (`'a'`): `have`={a:2,b:1}, `formed`=0.
4. `right = 3` (`'b'`): `have`={a:2,b:2}, `formed`=0.
5. `right = 4` (`'c'`): `have`={a:2,b:2,c:1}. Now each needed char meets requirement, so `formed = 3`.
6. Enter while‑loop: add `len(word1)-right = 5-4 = 1` to result (substring `"ababc"`). Shrink left: remove `'a'`, `have` a becomes 1, still meets need, continue while‑loop, add another 1 (substring `"babc"`). Remove `'b'`, now `b` count falls below need, exit while‑loop.
7. Continue scanning – no more characters – final result = 3.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) where n = length of `word1` |
| **Space** | O(26) = O(1) |

---

## Follow-Up Questions

1. How would the solution change if `word2` could contain duplicate characters more than once?
2. Can the algorithm be adapted to return the actual substrings instead of just the count?
3. What if the condition was “strictly contains” (must have at least one extra character beyond `word2`)?

---

## Key Takeaway

> **"Contains as anagram" substring counting = sliding window with character frequency tracking. Once all required frequencies are met, count all right‑extensions and shrink from the left.**