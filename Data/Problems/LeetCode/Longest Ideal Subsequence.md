# 2370. Longest Ideal Subsequence

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-ideal-subsequence](https://leetcode.com/problems/longest-ideal-subsequence)
**Companies:** Makemytrip, Microsoft

---

## 1. Problem Description

You are given a string `s` consisting of lowercase letters and an integer `k`. We call a string `t` **ideal** if the following conditions are satisfied:

- `t` is a **subsequence** of the string `s`.
- The absolute difference in the alphabet order of every two **adjacent** letters in `t` is less than or equal to `k`.

Return *the length of the **longest** ideal string*.

A **subsequence** is a string that can be derived from another string by deleting some or no characters without changing the order of the remaining characters.

**Note** that the alphabet order is not cyclic. For example, the absolute difference in the alphabet order of `'a'` and `'z'` is `25`, not `1`.

**Constraints:**
- `1 <= s.length <= 10^5`
- `0 <= k <= 25`
- `s` consists of lowercase English letters.

---

## 2. Examples

**Example 1:**
```
Input: s = "acfgbd", k = 2
Output: 4
Explanation: The longest ideal string is "acbd". The length of this string is 4, so 4 is returned.
Note that "acfgbd" is not ideal because 'c' and 'f' have a difference of 3 in alphabet order.
```

**Example 2:**
```
Input: s = "abcd", k = 3
Output: 4
Explanation: The longest ideal string is "abcd". The length of this string is 4, so 4 is returned.
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
| 1 | a | 0 | [0…0] | 0 (range 0-2) | dp[0]=1 |
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
