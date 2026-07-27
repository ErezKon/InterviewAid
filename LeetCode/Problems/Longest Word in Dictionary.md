# 720. Longest Word in Dictionary

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-word-in-dictionary](https://leetcode.com/problems/longest-word-in-dictionary)
**Companies:** Amazon, Google, Pinterest

---

## Approach: Sort + Hash Set — O(n·L) ✅

```
FUNCTION longestWord(words):
    SORT words
    built = {""}
    result = ""

    FOR word IN words:
        IF word[:-1] IN built:
            built.ADD(word)
            IF len(word) > len(result):
                result = word

    RETURN result
```

| Time | Space |
|------|-------|
| O(n · L · log n) | O(n · L) |

---

## Key Takeaway

> Sort ensures shorter words are processed first. A word is buildable if its prefix (minus last char) was already built. Also solvable with a Trie + DFS.
