# 140. Word Break II

**Difficulty:** 🔴 Hard
**Acceptance:** 49.0%
**LeetCode:** [https://leetcode.com/problems/word-break-ii](https://leetcode.com/problems/word-break-ii)
**Companies:** Amazon, Anduril, Bloomberg, Dropbox, Google, Grammarly, Meta, Microsoft, Mongodb, Moveworks, Oracle, Snapchat, Tiktok, Twitter, Uber, Visa

---

## 1. Problem Description

Given a string `s` and a dictionary of strings `wordDict`, add spaces to `s` to construct sentences where each word is in the dictionary. Return all such possible sentences.

---

## 2. Approach: Backtracking with Memoization — O(n·2ⁿ) worst ✅

```
FUNCTION wordBreak(s, wordDict):
    wordSet = SET(wordDict)
    memo = {}
    RETURN backtrack(s, 0, wordSet, memo)

FUNCTION backtrack(s, start, wordSet, memo):
    IF start IN memo: RETURN memo[start]
    IF start == len(s): RETURN [""]

    sentences = []
    FOR end ← start + 1 TO len(s):
        word = s[start..end-1]
        IF word IN wordSet:
            rest = backtrack(s, end, wordSet, memo)
            FOR sentence IN rest:
                IF sentence == "":
                    sentences.ADD(word)
                ELSE:
                    sentences.ADD(word + " " + sentence)

    memo[start] = sentences
    RETURN sentences
```

---

## 3. Complexity

Worst case: exponential (e.g., `"aaa...a"` with dict `["a", "aa", "aaa", ...]`). Memoization helps with overlapping subproblems.

---

## Key Takeaway

> Combines Word Break I's DP feasibility check with backtracking to enumerate all valid sentences. Memoization is crucial for avoiding redundant computation.
