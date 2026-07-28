# Word Break Pattern Collection

**Difficulty:** 🟡 Medium
**Related Problems:** #139 Word Break, #140 Word Break II, #472 Concatenated Words
---

## Problem Description
The *word break* family of problems asks whether a string `s` can be segmented into a sequence of dictionary words, and if so, to enumerate possible segmentations. Variants include:
- **Word Break I (#139):** Return a boolean indicating if at least one segmentation exists.
- **Word Break II (#140):** Return all possible segmentations.
- **Concatenated Words (#472):** Find all words in a list that can be formed by concatenating other words from the same list.

## Approaches
### Word Break I (DP)
Use a boolean DP array where `dp[i]` is true if `s[0..i-1]` can be segmented.
```text
FUNCTION canBreak(s, wordDict):
    SET n ← LENGTH(s)
    SET dp[0] ← true
    FOR i ← 1 TO n:
        SET dp[i] ← false
        FOR j ← 0 TO i-1:
            IF dp[j] AND s[j..i-1] IN wordDict:
                SET dp[i] ← true
                BREAK
    RETURN dp[n]
```
### Word Break II (Backtracking + Memo)
Recursively build sentences from each index, memoizing results to avoid recomputation.
```text
FUNCTION wordBreakAll(s, wordDict):
    SET memo ← EMPTY MAP
    RETURN backtrack(s, 0, wordDict, memo)

FUNCTION backtrack(s, start, wordDict, memo):
    IF start IN memo: RETURN memo[start]
    SET sentences ← []
    IF start = LENGTH(s):
        APPEND "" TO sentences
    FOR end ← start+1 TO LENGTH(s):
        SET word ← s[start..end-1]
        IF word IN wordDict:
            SET subs ← backtrack(s, end, wordDict, memo)
            FOR sub IN subs:
                IF sub = "":
                    APPEND word TO sentences
                ELSE:
                    APPEND word + " " + sub TO sentences
    SET memo[start] ← sentences
    RETURN sentences
```
### Concatenated Words (DP on Sorted List)
Sort words by length. For each word, run the Word Break I DP using previously processed (shorter) words as the dictionary.
```text
FUNCTION findConcatenated(words):
    SORT words BY LENGTH ASCENDING
    SET dict ← EMPTY SET
    SET result ← []
    FOR w IN words:
        IF w ≠ "" AND canBreak(w, dict):
            APPEND w TO result
        ADD w TO dict
    RETURN result
```
## Walkthrough Example (Word Break I)
| i | Substring `s[0..i-1]` | dp[i] |
|---|-----------------------|-------|
| 0 | "" | true |
| 1 | "l" | false |
| 2 | "le" | false |
| 3 | "lee" | true ("lee" in dict) |
| … | … | … |
Result: `dp[n]` indicates segmentability.

## Complexity Analysis
- **Word Break I:** O(n² · k) time where *n* is length of `s` and *k* average word lookup cost; O(n) space.
- **Word Break II:** Exponential in worst case due to many possible sentences, but memoization reduces repeated work; O(n²) time for DP plus output size.
- **Concatenated Words:** O(totalLength²) in worst case; O(totalLength) space for the dictionary.

## Follow‑Up Questions
- How would you modify Word Break I to return the actual segmentation path?
- Can you improve Word Break II using a Trie for the dictionary?
- What if the dictionary is extremely large and must be streamed?

## Key Takeaway
Dynamic programming combined with memoized recursion efficiently solves the core segmentation decision, while extensions handle enumeration and concatenation variants.
