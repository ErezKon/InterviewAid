# 916. Word Subsets

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/word-subsets](https://leetcode.com/problems/word-subsets)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Zoho

---

## Problem Description

You are given two string arrays `words1` and `words2`.

A string `b` is a **subset** of string `a` if every letter in `b` occurs in `a` including multiplicity.

- For example, `"wrr"` is a subset of `"warrior"` but is not a subset of `"world"`.

A string `a` from `words1` is **universal** if for every string `b` in `words2`, `b` is a subset of `a`.

Return an array of all the **universal** strings in `words1`. You may return the answer in **any order**.

**Constraints:**
- `1 <= words1.length, words2.length <= 10^4`
- `1 <= words1[i].length, words2[i].length <= 10`
- `words1[i]` and `words2[i]` consist only of lowercase English letters.
- All the strings of `words1` are **unique**.

## Examples

**Example 1:**
```
Input: words1 = ["amazon","apple","facebook","google","leetcode"], words2 = ["e","o"]
Output: ["facebook","google","leetcode"]
```

**Example 2:**
```
Input: words1 = ["amazon","apple","facebook","google","leetcode"], words2 = ["lc","eo"]
Output: ["leetcode"]
```

**Example 3:**
```
Input: words1 = ["acaac","cccbb","aacbb","caacc","bcbbb"], words2 = ["c","cc","b"]
Output: ["cccbb"]
```

## Approach
1. Compute the maximum required frequency for each letter across all `words2`.
2. For each word in `words1`, verify it meets or exceeds those frequencies.

```text
FUNCTION wordSubsets(words1, words2):
    maxFreq ← ARRAY[26] OF 0
    FOR w IN words2:
        freq ← countLetters(w)
        FOR i FROM 0 TO 25:
            maxFreq[i] ← MAX(maxFreq[i], freq[i])
    result ← []
    FOR w IN words1:
        freq ← countLetters(w)
        IF FOR ALL i FROM 0 TO 25: freq[i] ≥ maxFreq[i]:
            result.ADD(w)
    RETURN result
```

## Walkthrough
| Word (words2) | Max frequencies after processing |
|---------------|-----------------------------------|
| "e"          | e:1                               |
| "o"          | e:1, o:1                          |
| "l" (second example) | l:1, e:1 |

When checking "google", its counts `g:2, o:2, l:1, e:1` satisfy the requirements.

## Complexity Analysis
Time: O(N·L + M·K) where N and M are lengths of `words1` and `words2`, L and K are average word lengths.
Space: O(1) extra (26-element array).

## Follow-Up Questions
1. How would you handle Unicode characters beyond 'a'-'z'?
2. Can you extend the solution to support wildcard characters in `words2`?
3. What if `words2` is extremely large—how would you stream the computation?

## Key Takeaway
Aggregating the maximum letter frequencies from `words2` reduces the problem to a simple per-word frequency check, yielding linear time overall.
