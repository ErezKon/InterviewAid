# 214. Shortest Palindrome

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/shortest-palindrome](https://leetcode.com/problems/shortest-palindrome)
**Companies:** Accenture, Amazon, Bloomberg, Google, Meta, Microsoft, Pocket Gems, Uber, Visa

---

## Problem Description

Given string `s`, find the shortest palindrome by adding characters only at the **front**. Equivalent to finding the longest palindromic prefix.

---

## Approach: KMP Failure Function — O(n) ✅

```text
FUNCTION shortestPalindrome(s):
    rev = REVERSE(s)
    combined = s + "#" + rev

    // KMP failure function
    lps = [0] * len(combined)
    FOR i ← 1 TO len(combined) - 1:
        j = lps[i - 1]
        WHILE j > 0 AND combined[i] != combined[j]:
            j = lps[j - 1]
        IF combined[i] == combined[j]: j += 1
        lps[i] = j

    // lps[-1] = length of longest palindrome prefix
    RETURN rev[:len(s) - lps[-1]] + s
```

Find the longest palindrome starting at index 0, then prepend the reverse of the remaining suffix.

---

## Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `"aacecaaa"` | `"aaacecaaa"` | The longest palindromic prefix is `"aacecaa"`. The remaining suffix `"a"` is reversed and added to the front. |
| `"abcd"` | `"dcbabcd"` | No palindromic prefix longer than 1, so the entire string `"bcd"` is reversed and prepended. |

---

## Walkthrough

Consider `s = "aacecaaa"`.
1. `rev = "aaacecaa"`.
2. `combined = "aacecaaa#aaacecaa"`.
3. Build the KMP failure (LPS) array for `combined`. The final value `lps[-1] = 7` indicates the longest palindrome prefix length is 7 (`"aacecaa"`).
4. Characters after the prefix: `s[7:] = "a"`. Reverse it: `"a"`.
5. Prepend the reversed suffix to original: `"a" + "aacecaaa" = "aaacecaaa"`.

---

## Complexity Analysis

- **Time:** O(n) – building the LPS array scans the combined string once.
- **Space:** O(n) – the LPS array stores a value for each character in the combined string.

---

## Follow-Up Questions

1. How would you solve the problem using a rolling hash (Rabin‑Karp) instead of KMP?
2. Can you modify the algorithm to allow insertions at both ends of the string?
3. What is the longest palindrome that can be formed by adding characters only at the **end**?

---

## Key Takeaway

Using the KMP failure function on `s + "#" + reverse(s)` reveals the longest palindromic prefix in linear time, enabling construction of the shortest palindrome by prepending the reversed suffix.
