# 1392. Longest Happy Prefix

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/longest-happy-prefix](https://leetcode.com/problems/longest-happy-prefix)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## 1. Problem Description

Given a string `s`, find the longest non‑empty proper prefix of `s` that is also a suffix of `s`. The prefix and suffix must not be the entire string.

## 2. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `"level"` | `"l"` | Prefix `"l"` equals suffix `"l"`. |
| `"ababab"` | `"abab"` | The longest prefix that is also a suffix is `"abab"`. |
| `"abc"` | `""` | No non‑empty prefix matches a suffix.

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
