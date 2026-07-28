# 2842. Count K-Subsequences of a String With Maximum Beauty

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-k-subsequences-of-a-string-with-maximum-beauty](https://leetcode.com/problems/count-k-subsequences-of-a-string-with-maximum-beauty)
**Companies:** Google

---

## 1. Problem Description

Given a string `s` and integer `k`, count subsequences of length `k` with **maximum beauty**, where beauty is the sum of frequencies of selected characters (each distinct character contributes its total frequency in `s`). Return count modulo 10^9+7.

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

**Example 1:**
```
Input: s = "aabccc", k = 2
Output: 12
Explanation:
Frequencies: a→2, b→1, c→3. Top‑2 frequencies are 3 (c) and 2 (a).
Number of ways to pick 2 characters = 1 (must take a and c).
Result = 3 * 2 = 6 subsequences for each ordering → 12 total.
```

**Example 2:**
```
Input: s = "abcde", k = 3
Output: 6
Explanation:
All characters have frequency 1. Choose any 3 of the 5 characters.
C(5,3) = 10 ways, each contributes 1^3 = 1, so result = 10.
```

---

## 5. Walkthrough

Consider Example 1 (`s = "aabccc", k = 2`):
1. Count frequencies → {a:2, b:1, c:3}.
2. Sort descending → [3,2,1].
3. Boundary frequency for k=2 is the second element → 2.
4. Characters with freq > 2: only `c` (must‑take count =1).
5. Characters with freq = 2: only `a` (atBoundary =1).
6. Need from boundary = k - mustTake = 2‑1 =1.
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
