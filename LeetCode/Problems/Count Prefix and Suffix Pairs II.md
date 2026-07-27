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

Given an array of strings `words`, count pairs `(i, j)` where `i < j` and `words[i]` is both a prefix and suffix of `words[j]`.

**Constraints:**
- `1 <= words.length <= 10^5`
- `1 <= words[i].length <= 10^5`
- Total length of all words ≤ 5 × 10^5

---

## Examples

**Example 1:**
- **Input:** `words = ["a","aba","ababa","aa"]`
- **Output:** `4`
- **Explanation:** (0,1): "a" is prefix+suffix of "aba". (0,2): "a" of "ababa". (1,2): "aba" of "ababa". (0,3): "a" of "aa".

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
