# 2185. Counting Words With a Given Prefix

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/counting-words-with-a-given-prefix](https://leetcode.com/problems/counting-words-with-a-given-prefix)
**Companies:** Bloomberg, Google, Meta, Microsoft

---

## Problem Description
Given an array of strings `words` and a string `pref`, return the number of strings in `words` that start with the prefix `pref`. The comparison is case‑sensitive and must be performed in O(n · m) time where *n* is the number of words and *m* is the length of `pref`.

## Examples
```text
Input: words = ["pay","attention","practice","attend"], pref = "at"
Output: 2
Explanation: "attention" and "attend" start with "at".

Input: words = ["leetcode","learn","learning","leader"], pref = "le"
Output: 1
Explanation: Only "leetcode" starts with "le".
```

## Approach
Iterate through each word and check whether its first `len(pref)` characters equal `pref`. Increment a counter for each match.

## Pseudocode
```text
FUNCTION prefixCount(words, pref):
    SET count ← 0
    FOR each word IN words:
        IF word STARTS_WITH pref:
            SET count ← count + 1
    RETURN count
```

## Walkthrough
| word | starts with "at"? | count |
|------|-------------------|-------|
| "pay" | NO | 0 |
| "attention" | YES | 1 |
| "practice" | NO | 1 |
| "attend" | YES | 2 |

## Complexity Analysis
- **Time:** O(n · m) – each word is examined up to the length of the prefix.
- **Space:** O(1) extra space.

## Follow‑Up Questions
- How would you handle a large number of queries with different prefixes?
- Can you improve the query time using a Trie data structure?
- What changes are needed if the comparison should be case‑insensitive?

## Key Takeaway
A simple linear scan with a prefix check solves the problem efficiently, while a Trie can accelerate multiple prefix queries.
