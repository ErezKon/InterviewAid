# 2645. Minimum Additions to Make Valid String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-additions-to-make-valid-string](https://leetcode.com/problems/minimum-additions-to-make-valid-string)
**Companies:** Amazon, Google, Microsoft, Tokopedia

---

## Problem Description
Given a string `word` consisting of lowercase letters, you may insert characters anywhere in the string. Determine the minimum number of insertions required so that the resulting string can be partitioned into a sequence of the substring `"abc"` repeated any number of times (e.g., `"abcabc"`).

## Examples
**Example 1:**
Input: `word = "b"`
Output: `2`
Explanation: Insert `"a"` before and `"c"` after to obtain `"abc"`.

**Example 2:**
Input: `word = "abc"`
Output: `0`
Explanation: The string already matches the required pattern.

## Approach
**Greedy Cycle Matching** – Iterate through `word` while simultaneously walking through the pattern `"abc"`. For each character in the pattern, if the current `word` character matches, advance the pointer; otherwise, count an insertion for the missing character.

```text
FUNCTION MinAdditions(word):
    SET pattern ← "abc"
    SET i ← 0               // index in word
    SET additions ← 0
    WHILE i < LEN(word):
        FOR ch IN pattern:
            IF i < LEN(word) AND word[i] = ch:
                SET i ← i + 1
            ELSE:
                SET additions ← additions + 1
    RETURN additions
```

## Walkthrough
`word = "b"`
1. Pattern `a`: mismatch → additions=1.
2. Pattern `b`: matches → i moves to end.
3. Pattern `c`: mismatch (i at end) → additions=2.
Result = 2.

## Complexity Analysis
- **Time:** `O(n)` where `n` is `LEN(word)` – each character is examined at most once.
- **Space:** `O(1)` – only a few counters are used.

## Follow‑Up Questions
1. How would the algorithm change if the required pattern were an arbitrary string `p` instead of `"abc"`?
2. Can you modify the solution to also return the final constructed valid string?
3. What if deletions were allowed in addition to insertions, and you wanted the minimum total operations?

## Key Takeaway
A single pass that greedily matches the repeating pattern counts exactly the characters that must be inserted to achieve a valid `"abc"` sequence.
