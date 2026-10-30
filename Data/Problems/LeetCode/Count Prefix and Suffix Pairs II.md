# 3045. Count Prefix and Suffix Pairs II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-prefix-and-suffix-pairs-ii](https://leetcode.com/problems/count-prefix-and-suffix-pairs-ii)
**Companies:** Autodesk, Capital One, Samsung, Uber

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given a **0-indexed** string array `words`.

Let's define a **boolean** function `isPrefixAndSuffix` that takes two strings, `str1` and `str2`:

- `isPrefixAndSuffix(str1, str2)` returns `true` if `str1` is **both** a prefix and a suffix of `str2`, and `false` otherwise.

For example, `isPrefixAndSuffix("aba", "ababa")` is `true` because `"aba"` is a prefix of `"ababa"` and also a suffix, but `isPrefixAndSuffix("abc", "abcd")` is `false`.

Return *an integer denoting the **number** of index pairs *`(i*, *j)`* such that *`i < j`*, and *`isPrefixAndSuffix(words[i], words[j])`* is *`true`*.*

**Constraints:**
- `1 <= words.length <= 10^5`
- `1 <= words[i].length <= 10^5`
- `words[i]` consists only of lowercase English letters.
- The sum of the lengths of all `words[i]` does not exceed `5 * 10^5`.

---

## Examples

**Example 1:**
```
Input: words = ["a","aba","ababa","aa"]
Output: 4
Explanation: In this example, the counted index pairs are:
i = 0 and j = 1 because isPrefixAndSuffix("a", "aba") is true.
i = 0 and j = 2 because isPrefixAndSuffix("a", "ababa") is true.
i = 0 and j = 3 because isPrefixAndSuffix("a", "aa") is true.
i = 1 and j = 2 because isPrefixAndSuffix("aba", "ababa") is true.
Therefore, the answer is 4.
```

**Example 2:**
```
Input: words = ["pa","papa","ma","mama"]
Output: 2
Explanation: In this example, the counted index pairs are:
i = 0 and j = 1 because isPrefixAndSuffix("pa", "papa") is true.
i = 2 and j = 3 because isPrefixAndSuffix("ma", "mama") is true.
Therefore, the answer is 2.
```

**Example 3:**
```
Input: words = ["abab","ab"]
Output: 0
Explanation: In this example, the only valid index pair is i = 0 and j = 1, and isPrefixAndSuffix("abab", "ab") is false.
Therefore, the answer is 0.
```

---

## Key Insight

Build a **trie** where each node's key is a **pair** `(prefix_char, suffix_char)`. For a word of length L, at depth `d` the key is `(word[d], word[L-1-d])`. This simultaneously matches both prefix and suffix conditions. When inserting a word, track how many previous words passed through each node.

---

## Approach

```
FUNCTION countPrefixSuffixPairs(words):
    trie = new Trie()  // each edge labeled with (char, char) pair
    count = 0

    FOR each word w IN words DO
        // Query: walk trie with keys (w[0],w[-1]), (w[1],w[-2]), ...
        // At each node, add its count (words that are both prefix and suffix)
        node = trie.root
        FOR d ← 0 TO LENGTH(w) - 1 DO
            key = (w[d], w[LENGTH(w)-1-d])
            IF key NOT IN node.children: BREAK
            node = node.children[key]
            count += node.endCount   // words that ended here are valid pairs

        // Insert: walk trie, creating nodes as needed
        node = trie.root
        FOR d ← 0 TO LENGTH(w) - 1 DO
            key = (w[d], w[LENGTH(w)-1-d])
            IF key NOT IN node.children:
                node.children[key] = new TrieNode()
            node = node.children[key]
        node.endCount += 1

    RETURN count
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(total_length) — each character processed once during insert and query |
| **Space** | O(total_length) — trie nodes |

---

## Follow-Up Questions

**Q1: Why pair the prefix and suffix characters together?**
A word `w` is both prefix and suffix of `s` iff `s[0..len(w)-1] == w` AND `s[-len(w)..] == w`. By encoding both simultaneously as `(s[d], s[-1-d])` at each depth, a single trie walk checks both conditions.

**Q2: How does this differ from Part I?**
Part I has small constraints (n ≤ 50, length ≤ 10) allowing O(n² × L) brute force. Part II requires the O(total_length) trie approach.

---

## Key Takeaway

> **When checking both prefix and suffix conditions simultaneously, encode them as a paired trie key `(char_from_front, char_from_back)` at each depth. This elegant trick avoids separate prefix and suffix checks.**
