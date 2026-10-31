# 1737. Change Minimum Characters to Satisfy One of Three Conditions

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/change-minimum-characters-to-satisfy-one-of-three-conditions](https://leetcode.com/problems/change-minimum-characters-to-satisfy-one-of-three-conditions)
**Companies:** Google

---

## 1. Problem Description

You are given two strings `a` and `b` that consist of lowercase letters. In one operation, you can change any character in `a` or `b` to **any lowercase letter**.

Your goal is to satisfy **one** of the following three conditions:

- **Every** letter in `a` is **strictly less** than **every** letter in `b` in the alphabet.
- **Every** letter in `b` is **strictly less** than **every** letter in `a` in the alphabet.
- **Both** `a` and `b` consist of **only one** distinct letter.

Return *the **minimum** number of operations needed to achieve your goal.*

**Constraints:**
- `1 <= a.length, b.length <= 10^5`
- `a` and `b` consist only of lowercase letters.

---

## 2. Examples

```
Example 1:
  Input: a = "aba", b = "caa"
  Output: 2
  Explanation: Consider the best way to make each condition true:
  1) Change b to "ccc" in 2 operations, then every letter in a is less than every letter in b.
  2) Change a to "bbb" and b to "aaa" in 3 operations, then every letter in b is less than every letter in a.
  3) Change a to "aaa" and b to "aaa" in 2 operations, then a and b consist of one distinct letter.
  The best way was done in 2 operations (either condition 1 or condition 3).
```

```
Example 2:
  Input: a = "dabadd", b = "cda"
  Output: 3
  Explanation: The best way is to make condition 1 true by changing b to "eee".
```

---

## 3. Approach: Frequency Counting — O(n + m) ✅

```text
FUNCTION minCharacters(a, b):
    freqA ← [0] * 26
    freqB ← [0] * 26
    FOR ch IN a:
        freqA[ord(ch) - ord('a')] ← freqA[ord(ch) - ord('a')] + 1
    FOR ch IN b:
        freqB[ord(ch) - ord('a')] ← freqB[ord(ch) - ord('a')] + 1
    
    ans ← INF
    prefA ← 0
    prefB ← 0
    // Evaluate conditions 1 and 2 for each split point
    FOR c ← 0 TO 24:
        prefA ← prefA + freqA[c]
        prefB ← prefB + freqB[c]
        // Condition 1: all a < all b
        ans ← MIN(ans, (LEN(a) - prefA) + prefB)
        // Condition 2: all b < all a
        ans ← MIN(ans, prefA + (LEN(b) - prefB))
    // Evaluate condition 3 (make both strings uniform)
    FOR c ← 0 TO 25:
        ans ← MIN(ans, (LEN(a) - freqA[c]) + (LEN(b) - freqB[c]))
    RETURN ans
```

---

## 4. Walkthrough

Consider `a = "aba"`, `b = "caa"`.
1. Frequency arrays:
   - `freqA` for 'a':2, 'b':1, others:0.
   - `freqB` for 'a':2, 'c':1, others:0.
2. Iterate split points:
   - At split `'b'` (c=1): `prefA=2` (a's ≤ 'b'), `prefB=2` (b's ≤ 'b').
   - Condition 1 cost = (3-2) + 2 = 3.
   - Condition 2 cost = 2 + (3-2) = 3.
3. Uniform cost for each letter:
   - For `'a'`: changes = (3-2) + (3-2) = 2 → best.
4. Return 2.

---

## 5. Complexity Analysis

- **Time:** O(|a| + |b| + 26) → linear in input size.
- **Space:** O(26) → constant extra space for frequency arrays.

---

## 6. Follow-Up Questions

- How would the solution change if the alphabet size were larger (e.g., Unicode characters)?
- Can you extend the approach to handle uppercase letters and digits simultaneously?

---

## Key Takeaway

> By counting character frequencies and evaluating all possible split points and target characters, you can solve the problem in linear time without exhaustive string modifications.
