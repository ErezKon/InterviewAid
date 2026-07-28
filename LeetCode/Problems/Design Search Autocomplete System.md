# 642. Design Search Autocomplete System

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/design-search-autocomplete-system](https://leetcode.com/problems/design-search-autocomplete-system)
**Companies:** Amazon, Apple, Bloomberg, Cisco, Citadel, Google, Meta, Microsoft, Mongodb, Pinterest, Roblox, Tiktok, Uber

---

## Problem Description

Design an autocomplete system. `input(c)` feeds one character; return the top 3 historical sentences matching the current prefix, ranked by frequency then lexicographically. `'#'` ends the sentence and records it.

---

## Examples

**Example 1:**
```
Input: sentences = ["i love you", "island", "ironman", "i love leetcode"], times = [5,3,2,2]
System.input('i') → []
System.input(' ') → ["i love you", "i love leetcode"]
System.input('a') → []
System.input('#') → []   // record "i a"
```
*Explanation:* After typing "i ", the two most frequent sentences starting with that prefix are returned.

**Example 2:**
```
Input: System.input('i') → []
System.input('l') → ["i love you", "i love leetcode"]
System.input('#') → []   // record "il"
```
*Explanation:* The system updates its history after each `'#'`.

---

## Approach: Trie + Priority Queue ✅

```text
CLASS AutocompleteSystem:
    CONSTRUCTOR(sentences, times):
        trie ← Trie()
        FOR i ← 0 TO LENGTH(sentences)-1:
            trie.INSERT(sentences[i], times[i])
        currentInput ← ""
        currentNode ← trie.root

    FUNCTION input(c):
        IF c == '#':
            trie.INSERT(currentInput, 1)    // add/increment
            currentInput ← ""
            currentNode ← trie.root
            RETURN []
        currentInput ← currentInput + c
        IF currentNode == null OR c NOT IN currentNode.children:
            currentNode ← null
            RETURN []
        currentNode ← currentNode.children[c]
        candidates ← getAllSentences(currentNode)
        SORT candidates BY (-frequency, sentence)
        RETURN FIRST 3 OF candidates
```

---

## Walkthrough

| Step | Input | Current Prefix | Node Exists? | Returned Top‑3 |
|------|-------|----------------|--------------|----------------|
| 1 | 'i' | "i" | Yes (root → 'i') | [] (no complete sentence yet) |
| 2 | ' ' | "i " | Yes (node for space) | ["i love you", "i love leetcode"] (freq 5 and 2) |
| 3 | 'a' | "i a" | No (missing child) | [] |
| 4 | '#' | end | Record "i a" with freq 1, reset | [] |

The table shows how the trie node is followed character by character and how the candidate list is built only when a valid node exists.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(k log k) per input, where k = number of sentences sharing the prefix |
| **Space** | O(total characters in all stored sentences) |

---

## Follow-Up Questions

1. How would you modify the design to support deletion of a sentence?
2. How can you improve the ranking to consider recency in addition to frequency?
3. Could you extend the system to suggest completions for multiple languages with Unicode characters?

---

## Key Takeaway

> **Trie + ranking: cache the current node so each character is O(1) traversal. Store the sentence set at each node (or DFS to collect), then sort by `(-frequency, sentence)` and take the top 3. Reset on `'#'`.**