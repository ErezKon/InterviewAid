# 291. Word Pattern II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/word-pattern-ii](https://leetcode.com/problems/word-pattern-ii)
**Companies:** Amazon, Apple, Dropbox, Microsoft, Tiktok, Uber

---

## Approach: Backtracking — O(n^m) ✅

```
FUNCTION wordPatternMatch(pattern, s):
    RETURN backtrack(pattern, s, 0, 0, {}, set())

FUNCTION backtrack(pattern, s, pi, si, mapping, usedWords):
    IF pi == len(pattern) AND si == len(s): RETURN true
    IF pi == len(pattern) OR si == len(s): RETURN false

    char = pattern[pi]
    IF char IN mapping:
        word = mapping[char]
        IF NOT s.startswith(word, si): RETURN false
        RETURN backtrack(pattern, s, pi+1, si+len(word), mapping, usedWords)

    FOR end ← si + 1 TO len(s):
        word = s[si:end]
        IF word IN usedWords: CONTINUE
        mapping[char] = word
        usedWords.ADD(word)
        IF backtrack(pattern, s, pi+1, end, mapping, usedWords):
            RETURN true
        DEL mapping[char]
        usedWords.REMOVE(word)

    RETURN false
```
