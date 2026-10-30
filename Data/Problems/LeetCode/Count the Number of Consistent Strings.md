# 1684. Count the Number of Consistent Strings

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-the-number-of-consistent-strings](https://leetcode.com/problems/count-the-number-of-consistent-strings)
**Companies:** Bloomberg, Google, Robinhood

---

## Problem Description

You are given a string `allowed` consisting of **distinct** characters and an array of strings `words`. A string is **consistent** if all characters in the string appear in the string `allowed`.

Return *the number of **consistent** strings in the array* `words`.

**Constraints:**
- `1 <= words.length <= 10^4`
- `1 <= allowed.length <= 26`
- `1 <= words[i].length <= 10`
- The characters in `allowed` are **distinct**.
- `words[i]` and `allowed` contain only lowercase English letters.

---

## Examples

```
Example 1:
  Input: allowed = "ab", words = ["ad","bd","aaab","baa","badab"]
  Output: 2
  Explanation: Strings "aaab" and "baa" are consistent since they only contain characters 'a' and 'b'.
```

```
Example 2:
  Input: allowed = "abc", words = ["a","b","c","ab","ac","bc","abc"]
  Output: 7
  Explanation: All strings are consistent.
```

```
Example 3:
  Input: allowed = "cad", words = ["cc","acd","b","ba","bac","bad","ac","d"]
  Output: 4
  Explanation: Strings "cc", "acd", "ac", and "d" are consistent.
```

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