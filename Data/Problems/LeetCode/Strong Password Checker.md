# 420. Strong Password Checker

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/strong-password-checker](https://leetcode.com/problems/strong-password-checker)
**Companies:** Amazon, Google, Microsoft, Siemens, Wix, Zoho

---

## Problem Description

A password is considered strong if the below conditions are all met:

- It has at least `6` characters and at most `20` characters.
- It contains at least **one lowercase** letter, at least **one uppercase** letter, and at least **one digit**.
- It does not contain three repeating characters in a row (i.e., `"Baaabb0"` is weak, but `"Baaba0"` is strong).

Given a string `password`, return *the minimum number of steps required to make* `password` *strong. if* `password` *is already strong, return* `0`.

In one step, you can:

- Insert one character to `password`,
- Delete one character from `password`, or
- Replace one character of `password` with another character.

**Constraints:**
- `1 <= password.length <= 50`
- `password` consists of letters, digits, dot `'.'` or exclamation mark `'!'`.

## Examples

**Example 1:**
```
Input: password = "a"
Output: 5
```

**Example 2:**
```
Input: password = "aA1"
Output: 3
```

**Example 3:**
```
Input: password = "1337C0d3"
Output: 0
```

## Approach
Use a greedy strategy that first handles length constraints, then fixes repeating sequences while satisfying missing character types. The key insight is to prioritize deletions on repeating groups where `len % 3 == 0`, then `len % 3 == 1`, then others, because each deletion reduces a required replacement.

```text
FUNCTION strongPasswordChecker(password):
    SET n ← LENGTH(password)
    // Check character categories
    SET hasLower ← false
    SET hasUpper ← false
    SET hasDigit ← false
    FOR ch IN password:
        IF ch IS LOWERCASE LETTER: SET hasLower ← true
        ELSE IF ch IS UPPERCASE LETTER: SET hasUpper ← true
        ELSE IF ch IS DIGIT: SET hasDigit ← true
    SET missingTypes ← 3 - (hasLower + hasUpper + hasDigit)

    // Find lengths of repeating groups (>=3)
    SET repeats ← []
    SET i ← 2
    WHILE i < n:
        IF password[i] = password[i-1] = password[i-2]:
            SET j ← i
            WHILE j < n AND password[j] = password[i]:
                SET j ← j + 1
            APPEND (j - i + 2) TO repeats
            SET i ← j
        ELSE:
            SET i ← i + 1

    IF n < 6:
        RETURN MAX(missingTypes, 6 - n)
    ELSE IF n ≤ 20:
        SET replace ← 0
        FOR len IN repeats:
            SET replace ← replace + FLOOR(len / 3)
        RETURN MAX(missingTypes, replace)
    ELSE:
        // n > 20, need deletions
        SET deleteCount ← n - 20
        // Optimize deletions on repeats
        SORT repeats BY (len MOD 3) ASCENDING
        FOR idx FROM 0 TO LENGTH(repeats)-1:
            SET len ← repeats[idx]
            IF deleteCount = 0: BREAK
            IF len < 3: CONTINUE
            IF len MOD 3 = 0:
                SET reduce ← MIN(1, deleteCount)
                SET repeats[idx] ← len - reduce
                SET deleteCount ← deleteCount - reduce
            ELSE IF len MOD 3 = 1:
                SET reduce ← MIN(2, deleteCount)
                SET repeats[idx] ← len - reduce
                SET deleteCount ← deleteCount - reduce
            ELSE:
                SET reduce ← MIN(3, deleteCount)
                SET repeats[idx] ← len - reduce
                SET deleteCount ← deleteCount - reduce
        // After deletions, compute remaining replacements
        SET replace ← 0
        FOR len IN repeats:
            IF len ≥ 3:
                SET replace ← replace + FLOOR(len / 3)
        RETURN (n - 20) + MAX(missingTypes, replace)
```

## Walkthrough
Password `"aaaB1"` (length 5):
1. Missing types: has lower? no → missing 1 (lower). Upper and digit present.
2. Length < 6, need 1 insertion.
3. Repeating group `"aaa"` needs 1 replacement, but insertion can break it.
Result = max(missing=1, 6-5=1) = 1 step (insert a lower‑case letter between the a's).

## Complexity Analysis
- **Time:** O(n) to scan characters and identify repeats; sorting repeats is O(k log k) where k ≤ n/3, overall O(n log n) in worst case.
- **Space:** O(k) for repeat lengths, O(n) in worst case but can be done in O(1) with careful counting.

## Follow‑Up Questions
1. How would the solution change if the allowed password length range were different (e.g., 8‑30)?
2. Can the algorithm be adapted to return the actual modified password string?
3. What modifications are needed if Unicode characters are allowed and case folding rules differ?

## Key Takeaway
By separating length adjustments, missing character types, and repeating‑character fixes, and by greedily applying deletions to the most beneficial repeat groups, we achieve the minimum number of edits in linear time.
