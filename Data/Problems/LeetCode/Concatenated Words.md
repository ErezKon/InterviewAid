# 472. Concatenated Words

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/concatenated-words](https://leetcode.com/problems/concatenated-words)
**Companies:** Amazon, Ebay, Tiktok
---

## Problem Description
Given an array of strings `words`, return all the words that are formed by concatenating **at least two** other words from the same array. Each word can be used multiple times in the concatenation.

## Examples
- **Example 1:** `words = ["cat","cats","catsdogcats","dog","dogcat","hippo","rat","ratcatdogcat"]`
  → output `["catsdogcats","ratcatdogcat"]`.
- **Example 2:** `words = ["cat","dog","catdog"]` → output `["catdog"]`.

## Approach
1. Insert all words into a hash set for O(1) look‑ups.
2. For each word, use dynamic programming to determine if it can be segmented into smaller words from the set (excluding the word itself).
   - `dp[i]` is true if the prefix `word[0:i]` can be formed.
   - For each `i`, check all `j < i` where `dp[j]` is true and `word[j:i]` exists in the set.
3. If `dp[len(word)]` is true, the word is a concatenated word.

### Pseudocode
```text
FUNCTION findAllConcatenatedWordsInADict(words):
    wordSet ← SET(words)
    result ← []
    FOR each word IN words:
        IF word IS EMPTY: CONTINUE
        REMOVE word FROM wordSet   // avoid using itself
        IF canForm(word, wordSet):
            APPEND word TO result
        ADD word BACK TO wordSet
    RETURN result

FUNCTION canForm(word, wordSet):
    n ← LENGTH(word)
    dp ← ARRAY OF n+1 FALSE; dp[0] ← TRUE
    FOR i ← 1 TO n:
        FOR j ← 0 TO i-1:
            IF dp[j] AND SUBSTRING(word, j, i) IN wordSet:
                dp[i] ← TRUE
                BREAK
    RETURN dp[n]
```

## Walkthrough
For `word = "catsdogcats"`:
1. After removing it from the set, `dp[0] = TRUE`.
2. `i = 3` → substring `"cat"` in set → `dp[3] = TRUE`.
3. `i = 7` → substring `"sdog"` not in set, but `i = 6` → `"cats"` in set and `dp[3] = TRUE` → `dp[6] = TRUE`.
4. Continue until `i = 12` where `dp[12]` becomes true because `"cats"` + `"dog"` + `"cats"` covers the whole word.
5. Word is added to result.

## Complexity Analysis
Time: O(N * L^2) where N is number of words and L is average word length (DP checks each split).
Space: O(L) for the DP array per word plus O(total characters) for the hash set.

## Follow‑Up Questions
- How would you modify the algorithm to return the actual concatenation components for each word?
- Can you improve the time complexity using a Trie instead of a hash set?
- What changes are needed if words can be reused unlimited times versus at most once?

---

## Key Takeaway

> Treat each word as a segmentation problem and use DP with a hash set (or Trie) to efficiently detect concatenated words.
