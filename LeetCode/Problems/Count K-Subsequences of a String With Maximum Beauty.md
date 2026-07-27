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

```
FUNCTION countKSubsequences(s, k):
    freq = Counter(s)
    IF k > len(freq): RETURN 0  // not enough distinct chars
    
    freqs = sorted(freq.values(), reverse=True)
    // Take top k frequencies
    boundaryFreq = freqs[k-1]
    
    // Count chars with freq > boundary (must take all)
    mustTake = COUNT(f for f in freqs if f > boundaryFreq)
    // Count chars with freq == boundary
    atBoundary = COUNT(f for f in freqs if f == boundaryFreq)
    needFromBoundary = k - mustTake
    
    result = 1
    // Multiply frequencies of must-take chars
    FOR f IN freqs where f > boundaryFreq:
        result = result * f % MOD
    // Choose needFromBoundary from atBoundary chars, each contributes boundaryFreq
    result = result * C(atBoundary, needFromBoundary) % MOD
    result = result * pow(boundaryFreq, needFromBoundary, MOD) % MOD
    
    RETURN result
```

| Time | Space |
|------|-------|
| O(n) for counting + O(26 log 26) | O(26) |

---

## Key Takeaway

> Greedy: always pick the highest-frequency characters. Combinatorics handles ties at the boundary. The product of selected frequencies gives the number of valid subsequences.
