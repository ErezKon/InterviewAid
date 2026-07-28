# 1684. Count the Number of Consistent Strings

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-the-number-of-consistent-strings](https://leetcode.com/problems/count-the-number-of-consistent-strings)
**Companies:** Bloomberg, Google, Robinhood

---

## Problem Description

A string is **consistent** if every character in it appears in the `allowed` string. Count consistent strings in `words`.

---

## Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `allowed = "ab"`, `words = ["ad","bd","aaab","baa","badab"]` | `2` | Only "aaab" and "baa" contain only 'a' and 'b'. |
| `allowed = "abc"`, `words = ["a","b","c","ab","ac","bc","abc"]` | `7` | All words are consistent because they use only allowed characters. |

---

## Approach

```
FUNCTION countConsistentStrings(allowed, words):
    SET allowedSet ← SET(allowed)
    count ← 0
    FOR each word IN words DO
        IF ALL char IN word SATISFIES char IN allowedSet:
            count ← count + 1
    RETURN count
```

---

## Walkthrough

**Example 1:** `allowed = "ab"`, `words = ["ad","bd","aaab","baa","badab"]`

| Step | Action | Result |
|------|--------|--------|
| 1 | Build `allowedSet` = {`a`,`b`} | — |
| 2 | Check "ad": contains `d` not in set → skip |
| 3 | Check "bd": contains `d` → skip |
| 4 | Check "aaab": all chars in set → count = 1 |
| 5 | Check "baa": all chars in set → count = 2 |
| 6 | Check "badab": contains `d` → skip |
| 7 | Return `count` | `2` |

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n × m) where n = number of words, m = average word length |
| **Space** | O(1) (set of at most 26 characters) |

---

## Follow-Up Questions

1. How would you modify the solution if `allowed` could contain uppercase letters and the check should be case‑insensitive?
2. Can you solve the problem in a single pass without explicitly building a set, using bit‑masking for the alphabet?
3. How would the approach change if you needed to return the list of consistent strings instead of just the count?

---

## Key Takeaway

> **Convert the allowed string to a set for O(1) character lookups, then iterate through each word, checking all its characters against the set.**