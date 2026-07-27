# 642. Design Search Autocomplete System

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/design-search-autocomplete-system](https://leetcode.com/problems/design-search-autocomplete-system)
**Companies:** Amazon, Apple, Bloomberg, Cisco, Citadel, Google, Meta, Microsoft, Mongodb, Pinterest, Roblox, Tiktok, Uber

---

## Problem Description

Design an autocomplete system. `input(c)` feeds one character; return the top 3 historical sentences matching the current prefix, ranked by frequency then lexicographically. `'#'` ends the sentence and records it.

---

## Key Insight

A trie over historical sentences lets us jump to the prefix node in O(1) per character. Once there, collect sentences in that subtree and rank by `(-frequency, sentence)`.

---

## Approach: Trie + Priority Queue ✅

```
CLASS AutocompleteSystem:
    CONSTRUCTOR(sentences, times):
        trie = Trie()
        FOR i, sentence IN enumerate(sentences):
            trie.INSERT(sentence, times[i])
        currentInput = ""
        currentNode = trie.root

    FUNCTION input(c):
        IF c == '#':
            trie.INSERT(currentInput, 1)    // add/increment
            currentInput = ""
            currentNode = trie.root
            RETURN []

        currentInput += c

        IF currentNode == null OR c NOT IN currentNode.children:
            currentNode = null
            RETURN []

        currentNode = currentNode.children[c]

        // Collect all sentences from this node
        candidates = getAllSentences(currentNode)

        // Sort by (-frequency, lexicographic)
        SORT candidates
        RETURN top 3
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(k log k) per input, k = matching sentences |
| **Space** | O(total characters in all sentences) |

---

## Key Takeaway

> **Trie + ranking: cache the current node so each character is O(1) traversal. Store the sentence set at each node (or DFS to collect), then sort by `(-frequency, sentence)` and take the top 3. Reset on `'#'`.**
