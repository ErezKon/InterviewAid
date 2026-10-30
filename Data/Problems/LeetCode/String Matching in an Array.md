# 1408. String Matching in an Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/string-matching-in-an-array](https://leetcode.com/problems/string-matching-in-an-array)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description

Given an array of string `words`, return *all strings in* `words` *that are a **substring** of another word*. You can return the answer in **any order**.

**Constraints:**
- `1 <= words.length <= 100`
- `1 <= words[i].length <= 30`
- `words[i]` contains only lowercase English letters.
- All the strings of `words` are **unique**.

## Examples

**Example 1:**
```
Input: words = ["mass","as","hero","superhero"]
Output: ["as","hero"]
Explanation: "as" is substring of "mass" and "hero" is substring of "superhero".
["hero","as"] is also a valid answer.
```

**Example 2:**
```
Input: words = ["leetcode","et","code"]
Output: ["et","code"]
Explanation: "et", "code" are substring of "leetcode".
```

**Example 3:**
```
Input: words = ["blue","green","bu"]
Output: []
Explanation: No string of words is substring of another string.
```

## Approach
**Algorithm:** Brute‑force pairwise check (Easy due to small constraints).
- **Insight:** For each word, check if it is a substring of any other word using the built‑in substring operation.
- **Optimization:** Sort words by length descending; a shorter word only needs to be checked against longer words.

### Pseudocode
```text
FUNCTION stringMatching(words):
    SORT words BY LENGTH descending
    result ← []
    FOR i FROM 0 TO LENGTH(words)-1:
        FOR j FROM i+1 TO LENGTH(words)-1:
            IF words[j] CONTAINS words[i]:
                APPEND words[i] TO result
                BREAK
    RETURN result
```

## Walkthrough
For `words = ["mass","as","hero","superhero"]` after sorting: `["superhero","hero","mass","as"]`.
- Compare "hero" with "superhero": contains → add "hero".
- Compare "mass" with previous longer words: none contain it.
- Compare "as" with "superhero" (no), then "hero" (no), then "mass" (yes) → add "as".
Result `["hero","as"]`.

## Complexity Analysis
- **Time:** O(n²·L) where n is number of words and L is average word length (substring check).
- **Space:** O(1) extra besides output list.

## Follow-Up Questions
- How would you improve the runtime if the list contained up to 10⁵ words?
- Can a suffix‑tree or Trie be used to achieve O(total length) time?
- What changes are needed if you must return the substrings in the original order?

## Key Takeaway
A simple double loop with length‑based ordering efficiently finds all words that are substrings of others for modest input sizes.
