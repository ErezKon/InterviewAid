# 676. Implement Magic Dictionary

**Difficulty:** 🟡 Medium

**Companies:** Bloomberg, Google
---

## 1. Problem Description

Design a dictionary where `search(word)` returns true if you can change exactly one character in `word` to match a word in the dictionary.

## 2. Approach: Brute Force Compare — O(n · k) ✅

```
CLASS MagicDictionary:
    FUNCTION buildDict(dictionary): self.words = dictionary
    FUNCTION search(searchWord):
        FOR w IN words:
            IF len(w) != len(searchWord): CONTINUE
            diff = SUM(1 for a, b in zip(w, searchWord) if a != b)
            IF diff == 1: RETURN true
        RETURN false
```

## Key Takeaway

> For each dictionary word of same length, count character differences. Exactly 1 difference = match. Alternative: Trie with one-mismatch DFS.
