# 1048. Longest String Chain

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-string-chain](https://leetcode.com/problems/longest-string-chain)
**Companies:** Agoda, Amazon, Atlassian, Bloomberg, Citadel, De Shaw, Google, Linkedin, Meta, Microsoft, Moloco, Paypal, Tekion, Two Sigma, Verily, Wix

---

## 1. Problem Description

A word chain is a sequence where each word differs from the previous by exactly one added character. Find the longest chain.

---

## 2. Approach: DP + Sorting by Length — O(n·L²) ✅

For each word, try removing each character to find predecessors.

```
FUNCTION longestStrChain(words):
    SORT words by length
    dp = {}    // word → longest chain ending at word

    FOR word IN words:
        dp[word] = 1
        FOR i ← 0 TO len(word) - 1:
            predecessor = word[:i] + word[i+1:]
            IF predecessor IN dp:
                dp[word] = MAX(dp[word], dp[predecessor] + 1)

    RETURN MAX(dp.values())
```

| Time | Space |
|------|-------|
| O(n · L²) | O(n · L) |

---

## 3. Key Takeaway

> Sort by length, then for each word generate all predecessors (remove one char). DP in hash map. Similar to LIS but with word predecessor relationships.
