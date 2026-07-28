# 2062. Count Vowel Substrings of a String

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-vowel-substrings-of-a-string](https://leetcode.com/problems/count-vowel-substrings-of-a-string)
**Companies:** Amazon, Bloomberg, Commvault, Expedia, Google, Microsoft, Noon, Oracle, Paypal, Salesforce, Snowflake, Wells Fargo

---

## Problem Description

Count substrings that contain **only vowels** and include **all five** vowels (a, e, i, o, u).

---

## Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `"aeiouu"` | `2` | Substrings `"aeiou"` and `"aeiouu"` both contain all five vowels. |
| `"unicornarihan"` | `0` | No substring contains all five vowels. |
| `"cuaeio"` | `1` | Only substring `"aeio"` (starting at index 2) contains all five vowels. |

---

## Approach: Brute Force — O(n²)

```text
FUNCTION countVowelSubstrings(word):
    vowels = set('aeiou')
    count ← 0
    FOR i ← 0 TO len(word) - 5:
        seen ← set()
        FOR j ← i TO len(word) - 1:
            IF word[j] NOT IN vowels: BREAK
            seen.ADD(word[j])
            IF len(seen) == 5:
                count ← count + 1
    RETURN count
```

Or use the "at most K distinct" sliding window trick: `atMost(5) - atMost(4)` for O(n).

---

## Walkthrough

Consider the input `"aeiouu"`.

| Step | i (start) | j (end) | Substring | Seen Vowels | Action |
|------|-----------|--------|-----------|-------------|--------|
| 1 | 0 | 0 | `a` | {a} | continue |
| 2 | 0 | 1 | `ae` | {a,e} | continue |
| 3 | 0 | 2 | `aei` | {a,e,i} | continue |
| 4 | 0 | 3 | `aeio` | {a,e,i,o} | continue |
| 5 | 0 | 4 | `aeiou` | {a,e,i,o,u} | count = 1 |
| 6 | 0 | 5 | `aeiouu` | {a,e,i,o,u} | count = 2 |
| 7 | 1 | 1 | `e` | {e} | continue |
| … | … | … | … | … | … |

The inner loop stops early when a non‑vowel appears, ensuring O(n²) worst‑case but often much less.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n²) brute force, O(n) with atMost trick |
| **Space** | O(1) |

---

## Follow-Up Questions

1. How would you modify the algorithm to count substrings containing **exactly** K distinct vowels for any K? 
2. Can you extend the solution to handle uppercase letters and other Unicode vowel characters?
3. What if the string is extremely long (e.g., streaming input)? Discuss an online O(1) space approach.

---

## Key Takeaway

> **"Exactly K distinct" substrings = `atMost(K) - atMost(K-1)`. For small constraints, brute force with early break on non‑vowels also works.**