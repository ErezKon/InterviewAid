# 524. Longest Word in Dictionary through Deleting

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-word-in-dictionary-through-deleting](https://leetcode.com/problems/longest-word-in-dictionary-through-deleting)
**Companies:** Google

---

## 1. Problem Description

Given a string `s` and a string array `dictionary`, return *the longest string in the dictionary that can be formed by deleting some of the given string characters*. If there is more than one possible result, return the longest word with the smallest lexicographical order. If there is no possible result, return the empty string.

**Constraints:**
- `1 <= s.length <= 1000`
- `1 <= dictionary.length <= 1000`
- `1 <= dictionary[i].length <= 1000`
- `s` and `dictionary[i]` consist of lowercase English letters.

---

## 2. Examples

**Example 1:**
```
Input: s = "abpcplea", dictionary = ["ale","apple","monkey","plea"]
Output: "apple"
```

**Example 2:**
```
Input: s = "abpcplea", dictionary = ["a","b","c"]
Output: "a"
```

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
