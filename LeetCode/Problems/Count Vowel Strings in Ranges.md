# 2559. Count Vowel Strings in Ranges

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-vowel-strings-in-ranges](https://leetcode.com/problems/count-vowel-strings-in-ranges)
**Companies:** Amazon, Atlassian, Bloomberg, Google, Ibm, Mathworks, Microsoft, Paypal, Twilio

---

## Problem Description

Given an array of strings `words` and range queries `[l, r]`, count strings in `words[l..r]` that start **and** end with a vowel.

---

## Approach: Prefix Sum — O(n + q) ✅

```
FUNCTION vowelStrings(words, queries):
    vowels = set('aeiou')
    prefix = [0] * (len(words) + 1)

    FOR i, word IN enumerate(words):
        prefix[i + 1] = prefix[i] + (1 IF word[0] IN vowels AND word[-1] IN vowels ELSE 0)

    result = []
    FOR [l, r] IN queries:
        result.ADD(prefix[r + 1] - prefix[l])

    RETURN result
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n + q) |
| **Space** | O(n) for prefix array |

---

## Key Takeaway

> **Range count queries with a boolean property: precompute a prefix sum of the property, then each query is O(1) via `prefix[r+1] - prefix[l]`.**
