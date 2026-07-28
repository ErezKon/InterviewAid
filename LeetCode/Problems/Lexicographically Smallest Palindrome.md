# 2697. Lexicographically Smallest Palindrome

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/lexicographically-smallest-palindrome](https://leetcode.com/problems/lexicographically-smallest-palindrome)
**Companies:** Amazon, Mathworks, Meta, Paypal

---

## 1. Problem Description

Replace characters to make `s` a palindrome with the minimum number of changes. Among all such palindromes, return the lexicographically smallest.

---

## 2. Approach: Two Pointers — O(n) ✅

```text
FUNCTION makeSmallestPalindrome(s):
    // Convert to mutable list
    s ← LIST(s)
    lo ← 0; hi ← LENGTH(s) - 1
    WHILE lo < hi:
        // Choose smaller character for both positions
        minChar ← MIN(s[lo], s[hi])
        s[lo] ← minChar
        s[hi] ← minChar
        lo ← lo + 1
        hi ← hi - 1
    RETURN JOIN(s)
```

---

## 3. Examples

| Input | Output |
|-------|--------|
| `"egcfe"` | `"efcfe"` |
| `"abcd"` | `"abba"` |

*Explanation*: For each mirrored pair, replace both characters with the smaller one, ensuring minimal changes and lexicographically smallest result.

---

## 4. Walkthrough

Take `s = "egcfe"` (length 5).

| Step | lo | hi | s before | Action | s after |
|------|----|----|----------|--------|--------|
| 1 | 0 | 4 | e g c f e | min(e,e)=e → set both to e | e g c f e |
| 2 | 1 | 3 | e g c f e | min(g,f)=f → set both to f | e f c f e |
| 3 | 2 | 2 | center reached | stop | e f c f e |

Result `"efcfe"`.

---

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(n) | O(n) (to store mutable list) |

---

## 6. Follow-Up Questions

1. How would you handle Unicode characters?
2. Can you modify the algorithm to return all possible minimal‑change palindromes?
3. What if the cost of changing each character differs?

---

## Key Takeaway

> For each mirror pair, set both to the smaller character. This minimizes changes and produces the lex‑smallest palindrome.
