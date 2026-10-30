# 1392. Longest Happy Prefix

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/longest-happy-prefix](https://leetcode.com/problems/longest-happy-prefix)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## 1. Problem Description

A string is called a **happy prefix** if it is a **non-empty** prefix which is also a suffix (excluding itself).

Given a string `s`, return *the **longest happy prefix** of* `s`. Return an empty string `""` if no such prefix exists.

**Constraints:**
- `1 <= s.length <= 10^5`
- `s` contains only lowercase English letters.

## 2. Examples

**Example 1:**
```
Input: s = "level"
Output: "l"
Explanation: s contains 4 prefix excluding itself ("l", "le", "lev", "leve"), and suffix ("l", "el", "vel", "evel"). The largest prefix which is also suffix is given by "l".
```

**Example 2:**
```
Input: s = "ababab"
Output: "abab"
Explanation: "abab" is the largest prefix which is also suffix. They can overlap in the original string.
```

## 3. Approach: KMP Failure Function — O(n) ✅

```text
FUNCTION longestHappyPrefix(s):
    n ← LENGTH(s)
    lps ← ARRAY of 0's size n   // longest proper prefix‑suffix lengths
    j ← 0
    FOR i ← 1 TO n - 1:
        WHILE j > 0 AND s[i] != s[j]:
            j ← lps[j - 1]
        IF s[i] == s[j]:
            j ← j + 1
        lps[i] ← j
    RETURN s[0 : lps[n - 1]]   // substring of length lps[last]
```

## 4. Walkthrough

For `s = "ababab"`:
1. Build `lps` array step‑by‑step:
   - i=1 (`b` vs `a`): j stays 0 → lps[1]=0
   - i=2 (`a` vs `a`): j→1 → lps[2]=1
   - i=3 (`b` vs `b`): j→2 → lps[3]=2
   - i=4 (`a` vs `a`): j→3 → lps[4]=3
   - i=5 (`b` vs `b`): j→4 → lps[5]=4
2. Final `lps[5]=4`; longest happy prefix is `s[0:4] = "abab"`.

## 5. Complexity Analysis

- **Time:** O(n) – single pass building the failure function.
- **Space:** O(n) – the `lps` array.

## 6. Follow-Up Questions

- How would you modify the algorithm to return *all* happy prefixes?
- Can you solve the problem using a rolling hash (Rabin‑Karp) instead of KMP?
- What changes are needed if the string may contain Unicode characters with large alphabets?

## 7. Key Takeaway

> The KMP failure function directly yields the length of the longest proper prefix that is also a suffix, providing an O(n) solution without explicit string comparisons.
