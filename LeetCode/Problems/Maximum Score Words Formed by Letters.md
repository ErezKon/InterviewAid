# 1255. Maximum Score Words Formed by Letters

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-score-words-formed-by-letters](https://leetcode.com/problems/maximum-score-words-formed-by-letters)
**Companies:** Amazon, Bloomberg, Google, Meta

---

## Problem Description
Given an array of lowercase strings `words`, a multiset of characters `letters`, and an integer array `score` of length 26 where `score[i]` is the score of the i‑th alphabet letter, select a subset of `words` such that each chosen word can be formed using the available `letters` (each letter may be used at most as many times as it appears). The total score is the sum of the scores of all letters used in the selected words. Return the maximum possible total score.

## Examples
**Example 1:**
```
Input: words = ["dog","cat","dad","good"], letters = "aacdddggooo", score = [1,0,9,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
Output: 23
Explanation: Choose "dad" and "good". Their letters use up the available letters and yield a score of 5+5+9+4 = 23.
```
**Example 2:**
```
Input: words = ["abc","def"], letters = "abcd", score = [1,2,3,4,5,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
Output: 10
Explanation: Only "abc" can be formed; its score is 1+2+3 = 6. "def" cannot be formed.
```

## Approach
Use backtracking (DFS) to explore all subsets of `words`. Maintain a mutable count of remaining letters. For each word, check if it can be formed with the current remaining letters; if so, deduct its letters, add its score, recurse, then backtrack. Track the maximum score encountered.

```text
FUNCTION maxScoreWords(words, letters, score):
    SET available ← COUNTER of characters in letters
    SET maxScore ← 0

    FUNCTION dfs(index, currentScore, remaining):
        SET maxScore ← MAX(maxScore, currentScore)
        FOR i ← index TO LENGTH(words) - 1:
            SET word ← words[i]
            SET wordCount ← COUNTER of characters in word
            IF canForm(wordCount, remaining):
                // deduct letters
                FOR ch IN wordCount:
                    SET remaining[ch] ← remaining[ch] - wordCount[ch]
                // compute word's contribution
                SET wordScore ← 0
                FOR ch IN wordCount:
                    SET idx ← ORD(ch) - ORD('a')
                    SET wordScore ← wordScore + score[idx] * wordCount[ch]
                CALL dfs(i + 1, currentScore + wordScore, remaining)
                // backtrack letters
                FOR ch IN wordCount:
                    SET remaining[ch] ← remaining[ch] + wordCount[ch]
    CALL dfs(0, 0, available)
    RETURN maxScore

FUNCTION canForm(wordCount, remaining):
    FOR ch IN wordCount:
        IF remaining[ch] < wordCount[ch]:
            RETURN FALSE
    RETURN TRUE
```
The recursion explores each word either taken or skipped, yielding exponential time but acceptable for the typical constraints (≤ 14 words).

## Walkthrough
For `words = ["dog","cat","dad","good"]` and the given `letters`:
- Start with all letters available.
- Try taking "dog": possible, deduct letters, score = 5+... (compute).
- Recurse, later try adding "dad" and "good" while respecting remaining counts.
- The branch that selects "dad" and "good" reaches the maximum score 23.

## Complexity Analysis
- **Time:** O(2^n * m) where n = number of words and m = average word length (checking feasibility). In practice n ≤ 14.
- **Space:** O(n) recursion depth plus O(26) for letter counters.

## Follow‑Up Questions
1. How would you modify the algorithm if each word could be used multiple times?
2. Can the problem be solved using DP with bitmasking for larger `words` arrays?
3. What if the score of a word depended on the order of letters chosen?

## Key Takeaway
Backtracking with a mutable letter counter efficiently explores all feasible word subsets to find the maximum achievable score.
