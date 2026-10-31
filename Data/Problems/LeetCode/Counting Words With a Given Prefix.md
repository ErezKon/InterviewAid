# 2185. Counting Words With a Given Prefix

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/counting-words-with-a-given-prefix](https://leetcode.com/problems/counting-words-with-a-given-prefix)
**Companies:** Bloomberg, Google, Meta, Microsoft

---

## Problem Description
You are given an array of strings `words` and a string `pref`.

Return *the number of strings in* `words` *that contain* `pref` *as a **prefix***.

A **prefix** of a string `s` is any leading contiguous substring of `s`.

**Constraints:**
- `1 <= words.length <= 100`
- `1 <= words[i].length, pref.length <= 100`
- `words[i]` and `pref` consist of lowercase English letters.

## Examples
```
Example 1:
  Input: words = ["pay","attention","practice","attend"], pref = "at"
  Output: 2
  Explanation: The 2 strings that contain "at" as a prefix are: "attention" and "attend".
```

```
Example 2:
  Input: words = ["leetcode","win","loops","success"], pref = "code"
  Output: 0
  Explanation: There are no strings that contain "code" as a prefix.
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
- **Time:** O(n · m) – each word is examined up to the length of the prefix.
- **Space:** O(1) extra space.

## Follow-Up Questions
- How would you handle a large number of queries with different prefixes?
- Can you improve the query time using a Trie data structure?
- What changes are needed if the comparison should be case-insensitive?

## Key Takeaway
A simple linear scan with a prefix check solves the problem efficiently, while a Trie can accelerate multiple prefix queries.
