# 1455. Check If a Word Occurs As a Prefix of Any Word in a Sentence

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/check-if-a-word-occurs-as-a-prefix-of-any-word-in-a-sentence](https://leetcode.com/problems/check-if-a-word-occurs-as-a-prefix-of-any-word-in-a-sentence)
**Companies:** Amazon, Bloomberg, Google, Microsoft, Tcs, Yelp

---

## Problem Description
Given a string `sentence` consisting of words separated by single spaces and a string `searchWord`, return the index (1‑based) of the first word in `sentence` that starts with `searchWord`. If no such word exists, return `-1`. Constraints: `1 ≤ sentence.length ≤ 10⁴`, `1 ≤ searchWord.length ≤ 10³`.

## Examples
**Example 1**
```
Input: sentence = "i love eating burger", searchWord = "burg"
Output: 4
Explanation: The fourth word "burger" starts with "burg".
```
**Example 2**
```
Input: sentence = "hello world", searchWord = "hi"
Output: -1
Explanation: No word starts with "hi".
```

## Approach
Split the sentence into words, iterate with an index, and check the prefix using a string starts‑with operation.

```text
FUNCTION isPrefixOfWord(sentence, searchWord):
    SET words ← SPLIT(sentence, " ")
    FOR i ← 0 TO LENGTH(words) - 1:
        IF STARTS_WITH(words[i], searchWord):
            RETURN i + 1
    RETURN -1
```

## Walkthrough
| i (0‑based) | word   | startsWith? | return |
|------------|--------|-------------|--------|
|0|"i"|no|—|
|1|"love"|no|—|
|2|"eating"|no|—|
|3|"burger"|yes|return 4|
The function returns `4` as the first matching index.

## Complexity Analysis
- **Time:** O(N) where N is the number of characters in `sentence` (splitting and scanning once).
- **Space:** O(W) for the list of words, where W is the number of words.

## Follow-Up Questions
1. How would you solve the problem without splitting the entire sentence into an array?
2. How can you modify the solution to return all matching word indices?
3. What changes are needed if the sentence may contain punctuation?

## Key Takeaway
A simple linear scan with a prefix check yields an O(N) solution for finding the first word that starts with a given prefix.
