# 916. Word Subsets

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/word-subsets](https://leetcode.com/problems/word-subsets)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Zoho

---

## Problem Description
Given two string arrays `words1` and `words2`, a word `a` from `words1` is a *universal* word if for every word `b` in `words2`, `b`'s character frequencies are all less than or equal to those in `a`. Return all universal words in any order.

## Examples
**Example 1:**
Input: `words1 = ["amazon","apple","facebook","google","leetcode"]`, `words2 = ["e","o"]`
Output: `["facebook","google","leetcode"]`
Explanation: Each universal word contains at least one `e` and one `o`.

**Example 2:**
Input: `words1 = ["amazon","apple","facebook","google","leetcode"]`, `words2 = ["l","e"]`
Output: `["apple","google","leetcode"]`

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
Space: O(1) extra (26‑element array).

## Follow-Up Questions
1. How would you handle Unicode characters beyond 'a'‑'z'?
2. Can you extend the solution to support wildcard characters in `words2`?
3. What if `words2` is extremely large—how would you stream the computation?

## Key Takeaway
Aggregating the maximum letter frequencies from `words2` reduces the problem to a simple per‑word frequency check, yielding linear time overall.
