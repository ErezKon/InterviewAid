# 1177. Can Make Palindrome from Substring

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/can-make-palindrome-from-substring](https://leetcode.com/problems/can-make-palindrome-from-substring)
**Companies:** Akuna Capital

---

## 1. Problem Description

Given string `s` and queries `[left, right, k]`, determine if the substring `s[left..right]` can be rearranged into a palindrome by replacing at most `k` characters.

---

## 2. Key Insight

> A string can form a palindrome if at most 1 character has odd frequency. To fix `f` odd-frequency characters, we need `⌊f/2⌋` replacements (pair them up). So the query is: count odd-frequency chars in `s[left..right]`, check if `oddCount/2 ≤ k`.

> Use **prefix XOR bitmask** for O(1) per query: `prefix[i]` has bit `j` set if char `j` has odd frequency in `s[0..i-1]`.

---

## 3. Approach: Prefix XOR — O(n + q) ✅

```
FUNCTION canMakePaliQueries(s, queries):
    prefix = [0] * (len(s) + 1)
    FOR i ← 0 TO len(s)-1:
        prefix[i+1] = prefix[i] XOR (1 << (ord(s[i]) - ord('a')))
    
    result = []
    FOR left, right, k IN queries:
        oddBits = popcount(prefix[right+1] XOR prefix[left])
        result.ADD(oddBits // 2 <= k)
    RETURN result
```

| Time | Space |
|------|-------|
| O(n + q) | O(n) |

---

## Key Takeaway

> Prefix XOR bitmask tracks character frequency parity. XOR of a range gives odd-frequency character count. Needs `oddCount/2` replacements to make a palindrome.
