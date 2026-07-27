# 2085. Count Common Words With One Occurrence

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-common-words-with-one-occurrence](https://leetcode.com/problems/count-common-words-with-one-occurrence)
**Companies:** Jane Street

---

## 1. Problem Description

Given two string arrays `words1` and `words2`, count words that appear exactly once in both arrays.

---

## 2. Approach: Two Frequency Maps — O(n + m) ✅

```
FUNCTION countWords(words1, words2):
    freq1 = Counter(words1)
    freq2 = Counter(words2)
    count = 0
    FOR word IN freq1:
        IF freq1[word] == 1 AND freq2.get(word, 0) == 1:
            count += 1
    RETURN count
```

| Time | Space |
|------|-------|
| O(n + m) | O(n + m) |

---

## Key Takeaway

> Count frequencies in both arrays independently, then find words with frequency exactly 1 in both.
