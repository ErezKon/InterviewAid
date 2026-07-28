# 140. Word Break II

**Difficulty:** 🔴 Hard
**Acceptance:** 49.0%
**LeetCode:** [https://leetcode.com/problems/word-break-ii](https://leetcode.com/problems/word-break-ii)
**Companies:** Amazon, Anduril, Bloomberg, Dropbox, Google, Grammarly, Meta, Microsoft, Mongodb, Moveworks, Oracle, Snapchat, Tiktok, Twitter, Uber, Visa

---

## 1. Problem Description

Given a string `s` and a dictionary of strings `wordDict`, add spaces to `s` to construct sentences where each word is in the dictionary. Return all such possible sentences.

---

## 2. Examples

| s | wordDict | Output |
|---|----------|--------|
| "catsanddog" | ["cat","cats","and","sand","dog"] | ["cats and dog","cat sand dog"] |
| "pineapplepenapple" | ["apple","pen","applepen","pine","pineapple","penapple"] | ["pine apple pen apple","pine applepen apple","pineapple pen apple"] |
| "abcd" | ["a","abc","b","cd"] | ["a b cd","abc d"] |

---

## 3. Approach

Backtracking with Memoization — explore all segmentations while caching results for each start index.

```text
FUNCTION wordBreak(s, wordDict):
    SET wordSet ← SET(wordDict)
    SET memo ← EMPTY MAP
    RETURN backtrack(s, 0, wordSet, memo)

FUNCTION backtrack(s, start, wordSet, memo):
    IF start IN memo: RETURN memo[start]
    IF start == LENGTH(s): RETURN [""]
    SET sentences ← []
    FOR end ← start+1 TO LENGTH(s):
        SET word ← s[start..end-1]
        IF word IN wordSet:
            SET subs ← backtrack(s, end, wordSet, memo)
            FOR sub IN subs:
                IF sub == "":
                    APPEND word TO sentences
                ELSE:
                    APPEND word + " " + sub TO sentences
    SET memo[start] ← sentences
    RETURN sentences
```

---

## 4. Walkthrough

Consider `s = "catsanddog"`, `wordDict = ["cat","cats","and","sand","dog"]`.

1. Start at index 0, find "cat" and "cats" as prefixes.
2. For "cat", recurse from index 3 → finds "sand" then "dog", building "cat sand dog".
3. For "cats", recurse from index 4 → finds "and" then "dog", building "cats and dog".
4. Memoization stores results for each index, preventing re‑exploration.

The final list combines sentences from both branches.

---

## 5. Complexity Analysis

- **Time:** In the worst case exponential due to many possible segmentations, but memoization reduces repeated work to O(n²) for DP plus output size.
- **Space:** O(n²) for memo table and recursion stack, plus space for storing all sentences.

---

## 6. Follow‑Up Questions

- How would you modify the algorithm to return only the lexicographically smallest sentence?
- Can you improve performance using a Trie for the dictionary?
- What changes are needed if the dictionary is streamed and cannot fit in memory?

---

## Key Takeaway

> Combine a DP feasibility check with backtracking to enumerate all valid sentences. Memoization is crucial for avoiding redundant computation.
