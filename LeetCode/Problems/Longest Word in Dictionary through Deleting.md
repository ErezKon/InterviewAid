# 524. Longest Word in Dictionary through Deleting

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-word-in-dictionary-through-deleting](https://leetcode.com/problems/longest-word-in-dictionary-through-deleting)
**Companies:** Google

---

## 1. Problem Description

Find the longest word in the dictionary that is a subsequence of `s`. Break ties lexicographically.

---

## 2. Examples

| s | dictionary | Output | Explanation |
|---|------------|--------|-------------|
| "abpcplea" | ["ale","apple","monkey","plea"] | "apple" | "apple" is the longest word that can be formed by deleting characters from `s`.
| "abpcplea" | ["a","b","c"] | "a" | All words are length 1; "a" is lexicographically smallest.

---

## 3. Approach: Sort + Subsequence Check — O(n·L + d·L) ✅

```text
FUNCTION findLongestWord(s, dictionary):
    SORT dictionary BY (-len(word), word)  // longer first, then lexicographically
    FOR word IN dictionary:
        IF isSubsequence(word, s):
            RETURN word
    RETURN ""

FUNCTION isSubsequence(word, s):
    i ← 0
    FOR c IN s:
        IF i < LEN(word) AND word[i] == c:
            i ← i + 1
    RETURN i == LEN(word)
```

---

## 4. Walkthrough

Consider `s = "abpcplea"` and dictionary sorted as `["apple", "plea", "ale", "monkey"]`.
1. Check "apple": iterate through `s`, matching `a`→`a`, `p`→`p`, `p`→`p`, `l`→`l`, `e`→`e`. All characters matched, return "apple".
2. No further checks needed because the first valid subsequence is the answer.

---

## 5. Complexity Analysis

- **Time:** Sorting `O(d log d)` where `d` is dictionary size, plus subsequence checks `O(d·|s|)`. Overall `O(d·|s| + d log d)`.
- **Space:** `O(1)` extra beyond input storage.

---

## 6. Follow-Up Questions

- How would you handle the case where the dictionary is extremely large and cannot be fully loaded into memory?
- Can you improve the subsequence check using preprocessing of `s` for faster multiple queries?

---

## 7. Key Takeaway

> Sort the dictionary by length (desc) and lexicographically. The first word that is a subsequence of `s` is the answer. Use a two‑pointer subsequence check.
