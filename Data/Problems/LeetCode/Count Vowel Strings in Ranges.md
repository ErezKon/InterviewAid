# 2559. Count Vowel Strings in Ranges

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-vowel-strings-in-ranges](https://leetcode.com/problems/count-vowel-strings-in-ranges)
**Companies:** Amazon, Atlassian, Bloomberg, Google, Ibm, Mathworks, Microsoft, Paypal, Twilio

---

## Problem Description

You are given a **0-indexed** array of strings `words` and a 2D array of integers `queries`.

Each query `queries[i] = [l_i, r_i]` asks us to find the number of strings present at the indices ranging from `l_i` to `r_i` (both **inclusive**) of `words` that start and end with a vowel.

Return *an array* `ans` *of size* `queries.length`*, where* `ans[i]` *is the answer to the* `i`*-th query*.

**Note** that the vowel letters are `'a'`, `'e'`, `'i'`, `'o'`, and `'u'`.

**Constraints:**
- `1 <= words.length <= 10^5`
- `1 <= words[i].length <= 40`
- `words[i]` consists only of lowercase English letters.
- `sum(words[i].length) <= 3 * 10^5`
- `1 <= queries.length <= 10^5`
- `0 <= l_i <= r_i < words.length`

---

## Examples

```
Example 1:
  Input: words = ["aba","bcb","ece","aa","e"], queries = [[0,2],[1,4],[1,1]]
  Output: [2,3,0]
  Explanation: The strings starting and ending with a vowel are "aba", "ece", "aa" and "e".
  The answer to the query [0,2] is 2 (strings "aba" and "ece").
  to query [1,4] is 3 (strings "ece", "aa", "e").
  to query [1,1] is 0.
  We return [2,3,0].
```

```
Example 2:
  Input: words = ["a","e","i"], queries = [[0,2],[0,1],[2,2]]
  Output: [3,2,1]
  Explanation: Every string satisfies the conditions, so we return [3,2,1].
```

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