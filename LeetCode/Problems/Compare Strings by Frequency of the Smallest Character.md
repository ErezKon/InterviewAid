# 1170. Compare Strings by Frequency of the Smallest Character

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/compare-strings-by-frequency-of-the-smallest-character](https://leetcode.com/problems/compare-strings-by-frequency-of-the-smallest-character)
**Companies:** Google

---

## 1. Problem Description

Define `f(s)` = frequency of the lexicographically smallest character in `s`. Given arrays `queries` and `words`, for each query, count how many words have `f(word) > f(query)`.

---

## 2. Key Insight

> Precompute `f` for all words, sort them. For each query, binary search to find how many word-f-values exceed the query's f-value.

---

## 3. Approach: Sort + Binary Search — O((n + q) log n) ✅

```
FUNCTION numSmallerByFrequency(queries, words):
    FUNCTION f(s): RETURN s.count(min(s))
    
    wordFreqs = SORTED([f(w) for w in words])
    result = []
    FOR q IN queries:
        qf = f(q)
        // count words with freq > qf
        idx = bisect_right(wordFreqs, qf)
        result.ADD(len(wordFreqs) - idx)
    RETURN result
```

| Time | Space |
|------|-------|
| O((n + q) log n) | O(n) |

---

## Key Takeaway

> Precompute the function values, sort them, and use binary search for each query. Transforms an O(n×q) problem into O((n+q) log n).
