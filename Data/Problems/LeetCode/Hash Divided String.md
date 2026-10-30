# 3271. Hash Divided String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/hash-divided-string](https://leetcode.com/problems/hash-divided-string)
**Companies:** Google

---

## 1. Problem Description

You are given a string `s` of length `n` and an integer `k`, where `n` is a **multiple** of `k`. Your task is to hash the string `s` into a new string called `result`, which has a length of `n / k`.

First, divide `s` into `n / k` **substrings**, each with a length of `k`. Then, initialize `result` as an **empty** string.

For each **substring** in order from the beginning:

- The **hash value** of a character is the index of that character in the **English alphabet** (e.g., `'a' → 0`, `'b' → 1`, ..., `'z' → 25`).
- Calculate the *sum* of all the **hash values** of the characters in the substring.
- Find the remainder of this sum when divided by 26, which is called `hashedChar`.
- Identify the character in the English lowercase alphabet that corresponds to `hashedChar`.
- Append that character to the end of `result`.

Return `result`.

**Constraints:**
- `1 <= k <= 100`
- `k <= s.length <= 1000`
- `s.length` is divisible by `k`.
- `s` consists only of lowercase English letters.

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

```
Example 1:
  Input: s = "abcd", k = 2
  Output: "bf"
  Explanation:
  First substring: "ab", 0 + 1 = 1, 1 % 26 = 1, result[0] = 'b'.
  Second substring: "cd", 2 + 3 = 5, 5 % 26 = 5, result[1] = 'f'.
```
```
Example 2:
  Input: s = "mxz", k = 3
  Output: "i"
  Explanation:
  The only substring: "mxz", 12 + 23 + 25 = 60, 60 % 26 = 8, result[0] = 'i'.
```

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
