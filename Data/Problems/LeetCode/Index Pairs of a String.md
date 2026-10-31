# 1065. Index Pairs of a String

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/index-pairs-of-a-string](https://leetcode.com/problems/index-pairs-of-a-string)
**Companies:** Amazon

---

## 1. Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

Given a string `text` and an array of strings `words`, return *an array of all index pairs *`[i, j]`* so that the substring *`text[i...j]`* is in `words`*.

Return the pairs `[i, j]` in sorted order (i.e., sort them by their first coordinate, and in case of ties sort them by their second coordinate).

**Constraints:**
- `1 <= text.length <= 100`
- `1 <= words.length <= 20`
- `1 <= words[i].length <= 50`
- `text` and `words[i]` consist of lowercase English letters.
- All the strings of `words` are **unique**.

## 2. Examples

**Example 1:**
```
Input: text = "thestoryofleetcodeandme", words = ["story","fleet","leetcode"]
Output: [[3,7],[9,13],[10,17]]
```

**Example 2:**
```
Input: text = "ababa", words = ["aba","ab"]
Output: [[0,1],[0,2],[2,3],[2,4]]
Explanation: Notice that matches can overlap, see "aba" is found in [0,2] and [2,4].
```

## 3. Approach: Brute Force / Trie — O(n · m · k) ✅

```text
FUNCTION indexPairs(text, words):
    // Build a quick-lookup set of words
    SET wordSet ← SET(words)
    SET result ← []
    FOR i ← 0 TO LENGTH(text) - 1:
        FOR j ← i TO LENGTH(text) - 1:
            IF text[i..j] IN wordSet:
                APPEND [i, j] TO result
    RETURN sorted(result)  // sort by start then end index
```

## 4. Walkthrough

Consider `text = "thestory"` and `words = ["the", "story", "sto"]`.

| i (start) | j (end) | Substring | In wordSet? | Action |
|-----------|---------|-----------|-------------|--------|
| 0 | 0 | "t" | No | – |
| 0 | 1 | "th" | No | – |
| 0 | 2 | "the" | Yes | Append `[0,2]` |
| … | … | … | … | … |
| 3 | 5 | "sto" | Yes | Append `[3,5]` |
| 3 | 7 | "story" | Yes | Append `[3,7]` |

After scanning all start positions, we sort the collected pairs to obtain `[[0,2],[3,5],[3,7]]`.

## 5. Complexity Analysis

- **Time:** O(n · m · k) in the brute-force version, where *n* is the length of `text`, *m* is the average word length, and *k* is the number of words. Using a Trie reduces it to O(n · L) where *L* is the maximum word length.
- **Space:** O(k · L) for the Trie (or O(k) for the hash set) plus O(p) for the result list, where *p* is the number of matching pairs.

## 6. Follow-Up Questions

- How would you modify the solution to return the actual substrings instead of index pairs?
- Can you design an algorithm that works in O(n) time using a Trie?
- How would you handle overlapping words and prioritize longer matches?

## Key Takeaway

> Check all substrings against a word set. For efficiency, use a Trie of words and traverse from each starting index.
