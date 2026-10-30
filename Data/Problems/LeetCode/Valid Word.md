# 3136. Valid Word

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/valid-word](https://leetcode.com/problems/valid-word)
**Companies:** Amazon, Bloomberg, Expedia, Google, Meta, Microsoft, Tcs, Ukg

---

## Problem Description

A word is considered **valid** if:

- It contains a **minimum** of 3 characters.
- It contains only digits (0-9), and English letters (uppercase and lowercase).
- It includes **at least** one **vowel**.
- It includes **at least** one **consonant**.

You are given a string `word`.

Return `true` if `word` is valid, otherwise, return `false`.

**Notes:**

- `'a'`, `'e'`, `'i'`, `'o'`, `'u'`, and their uppercases are **vowels**.
- A **consonant** is an English letter that is not a vowel.

**Constraints:**
- `1 <= word.length <= 20`
- `word` consists of English uppercase and lowercase letters, digits, `'@'`, `'#'`, and `'$'`.

## Examples

**Example 1:**
```
Input: word = "234Adas"
Output: true
Explanation: This word satisfies the conditions.
```

**Example 2:**
```
Input: word = "b3"
Output: false
Explanation: The length of this word is fewer than 3, and does not have a vowel.
```

**Example 3:**
```
Input: word = "a3$e"
Output: false
Explanation: This word contains a '$' character and does not have a consonant.
```

## Approach
Traverse the string once, tracking whether a vowel and a consonant have been seen. Validate each character: it must be a letter or digit; if a special character appears, return false immediately. After the loop, ensure the length requirement and that both vowel and consonant flags are true.

```text
FUNCTION isValidWord(word):
    IF LEN(word) < 3:
        RETURN false
    SET hasVowel ← false
    SET hasConsonant ← false
    FOR ch IN word:
        IF ch IS DIGIT:
            CONTINUE
        ELSE IF ch IS LETTER:
            IF ch IN {a,e,i,o,u,A,E,I,O,U}:
                SET hasVowel ← true
            ELSE:
                SET hasConsonant ← true
        ELSE:
            RETURN false  // special character
    RETURN hasVowel AND hasConsonant
```

## Walkthrough
Consider `word = "Hello1"`.
| Index | ch | Type | Action | hasVowel | hasConsonant |
|-------|----|------|--------|----------|--------------|
|0|H|letter (consonant)|SET hasConsonant←true|false|true|
|1|e|letter (vowel)|SET hasVowel←true|true|true|
|2|l|consonant|no change|true|true|
|3|l|consonant|no change|true|true|
|4|o|vowel|no change|true|true|
|5|1|digit|continue|true|true|
End of loop → both flags true → return true.

## Complexity Analysis
- Time: O(n) where n = len(word).
- Space: O(1) extra variables.

## Follow-Up Questions
1. How would you modify the algorithm to support Unicode letters?
2. Can you extend it to return the count of vowels and consonants?
3. What changes are needed if the word must start with a letter?

## Key Takeaway
A single linear scan with simple flag tracking efficiently validates all required word properties.
