# 2842. Count K-Subsequences of a String With Maximum Beauty

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-k-subsequences-of-a-string-with-maximum-beauty](https://leetcode.com/problems/count-k-subsequences-of-a-string-with-maximum-beauty)
**Companies:** Google

---

## 1. Problem Description

You are given a string `s` and an integer `k`.

A **k-subsequence** is a **subsequence** of `s`, having length `k`, and all its characters are **unique**, **i.e**., every character occurs once.

Let `f(c)` denote the number of times the character `c` occurs in `s`.

The **beauty** of a **k-subsequence** is the **sum** of `f(c)` for every character `c` in the k-subsequence.

For example, consider `s = "abbbdd"` and `k = 2`:

- `f('a') = 1`, `f('b') = 3`, `f('d') = 2`
- Some k-subsequences of `s` are:
  - `"abbbdd"` -> `"ab"` having a beauty of `f('a') + f('b') = 4`
  - `"abbbdd"` -> `"ad"` having a beauty of `f('a') + f('d') = 3`
  - `"abbbdd"` -> `"bd"` having a beauty of `f('b') + f('d') = 5`

Return *an integer denoting the number of k-subsequences **whose beauty** is the **maximum** among all **k-subsequences***. Since the answer may be too large, return it modulo `10^9 + 7`.

A subsequence of a string is a new string formed from the original string by deleting some (possibly none) of the characters without disturbing the relative positions of the remaining characters.

**Notes**
- `f(c)` is the number of times a character `c` occurs in `s`, not a k-subsequence.
- Two k-subsequences are considered different if one is formed by an index that is not present in the other. So, two k-subsequences may form the same string.

**Constraints:**
- `1 <= s.length <= 2 * 10^5`
- `1 <= k <= s.length`
- `s` consists only of lowercase English letters.

---

## 2. Key Insight

> To maximize beauty, pick the `k` characters with highest frequencies. If there's a tie at the boundary frequency, use combinatorics to count how many ways to choose among the tied characters.

---

## 3. Approach: Greedy + Combinatorics — O(26 log 26) ✅

```text
FUNCTION countKSubsequences(s, k):
    // Count frequency of each character
    freq ← COUNTER(s)
    IF k > LENGTH(freq):
        RETURN 0
    
    // Sort frequencies descending
    freqs ← SORT_DESCENDING(values of freq)
    boundaryFreq ← freqs[k-1]
    
    // Characters with frequency greater than boundary must be taken
    mustTake ← COUNT(f FOR f IN freqs IF f > boundaryFreq)
    // Characters exactly at the boundary frequency
    atBoundary ← COUNT(f FOR f IN freqs IF f = boundaryFreq)
    needFromBoundary ← k - mustTake
    
    result ← 1
    // Multiply frequencies of mandatory characters
    FOR f IN freqs WHERE f > boundaryFreq:
        result ← (result * f) MOD MODULO
    // Choose which boundary characters to take
    result ← (result * COMBINATION(atBoundary, needFromBoundary)) MOD MODULO
    // Each chosen boundary character contributes its frequency
    result ← (result * POW(boundaryFreq, needFromBoundary, MODULO)) MOD MODULO
    
    RETURN result
```

| Time | Space |
|------|-------|
| O(n) for counting + O(26 log 26) | O(26) |

---

## 4. Examples

```
Example 1:
  Input: s = "bcca", k = 2
  Output: 4
  Explanation: From s we have f('a') = 1, f('b') = 1, and f('c') = 2.
  The k-subsequences of s are:
  "bc" (indices 0,1) having a beauty of f('b') + f('c') = 3
  "bc" (indices 0,2) having a beauty of f('b') + f('c') = 3
  "ba" (indices 0,3) having a beauty of f('b') + f('a') = 2
  "ca" (indices 1,3) having a beauty of f('c') + f('a') = 3
  "ca" (indices 2,3) having a beauty of f('c') + f('a') = 3
  There are 4 k-subsequences that have the maximum beauty, 3.
  Hence, the answer is 4.
```

```
Example 2:
  Input: s = "abbcd", k = 4
  Output: 2
  Explanation: From s we have f('a') = 1, f('b') = 2, f('c') = 1, and f('d') = 1.
  The k-subsequences of s are:
  "abcd" (indices 0,1,3,4) having a beauty of f('a') + f('b') + f('c') + f('d') = 5
  "abcd" (indices 0,2,3,4) having a beauty of f('a') + f('b') + f('c') + f('d') = 5
  There are 2 k-subsequences that have the maximum beauty, 5.
  Hence, the answer is 2.
```

(Extra illustration: for s = "aabccc", k = 2, frequencies are a→2, b→1, c→3; the top-2 frequencies are 3 (c) and 2 (a), so the answer is 3 * 2 = 6.)

---

## 5. Walkthrough

Consider Example 1 (`s = "aabccc", k = 2`):
1. Count frequencies → {a:2, b:1, c:3}.
2. Sort descending → [3,2,1].
3. Boundary frequency for k=2 is the second element → 2.
4. Characters with freq > 2: only `c` (must-take count =1).
5. Characters with freq = 2: only `a` (atBoundary =1).
6. Need from boundary = k - mustTake = 2-1 =1.
7. Multiply mandatory frequencies: result = 3.
8. Choose 1 from the 1 boundary character → C(1,1)=1.
9. Multiply by boundaryFreq^need → 2^1 =2.
10. Final result = 3 * 1 * 2 = 6. Each subsequence can appear in two orders, giving 12.

---

## 6. Complexity Analysis

- **Time:** O(n) to count characters plus O(26 log 26) for sorting frequencies (constant w.r.t. alphabet size).
- **Space:** O(26) for the frequency map.

---

## 7. Follow-Up Questions

1. How would the solution change if the alphabet size were not limited to 26?
2. Can you extend the approach to count subsequences with *minimum* beauty?
3. How would you handle the problem if the subsequence length `k` could be larger than the number of distinct characters?

---

## Key Takeaway

> Greedy: always pick the highest-frequency characters. Combinatorics handles ties at the boundary. The product of selected frequencies gives the number of valid subsequences.
