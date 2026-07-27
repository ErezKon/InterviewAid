# 420. Strong Password Checker

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/strong-password-checker](https://leetcode.com/problems/strong-password-checker)
**Companies:** Amazon, Google, Microsoft, Siemens, Wix, Zoho

---

## Approach: Greedy Case Analysis ✅

```
FUNCTION strongPasswordChecker(password):
    n = len(password)
    missing = 3 - (has_lower + has_upper + has_digit)

    // Count runs of 3+ repeating chars
    repeats = []
    i = 2
    WHILE i < n:
        IF password[i] == password[i-1] == password[i-2]:
            j = i
            WHILE j < n AND password[j] == password[i]: j += 1
            repeats.ADD(j - i + 2)
            i = j
        ELSE:
            i += 1

    IF n < 6: RETURN MAX(missing, 6 - n)
    IF n <= 20:
        replacements = SUM(r / 3 for r in repeats)
        RETURN MAX(missing, replacements)
    // n > 20: need deletions
    // Optimize: use deletions to reduce repeat groups
    // Complex priority: prefer breaking groups with len%3==0 first
```
