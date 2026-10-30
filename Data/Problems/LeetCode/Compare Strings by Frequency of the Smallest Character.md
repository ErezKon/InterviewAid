# 1170. Compare Strings by Frequency of the Smallest Character

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/compare-strings-by-frequency-of-the-smallest-character](https://leetcode.com/problems/compare-strings-by-frequency-of-the-smallest-character)
**Companies:** Google

---

## 1. Problem Description

Let the function `f(s)` be the **frequency of the lexicographically smallest character** in a non-empty string `s`. For example, if `s = "dcce"` then `f(s) = 2` because the lexicographically smallest character is `'c'`, which has a frequency of 2.

You are given an array of strings `words` and another array of query strings `queries`. For each query `queries[i]`, count the **number of words** in `words` such that `f(queries[i]) < f(W)` for each `W` in `words`.

Return *an integer array* `answer`*, where each* `answer[i]` *is the answer to the* `i`-th *query*.

**Constraints:**
- `1 <= queries.length <= 2000`
- `1 <= words.length <= 2000`
- `1 <= queries[i].length, words[i].length <= 10`
- `queries[i][j]`, `words[i][j]` consist of lowercase English letters.

---

## 2. Key Insight

> Precompute `f` for all words, sort them. For each query, binary search to find how many word-f-values exceed the query's f-value.

---

## 3. Approach: Sort + Binary Search — O((n + q) log n) ✅

```text
FUNCTION numSmallerByFrequency(queries, words):
    FUNCTION f(s):
        SET smallest ← MINIMUM character in s
        RETURN COUNT of smallest in s
    
    wordFreqs = SORTED([f(w) FOR w IN words])
    result = []
    FOR q IN queries:
        qf = f(q)
        // find first index > qf
        SET idx ← UPPER_BOUND(wordFreqs, qf)   // first position greater than qf
        APPEND (LEN(wordFreqs) - idx) TO result
    RETURN result
```

---

## 4. Examples

```
Example 1:
  Input: queries = ["cbd"], words = ["zaaaz"]
  Output: [1]
  Explanation: On the first query we have f("cbd") = 1, f("zaaaz") = 3 so f("cbd") < f("zaaaz").
```
```
Example 2:
  Input: queries = ["bbb","cc"], words = ["a","aa","aaa","aaaa"]
  Output: [1,2]
  Explanation: On the first query only f("bbb") < f("aaaa"). On the second query both f("aaa") and f("aaaa") are both > f("cc").
```

---

## 5. Walkthrough

Consider `queries = ["bbb","cc"]`, `words = ["a","aa","aaa"]`.

1. Compute `f` for each word:
   - `"a"` → smallest `a`, count 1 → 1
   - `"aa"` → smallest `a`, count 2 → 2
   - `"aaa"` → smallest `a`, count 3 → 3
   Sorted `wordFreqs = [1,2,3]`.
2. Process query `"bbb"`:
   - `f("bbb") = 3` (smallest `b` appears 3 times).
   - Upper bound of 3 in `[1,2,3]` is index 3 (end), so count = 3‑3 = 0.
3. Process query `"cc"`:
   - `f("cc") = 2`.
   - Upper bound of 2 is index 2, count = 3‑2 = 1 (only `"aaa"`).
Result `[0,1]`.

---

## 6. Complexity Analysis

- **Time:** O((n + q) log n) – sorting `n` word frequencies and binary searching for each of `q` queries.
- **Space:** O(n) for storing `wordFreqs`.

---

## 7. Follow-Up Questions

- How would you adapt the solution if `f(s)` were defined as the frequency of the most frequent character instead?
- Can you solve the problem in O(n + q) time using counting sort given the limited alphabet size?
- What changes are needed if the input strings can contain Unicode characters beyond `a‑z`?

---

## Key Takeaway

> Precompute the function values, sort them, and use binary search for each query. Transforms an O(n×q) problem into O((n+q) log n).
