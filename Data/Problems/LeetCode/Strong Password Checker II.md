# 2299. Strong Password Checker II

**Difficulty:** 🟢 Easy
**LeetCode:** https://leetcode.com/problems/strong-password-checker-ii
**Companies:** Microsoft
---
## Problem Description
Given a string `password` consisting of English letters, digits, and symbols, determine whether it is a **strong** password. A strong password must satisfy all of the following:
1. Length is at least 8 characters.
2. Contains at least one lowercase letter, one uppercase letter, one digit, and one special character from `!@#$%^&*()-+`.
3. No two identical characters are adjacent.
Return `true` if the password is strong, otherwise `false`.

## Examples
| password | Output | Explanation |
|----------|--------|-------------|
| "IloveLe3tcode!" | true | Meets length, contains lower, upper, digit, special, and no repeated adjacent chars. |
| "Me+You--" | false | Contains adjacent '-' characters. |
| "1234567" | false | Too short and missing required character types. |

## Approach
Check each requirement in a single pass using flags for character categories and a previous‑character tracker.

```text
FUNCTION isStrongPassword(password):
    IF LENGTH(password) < 8:
        RETURN false
    SET hasLower ← false
    SET hasUpper ← false
    SET hasDigit ← false
    SET hasSpecial ← false
    SET prev ← null
    FOR ch IN password:
        IF ch = prev:
            RETURN false
        IF ch IS LOWERCASE LETTER:
            SET hasLower ← true
        ELSE IF ch IS UPPERCASE LETTER:
            SET hasUpper ← true
        ELSE IF ch IS DIGIT:
            SET hasDigit ← true
        ELSE IF ch IN "!@#$%^&*()-+":
            SET hasSpecial ← true
        SET prev ← ch
    RETURN hasLower AND hasUpper AND hasDigit AND hasSpecial
```

## Walkthrough
Password `"Aa1!Aa1!"`:

| Index | ch | prev | Flags after ch | Action |
|-------|----|------|----------------|--------|
|0|A|null|upper=true|continue|
|1|a|A|lower=true|continue|
|2|1|a|digit=true|continue|
|3|!|1|special=true|continue|
|4|A|!|upper already true|continue|
|5|a|A|lower already true|continue|
|6|1|a|digit already true|continue|
|7|!|1|special already true|continue|
All flags true, no repeats → return true.

## Complexity Analysis
- **Time:** O(n), n = length of password.
- **Space:** O(1) extra space.

## Follow‑Up Questions
1. How would you modify the solution to return the minimum number of modifications needed to make a password strong?
2. Can the algorithm be adapted to handle Unicode characters and a larger set of special symbols?
3. What if the password policy changes to require no three consecutive identical characters?

## Key Takeaway
A single linear scan with simple flag variables efficiently validates all strong‑password criteria while ensuring constant extra space.
