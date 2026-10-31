# 2697. Lexicographically Smallest Palindrome

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/lexicographically-smallest-palindrome](https://leetcode.com/problems/lexicographically-smallest-palindrome)
**Companies:** Amazon, Mathworks, Meta, Paypal

---

## 1. Problem Description

You are given a string `s` consisting of **lowercase English letters**, and you are allowed to perform operations on it. In one operation, you can **replace** a character in `s` with another lowercase English letter.

Your task is to make `s` a **palindrome** with the **minimum number of operations** possible. If there are **multiple palindromes** that can be made using the **minimum** number of operations, make the **lexicographically smallest** one.

A string `a` is lexicographically smaller than a string `b` (of the same length) if in the first position where `a` and `b` differ, string `a` has a letter that appears earlier in the alphabet than the corresponding letter in `b`.

Return *the resulting palindrome string.*

**Constraints:**
- `1 <= s.length <= 1000`
- `s` consists of only lowercase English letters.

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

```
Example 1:
  Input: s = "egcfe"
  Output: "efcfe"
  Explanation: The minimum number of operations to make "egcfe" a palindrome is 1, and the lexicographically smallest palindrome string we can get by modifying one character is "efcfe", by changing 'g'.
```

```
Example 2:
  Input: s = "abcd"
  Output: "abba"
  Explanation: The minimum number of operations to make "abcd" a palindrome is 2, and the lexicographically smallest palindrome string we can get by modifying two characters is "abba".
```

```
Example 3:
  Input: s = "seven"
  Output: "neven"
  Explanation: The minimum number of operations to make "seven" a palindrome is 1, and the lexicographically smallest palindrome string we can get by modifying one character is "neven".
```

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
2. Can you modify the algorithm to return all possible minimal-change palindromes?
3. What if the cost of changing each character differs?

---

## Key Takeaway

> For each mirror pair, set both to the smaller character. This minimizes changes and produces the lex-smallest palindrome.
