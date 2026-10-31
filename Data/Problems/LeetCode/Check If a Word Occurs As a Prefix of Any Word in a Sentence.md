# 1455. Check If a Word Occurs As a Prefix of Any Word in a Sentence

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/check-if-a-word-occurs-as-a-prefix-of-any-word-in-a-sentence](https://leetcode.com/problems/check-if-a-word-occurs-as-a-prefix-of-any-word-in-a-sentence)
**Companies:** Amazon, Bloomberg, Google, Microsoft, Tcs, Yelp

---

## Problem Description
Given a `sentence` that consists of some words separated by a **single space**, and a `searchWord`, check if `searchWord` is a prefix of any word in `sentence`.

Return *the index of the word in* `sentence` *(**1-indexed**) where* `searchWord` *is a prefix of this word*. If `searchWord` is a prefix of more than one word, return the index of the first word **(minimum index)**. If there is no such word return `-1`.

A **prefix** of a string `s` is any leading contiguous substring of `s`.

**Constraints:**
- `1 <= sentence.length <= 100`
- `1 <= searchWord.length <= 10`
- `sentence` consists of lowercase English letters and spaces.
- `searchWord` consists of lowercase English letters.

## Examples
```
Example 1:
  Input: sentence = "i love eating burger", searchWord = "burg"
  Output: 4
  Explanation: "burg" is prefix of "burger" which is the 4th word in the sentence.
```

```
Example 2:
  Input: sentence = "this problem is an easy problem", searchWord = "pro"
  Output: 2
  Explanation: "pro" is prefix of "problem" which is the 2nd and the 6th word in the sentence, but we return 2 as it's the minimal index.
```

```
Example 3:
  Input: sentence = "i am tired", searchWord = "you"
  Output: -1
  Explanation: "you" is not a prefix of any word in the sentence.
```

## Approach
Split the sentence into words, iterate with an index, and check the prefix using a string starts-with operation.

```text
FUNCTION isPrefixOfWord(sentence, searchWord):
    SET words ← SPLIT(sentence, " ")
    FOR i ← 0 TO LENGTH(words) - 1:
        IF STARTS_WITH(words[i], searchWord):
            RETURN i + 1
    RETURN -1
```

## Walkthrough
| i (0-based) | word   | startsWith? | return |
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
