# 2062. Count Vowel Substrings of a String

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-vowel-substrings-of-a-string](https://leetcode.com/problems/count-vowel-substrings-of-a-string)
**Companies:** Amazon, Bloomberg, Commvault, Expedia, Google, Microsoft, Noon, Oracle, Paypal, Salesforce, Snowflake, Wells Fargo

---

## Problem Description

Count substrings that contain **only vowels** and include **all five** vowels (a, e, i, o, u).

---

## Approach: Brute Force — O(n²)

```
FUNCTION countVowelSubstrings(word):
    vowels = set('aeiou')
    count = 0

    FOR i ← 0 TO len(word) - 5:
        seen = set()
        FOR j ← i TO len(word) - 1:
            IF word[j] NOT IN vowels: BREAK
            seen.ADD(word[j])
            IF len(seen) == 5:
                count += 1

    RETURN count
```

Or use the "at most K distinct" sliding window trick: `atMost(5) - atMost(4)` for O(n).

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n²) brute force, O(n) with atMost trick |
| **Space** | O(1) |

---

## Key Takeaway

> **"Exactly K distinct" substrings = `atMost(K) - atMost(K-1)`. For small constraints, brute force with early break on non-vowels also works.**
