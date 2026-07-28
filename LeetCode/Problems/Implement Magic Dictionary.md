# 676. Implement Magic Dictionary

**Difficulty:** 🟡 Medium

**Companies:** Bloomberg, Google
---

## 1. Problem Description

Design a dictionary where `search(word)` returns true if you can change exactly one character in `word` to match a word in the dictionary.

## 2. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `buildDict(["hello","leetcode"])` then `search("hello")` | `false` | No single‑character change makes "hello" match another word. |
| `search("hhllo")` | `true` | Changing the second `h` to `e` matches "hello". |
| `search("hell")` | `false` | Length mismatch, cannot match. |

## 3. Approach

**Brute Force Compare — O(n·k)** ✅

```
FUNCTION buildDict(dictionary):
    SET self.words ← dictionary

FUNCTION search(searchWord):
    FOR w IN self.words:
        IF LENGTH(w) ≠ LENGTH(searchWord): CONTINUE
        SET diff ← 0
        FOR i ← 0 TO LENGTH(w)-1:
            IF w[i] ≠ searchWord[i]:
                SET diff ← diff + 1
                IF diff > 1: BREAK
        IF diff = 1: RETURN true
    RETURN false
```

*Insight*: Only words of equal length need comparison; count mismatched characters and accept exactly one.

## 4. Walkthrough

Consider dictionary `["hello","leetcode"]` and `searchWord = "hhllo"`.
1. Compare with "hello": mismatches at positions 1 (`e` vs `h`). diff = 1 → return true.
2. No need to check further words.

## 5. Complexity Analysis

- **Time**: O(n·k) where *n* is number of stored words and *k* is word length.
- **Space**: O(1) extra beyond storing the dictionary.

## 6. Follow‑Up Questions

- How would you improve the search to O(k) using a Trie with one‑mismatch DFS?
- How to support multiple character modifications?
- How to handle large dictionaries efficiently?

## Key Takeaway

> For each dictionary word of same length, count character differences. Exactly one difference = match. Alternative: Trie with one‑mismatch DFS.
