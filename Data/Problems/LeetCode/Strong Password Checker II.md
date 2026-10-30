# 2299. Strong Password Checker II

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/strong-password-checker-ii](https://leetcode.com/problems/strong-password-checker-ii)
**Companies:** Microsoft

---

## Problem Description

A password is said to be **strong** if it satisfies all the following criteria:

- It has at least `8` characters.
- It contains at least **one lowercase** letter.
- It contains at least **one uppercase** letter.
- It contains at least **one digit**.
- It contains at least **one special character**. The special characters are the characters in the following string: `"!@#$%^&*()-+"`.
- It does **not** contain `2` of the same character in adjacent positions (i.e., `"aab"` violates this condition, but `"aba"` does not).

Given a string `password`, return `true` *if it is a **strong** password*. Otherwise, return `false`.

**Constraints:**
- `1 <= password.length <= 100`
- `password` consists of letters, digits, and special characters: `"!@#$%^&*()-+"`.

## Examples

**Example 1:**
```
Input: password = "IloveLe3tcode!"
Output: true
Explanation: The password meets all the requirements. Therefore, we return true.
```

**Example 2:**
```
Input: password = "Me+You--IsMyDream"
Output: false
Explanation: The password does not contain a digit and also contains 2 of the same character in adjacent positions. Therefore, we return false.
```

**Example 3:**
```
Input: password = "1aB!"
Output: false
Explanation: The password does not meet the length requirement. Therefore, we return false.
```

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
