# 2370. Longest Ideal Subsequence

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-ideal-subsequence](https://leetcode.com/problems/longest-ideal-subsequence)
**Companies:** Makemytrip, Microsoft

---

## 1. Problem Description

Find the longest subsequence where the absolute difference between consecutive characters is ≤ `k`.

---

## 2. Examples

**Example 1:**
```
Input: s = "acfgbd", k = 2
Output: 4
Explanation: The longest ideal subsequence is "acfd" (or "acgd"). Each adjacent pair differs by at most 2.
```

**Example 2:**
```
Input: s = "abcd", k = 3
Output: 4
Explanation: The whole string is ideal because every adjacent pair differs by ≤ 3.
```

---

## 3. Approach: DP on 26 Characters — O(n·k) ✅

```text
FUNCTION longestIdealString(s, k):
    dp ← ARRAY[26] OF 0   // dp[c] = longest ideal subseq ending with char c
    FOR char IN s:
        c ← ORD(char) - ORD('a')
        best ← 0
        FOR j ← MAX(0, c - k) TO MIN(25, c + k):
            best ← MAX(best, dp[j])
        dp[c] ← best + 1
    RETURN MAX(dp)
```

---

## 4. Walkthrough

Consider `s = "acfgbd"` and `k = 2`.

| Step | char | c (index) | dp before | best from range | dp after |
|------|------|----------|-----------|----------------|----------|
| 1 | a | 0 | [0…0] | 0 (range 0‑2) | dp[0]=1 |
| 2 | c | 2 | dp[0]=1 | max(dp[0..4])=1 | dp[2]=2 |
| 3 | f | 5 | dp[2]=2 | max(dp[3..7])=0 | dp[5]=1 |
| 4 | g | 6 | dp[5]=1 | max(dp[4..8])=0 | dp[6]=1 |
| 5 | b | 1 | dp[0]=1, dp[2]=2 | max(dp[0..3])=2 | dp[1]=3 |
| 6 | d | 3 | dp[1]=3, dp[2]=2 | max(dp[1..5])=3 | dp[3]=4 |

The maximum value in `dp` is 4, giving the answer.

---

## 5. Complexity Analysis

- **Time:** O(n · k) – each character scans at most `2k+1` previous character buckets.
- **Space:** O(26) = O(1) – constant extra space for the DP array.

---

## 6. Follow-Up Questions

- How would you modify the solution if the alphabet size were larger (e.g., Unicode characters)?
- Can you solve the problem in O(n) time using a sliding window technique?

---

## 7. Key Takeaway

> Track the best subsequence length ending at each of 26 characters. For each new char, look at characters within distance `k` and extend the best one.
