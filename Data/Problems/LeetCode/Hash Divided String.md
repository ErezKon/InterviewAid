# 3271. Hash Divided String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/hash-divided-string](https://leetcode.com/problems/hash-divided-string)
**Companies:** Google

---

## 1. Problem Description

Divide string into groups of size `k`, hash each group by summing character values mod 26, and build result string from hash values.

## 2. Approach: Chunk + Hash — O(n) ✅

```text
FUNCTION stringHash(s, k):
    result ← ""
    FOR i ← 0 TO LENGTH(s) - 1 STEP k DO
        hashVal ← SUM(ord(c) - ord('a') for c in s[i:i+k]) % 26
        result += chr(ord('a') + hashVal)
    RETURN result
```

## Examples

| Input | Output |
|-------|--------|
| s = "abcd", k = 2 | "bc" |
| s = "zzzz", k = 1 | "zzzz" |

*Explanation*: For each group, compute sum of character positions modulo 26 and convert back to a character.

## Walkthrough

Take `s = "abcde"`, `k = 2`:
1. Group "ab": (0+1) % 26 = 1 → 'b'
2. Group "cd": (2+3) % 26 = 5 → 'f'
3. Remaining "e": (4) % 26 = 4 → 'e'
Result = "bfe".

## Complexity Analysis

- **Time:** O(n) – each character processed once.
- **Space:** O(1) extra space besides output string.

## Follow-Up Questions

- How would you handle Unicode characters?
- Can the hash be extended to use a different modulus?
- What if groups must be of variable size based on character frequency?

## Key Takeaway

> Process string in chunks of size `k`, sum char values mod 26, convert back to character.
