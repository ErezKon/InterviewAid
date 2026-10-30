# 1255. Maximum Score Words Formed by Letters

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-score-words-formed-by-letters](https://leetcode.com/problems/maximum-score-words-formed-by-letters)
**Companies:** Amazon, Bloomberg, Google, Meta

---

## Problem Description

Given a list of `words`, list of  single `letters` (might be repeating) and `score` of every character.

Return the maximum score of **any** valid set of words formed by using the given letters (`words[i]` cannot be used two or more times).

It is not necessary to use all characters in `letters` and each letter can only be used once. Score of letters `'a'`, `'b'`, `'c'`, ... ,`'z'` is given by `score[0]`, `score[1]`, ... , `score[25]` respectively.

**Constraints:**
- `1 <= words.length <= 14`
- `1 <= words[i].length <= 15`
- `1 <= letters.length <= 100`
- `letters[i].length == 1`
- `score.length == 26`
- `0 <= score[i] <= 10`
- `words[i]`, `letters[i]` contains only lower case English letters.

## Examples

**Example 1:**
```
Input: words = ["dog","cat","dad","good"], letters = ["a","a","c","d","d","d","g","o","o"], score = [1,0,9,5,0,0,3,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0]
Output: 23
Explanation: Score  a=1, c=9, d=5, g=3, o=2
Given letters, we can form the words "dad" (5+1+5) and "good" (3+2+2+5) with a score of 23.
Words "dad" and "dog" only get a score of 21.
```

**Example 2:**
```
Input: words = ["xxxz","ax","bx","cx"], letters = ["z","a","b","c","x","x","x"], score = [4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,10]
Output: 27
Explanation: Score  a=4, b=4, c=4, x=5, z=10
Given letters, we can form the words "ax" (4+5), "bx" (4+5) and "cx" (4+5) with a score of 27.
Word "xxxz" only get a score of 25.
```

**Example 3:**
```
Input: words = ["leetcode"], letters = ["l","e","t","c","o","d"], score = [0,0,1,1,1,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,0,0,0]
Output: 0
Explanation: Letter "e" can only be used once.
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
