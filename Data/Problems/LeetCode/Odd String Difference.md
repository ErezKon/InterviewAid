# 2451. Odd String Difference

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/odd-string-difference](https://leetcode.com/problems/odd-string-difference)
**Companies:** Ibm, Salesforce, Visa, Wise

---

## Problem Description
You are given an array of equal‑length strings `words`. For each string, compute the list of differences between consecutive characters (ASCII codes). Exactly one string has a difference list that is unique among all strings. Return that unique string.

## Examples
| words | Unique String |
|-------|---------------|
| ["adc","wzy","abc"] | "abc" |
| ["aaa","bob","ccc","ddd"] | "bob" |
| ["abcd","bcde","cdef"] | (none, all same) |

## Approach
**Algorithm:** Map difference tuples to groups.
1. For each word, build a tuple of `ord(word[i+1]) - ord(word[i])` for all adjacent pairs.
2. Use a hash map to collect words by their difference tuple.
3. The tuple with a single word corresponds to the odd string; return it.

### Pseudocode
```text
FUNCTION oddString(words):
    CREATE diffMap ← empty map
    FOR each word IN words:
        SET diffs ← []
        FOR i ← 0 TO LENGTH(word) - 2:
            APPEND (ORD(word[i+1]) - ORD(word[i])) TO diffs
        SET key ← TUPLE(diffs)
        APPEND word TO diffMap[key]
    FOR each key, group IN diffMap:
        IF LENGTH(group) == 1:
            RETURN group[0]
    RETURN ""  // no unique string
```

## Walkthrough
For `words = ["adc","wzy","abc"]`:
| word | diffs |
|------|-------|
| "adc" | (3, -1) |
| "wzy" | (3, -1) |
| "abc" | (1, 1) |
The map groups two words under (3,-1) and one under (1,1); the unique group yields "abc".

## Complexity Analysis
- Time: O(k·L) where *k* is number of words and *L* is word length.
- Space: O(k·L) for storing the difference tuples.

## Follow‑Up Questions
1. How would you handle strings of varying lengths?
2. Can you solve the problem in O(k) time without storing full tuples?
3. What if you need to return all strings whose difference pattern appears exactly `t` times?

## Key Takeaway
Representing a string by its consecutive character differences creates a canonical signature; a hash map then isolates the uniquely‑patterned string in linear time.