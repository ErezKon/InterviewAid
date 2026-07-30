# 3136. Valid Word

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/valid-word](https://leetcode.com/problems/valid-word)
**Companies:** Amazon, Bloomberg, Expedia, Google, Meta, Microsoft, Tcs, Ukg

---

## Problem Description
Given a string `word`, return `true` if it satisfies all of the following conditions: the length is at least three, it contains at least one vowel and at least one consonant, and every character is either a letter or a digit (no special characters). Otherwise, return `false`.

## Examples
| word | output |
|------|--------|
| "Hello1" | true |
| "aei" | false (no consonant) |
| "bcdf" | false (no vowel) |
| "ab!" | false (special character) |

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
