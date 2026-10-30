# 1048. Longest String Chain

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-string-chain](https://leetcode.com/problems/longest-string-chain)
**Companies:** Agoda, Amazon, Atlassian, Bloomberg, Citadel, De Shaw, Google, Linkedin, Meta, Microsoft, Moloco, Paypal, Tekion, Two Sigma, Verily, Wix

---

## 1. Problem Description

You are given an array of `words` where each word consists of lowercase English letters.

`word_A` is a **predecessor** of `word_B` if and only if we can insert **exactly one** letter anywhere in `word_A` **without changing the order of the other characters** to make it equal to `word_B`.

- For example, `"abc"` is a **predecessor** of `"abac"`, while `"cba"` is not a **predecessor** of `"bcad"`.

A **word chain*** *is a sequence of words `[word_1, word_2, ..., word_k]` with `k >= 1`, where `word_1` is a **predecessor** of `word_2`, `word_2` is a **predecessor** of `word_3`, and so on. A single word is trivially a **word chain** with `k == 1`.

Return *the **length** of the **longest possible word chain** with words chosen from the given list of *`words`.

**Constraints:**
- `1 <= words.length <= 1000`
- `1 <= words[i].length <= 16`
- `words[i]` only consists of lowercase English letters.

---

## 2. Examples

**Example 1:**
```
Input: words = ["a","b","ba","bca","bda","bdca"]
Output: 4
Explanation: One of the longest word chains is ["a","ba","bda","bdca"].
```

**Example 2:**
```
Input: words = ["xbc","pcxbcf","xb","cxbc","pcxbc"]
Output: 5
Explanation: All the words can be put in a word chain ["xb", "xbc", "cxbc", "pcxbc", "pcxbcf"].
```

**Example 3:**
```
Input: words = ["abcd","dbqca"]
Output: 1
Explanation: The trivial word chain ["abcd"] is one of the longest word chains.
["abcd","dbqca"] is not a valid word chain because the ordering of the letters is changed.
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
