# 1048. Longest String Chain

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-string-chain](https://leetcode.com/problems/longest-string-chain)
**Companies:** Agoda, Amazon, Atlassian, Bloomberg, Citadel, De Shaw, Google, Linkedin, Meta, Microsoft, Moloco, Paypal, Tekion, Two Sigma, Verily, Wix

---

## 1. Problem Description

A word chain is a sequence where each word differs from the previous by exactly one added character. Find the longest chain.

---

## 2. Examples

**Example 1:**
```
Input: words = ["a","b","ba","bca","bda","bdca"]
Output: 4
Explanation: One of the longest chains is ["a","ba","bda","bdca"].
```

**Example 2:**
```
Input: words = ["xbc","pc","qc","ib","tc"]
Output: 1
Explanation: No word can be formed from another, so the longest chain length is 1.
```

---

## 3. Approach: DP + Sorting by Length — O(n·L²) ✅

```text
FUNCTION longestStrChain(words):
    SORT words BY LENGTH ASCENDING
    dp ← MAP()  // word → longest chain ending at word
    maxLen ← 1
    FOR word IN words:
        dp[word] ← 1
        FOR i ← 0 TO LENGTH(word) - 1:
            predecessor ← word[0:i] + word[i+1:]
            IF predecessor IN dp:
                dp[word] ← MAX(dp[word], dp[predecessor] + 1)
        maxLen ← MAX(maxLen, dp[word])
    RETURN maxLen
```

---

## 4. Walkthrough

Consider `words = ["a","b","ba","bca","bda","bdca"]`:
1. After sorting: `a, b, ba, bca, bda, bdca`.
2. `a` and `b` start with chain length 1.
3. For `ba`, removing each character yields `a` and `b`; both exist, so `dp[ba] = 2`.
4. `bca` can remove `c` to get `ba` (chain 2) → `dp[bca] = 3`.
5. `bda` removes `d` to get `ba` → `dp[bda] = 3`.
6. `bdca` removes `c` to get `bda` (chain 3) → `dp[bdca] = 4`.
The maximum chain length is 4.

---

## 5. Complexity Analysis

- **Time Complexity:** O(n·L²) – each word of length L generates L predecessors.
- **Space Complexity:** O(n·L) – storing each word and its chain length.

---

## 6. Follow-Up Questions

- How would you modify the solution to also return the actual longest chain, not just its length?
- Can the algorithm be optimized for very large dictionaries with many long words?

---

## 7. Key Takeaway

> Sort words by length, generate all possible predecessors by removing one character, and use DP with a hash map to build the longest chain.
