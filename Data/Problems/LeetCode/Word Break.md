
# 139. Word Break

**Difficulty:** 🟡 Medium
**Acceptance:** 49.5%
**LeetCode:** [https://leetcode.com/problems/word-break](https://leetcode.com/problems/word-break)
**Companies:** Amazon, Apple, Arista Networks, Autodesk, Bloomberg, Buyhatke, Coupang, Goldman Sachs, Google, Grammarly, Intuit, Linkedin, Meta, Microsoft, Millennium, Mongodb, Netflix, Nutanix, Oracle, Otterai, Palo Alto Networks, Pocket Gems, Salesforce, Snowflake, Square, Tiktok, Uber, Visa, Walmart Labs, Yahoo, Zeta, Zoho

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach 1: Recursion + Memoization — O(n²·k)](#3-approach-1-recursion--memoization--on²k)
4. [Approach 2: DP Bottom-Up — O(n²·k) ✅](#4-approach-2-dp-bottom-up--on²k-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)

---

## 1. Problem Description

Given a string `s` and a dictionary of strings `wordDict`, return `true` if `s` can be segmented into a space-separated sequence of one or more dictionary words.

The same word in the dictionary may be reused multiple times.

---

## 2. Examples

```
Example 1:
  Input:  s = "leetcode", wordDict = ["leet", "code"]
  Output: true
  Reason: "leet" + "code"

Example 2:
  Input:  s = "applepenapple", wordDict = ["apple", "pen"]
  Output: true
  Reason: "apple" + "pen" + "apple"

Example 3:
  Input:  s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
  Output: false
```

---

## 3. Approach 1: Recursion + Memoization — O(n²·k)

```
FUNCTION wordBreak(s, wordDict):
    wordSet = SET(wordDict)
    memo = {}

    FUNCTION canBreak(start):
        IF start == LENGTH(s):
            RETURN TRUE

        IF start IN memo:
            RETURN memo[start]

        FOR end ← start + 1 TO LENGTH(s):
            word = s[start..end-1]
            IF word IN wordSet AND canBreak(end):
                memo[start] = TRUE
                RETURN TRUE

        memo[start] = FALSE
        RETURN FALSE

    RETURN canBreak(0)
```

---

## 4. Approach 2: DP Bottom-Up — O(n²·k) ✅

### Definition

`dp[i] = true` if `s[0..i-1]` can be segmented using dictionary words.

### Recurrence

```
dp[i] = true  IF there exists j < i such that:
               dp[j] == true  AND  s[j..i-1] is in wordDict
```

### Pseudocode

```
FUNCTION wordBreak(s, wordDict):
    wordSet = SET(wordDict)
    n = LENGTH(s)
    dp = ARRAY of (n + 1) booleans, all FALSE
    dp[0] = TRUE                       // empty string is valid

    FOR i ← 1 TO n:
        FOR j ← 0 TO i - 1:
            IF dp[j] AND s[j..i-1] IN wordSet:
                dp[i] = TRUE
                BREAK

    RETURN dp[n]
```

### Optimization

Limit the inner loop to only check substrings up to the maximum word length:

```
FUNCTION wordBreak(s, wordDict):
    wordSet = SET(wordDict)
    maxLen  = MAX(LENGTH(w) for w in wordDict)
    n = LENGTH(s)
    dp = ARRAY of (n + 1) booleans, all FALSE
    dp[0] = TRUE

    FOR i ← 1 TO n:
        FOR j ← MAX(0, i - maxLen) TO i - 1:
            IF dp[j] AND s[j..i-1] IN wordSet:
                dp[i] = TRUE
                BREAK

    RETURN dp[n]
```

---

## 5. Walkthrough

```
s = "leetcode", wordDict = ["leet", "code"]
wordSet = {"leet", "code"}
dp = [T, F, F, F, F, F, F, F, F]
      0  1  2  3  4  5  6  7  8

i=1: check s[0..0]="l" → not in set
i=2: check s[0..1]="le" → not in set
i=3: check s[0..2]="lee" → not in set
i=4: check s[0..3]="leet" → IN set, dp[0]=T → dp[4]=TRUE ✓
i=5: check s[0..4]="leetc" ✗, s[1..4]="eetc" ✗, ..., s[4..4]="c" ✗
i=6: similar, no match
i=7: similar, no match
i=8: check s[4..7]="code" → IN set, dp[4]=T → dp[8]=TRUE ✓

dp = [T, F, F, F, T, F, F, F, T]
Result: dp[8] = TRUE ✅
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n² · k) where n = string length, k = avg word length for substring comparison |
| **Space** | O(n + m) where m = total chars in dictionary |

With max-length optimization: O(n · L · k) where L = max word length.

---

## 7. Follow-Up Questions

### 7.1 Word Break II (LeetCode #140) — Return all segmentations

Return all possible valid sentences:

```
FUNCTION wordBreakII(s, wordDict):
    wordSet = SET(wordDict)
    memo = {}

    FUNCTION backtrack(start):
        IF start IN memo:
            RETURN memo[start]

        IF start == LENGTH(s):
            RETURN [""]

        sentences = []
        FOR end ← start + 1 TO LENGTH(s):
            word = s[start..end-1]
            IF word IN wordSet:
                FOR rest IN backtrack(end):
                    IF rest == "":
                        sentences.ADD(word)
                    ELSE:
                        sentences.ADD(word + " " + rest)

        memo[start] = sentences
        RETURN sentences

    RETURN backtrack(0)
```

**Time:** O(2^n) worst case (exponential number of segmentations), **Space:** O(2^n).

### 7.2 Using Trie for optimization

For very large dictionaries, use a **Trie** for efficient prefix matching:

```
FUNCTION wordBreakTrie(s, wordDict):
    trie = buildTrie(wordDict)
    dp = ARRAY of (n + 1) booleans, all FALSE
    dp[0] = TRUE

    FOR i ← 0 TO n - 1:
        IF NOT dp[i]: CONTINUE

        node = trie.root
        FOR j ← i TO n - 1:
            IF s[j] NOT in node.children:
                BREAK
            node = node.children[s[j]]
            IF node.isEndOfWord:
                dp[j + 1] = TRUE

    RETURN dp[n]
```

### 7.3 Concatenated Words (LeetCode #472)

Find all words that can be formed by concatenating other words in the list. For each word, check if it can be word-broken using the remaining words.

### 7.4 Can you solve it with BFS?

Yes — treat each valid segmentation point as a node, and explore forward:

```
FUNCTION wordBreakBFS(s, wordDict):
    wordSet = SET(wordDict)
    visited = SET()
    queue = [0]

    WHILE queue IS NOT EMPTY:
        start = queue.DEQUEUE()
        IF start IN visited: CONTINUE
        visited.ADD(start)

        FOR end ← start + 1 TO LENGTH(s):
            IF s[start..end-1] IN wordSet:
                IF end == LENGTH(s): RETURN TRUE
                queue.ENQUEUE(end)

    RETURN FALSE
```

---

## Key Takeaway

> Word Break is a classic **1D DP** problem where each state depends on all previous valid segmentation points. The key insight is: `dp[i]` is true if there exists a split point `j` where `dp[j]` is true and `s[j..i-1]` is a valid word. Optimize by capping the inner loop at the max word length.
