# 1737. Change Minimum Characters to Satisfy One of Three Conditions

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/change-minimum-characters-to-satisfy-one-of-three-conditions](https://leetcode.com/problems/change-minimum-characters-to-satisfy-one-of-three-conditions)
**Companies:** Google

---

## 1. Problem Description

Given two lowercase strings `a` and `b`, you may change any character to any other lowercase letter. Find the minimum number of character changes required so that **one** of the following holds:
1. Every character in `a` is strictly less than every character in `b`.
2. Every character in `b` is strictly less than every character in `a`.
3. Both strings consist of a single repeated character.

---

## 2. Examples

**Example 1:**
```
Input: a = "aba", b = "caa"
Output: 2
Explanation: Change `a` to "aaa" (2 changes) so that condition 3 holds.
```

**Example 2:**
```
Input: a = "abc", b = "def"
Output: 0
Explanation: Condition 1 already holds because 'c' < 'd'.
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
   - Condition 1 cost = (3‑2) + 2 = 3.
   - Condition 2 cost = 2 + (3‑2) = 3.
3. Uniform cost for each letter:
   - For `'a'`: changes = (3‑2) + (3‑2) = 2 → best.
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
