# 2559. Count Vowel Strings in Ranges

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-vowel-strings-in-ranges](https://leetcode.com/problems/count-vowel-strings-in-ranges)
**Companies:** Amazon, Atlassian, Bloomberg, Google, Ibm, Mathworks, Microsoft, Paypal, Twilio

---

## Problem Description

Given an array of strings `words` and range queries `[l, r]`, count strings in `words[l..r]` that start **and** end with a vowel.

---

## Examples

**Example 1:**
```
words = ["apple", "orange", "banana", "umbrella"]
queries = [[0,1],[1,3]]
```
In the first query, both "apple" and "orange" start and end with a vowel → count = 2.
In the second query, only "orange" and "umbrella" satisfy the condition → count = 2.

**Example 2:**
```
words = ["abc", "def", "ghi"]
queries = [[0,2]]
```
No word starts and ends with a vowel, so the answer is `[0]`.

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

## Walkthrough

Consider `words = ["apple", "orange", "banana", "umbrella"]` and query `[0,3]`.
1. Build `prefix`:
   - i=0, "apple" qualifies → prefix[1]=1
   - i=1, "orange" qualifies → prefix[2]=2
   - i=2, "banana" does not → prefix[3]=2
   - i=3, "umbrella" qualifies → prefix[4]=3
2. Answer for `[0,3]` = `prefix[4] - prefix[0] = 3` (apple, orange, umbrella).
The same steps apply for any query range.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n + q) |
| **Space** | O(n) for prefix array |

---

## Follow-Up Questions

1. How would you handle updates to `words` (e.g., inserting or deleting a word) while still answering range queries efficiently?
2. Can the solution be extended to count words that start and end with **consonants** or any custom character set?

---

## Key Takeaway

> **Range count queries with a boolean property: precompute a prefix sum of the property, then each query is O(1) via `prefix[r+1] - prefix[l]`.**