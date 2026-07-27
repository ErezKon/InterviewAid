
# 211. Design Add and Search Words Data Structure

**Difficulty:** 🟡 Medium
**Acceptance:** 50.9%
**LeetCode:** [https://leetcode.com/problems/design-add-and-search-words-data-structure](https://leetcode.com/problems/design-add-and-search-words-data-structure)
**Companies:** Amazon, Apple, Atlassian, Bloomberg, Datadog, Docusign, Doordash, Google, Meta, Microsoft, Oracle, Rubrik, Snapchat, Snowflake, Tiktok

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight: Trie + DFS](#3-key-insight-trie--dfs)
4. [Solution — O(m) add, O(26^m) worst search ✅](#4-solution--om-add-o26m-worst-search-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)

---

## 1. Problem Description

Design a data structure that supports:
- `addWord(word)` — Adds a word to the data structure.
- `search(word)` — Returns `true` if any previously added word matches. A word may contain `.` which matches **any** single letter.

---

## 2. Examples

```
addWord("bad")
addWord("dad")
addWord("mad")
search("pad") → false
search("bad") → true
search(".ad") → true      (matches "bad", "dad", "mad")
search("b..") → true      (matches "bad")
```

---

## 3. Key Insight: Trie + DFS

Use a **Trie** (prefix tree) for storage. For exact characters, follow the normal trie path. For `.` wildcards, try **all 26** children via DFS.

---

## 4. Solution — O(m) add, O(26^m) worst search ✅

```
CLASS TrieNode:
    children = {}                  // char → TrieNode
    isEnd = FALSE


CLASS WordDictionary:

    INITIALIZE():
        this.root = new TrieNode()


    ADD_WORD(word):
        node = this.root
        FOR each char IN word:
            IF char NOT IN node.children:
                node.children[char] = new TrieNode()
            node = node.children[char]
        node.isEnd = TRUE


    SEARCH(word):
        RETURN dfs(word, 0, this.root)


    FUNCTION dfs(word, index, node):
        IF index == LENGTH(word):
            RETURN node.isEnd

        char = word[index]

        IF char == '.':
            // Wildcard: try every child
            FOR each child IN node.children.VALUES():
                IF dfs(word, index + 1, child):
                    RETURN TRUE
            RETURN FALSE

        ELSE:
            IF char NOT IN node.children:
                RETURN FALSE
            RETURN dfs(word, index + 1, node.children[char])
```

---

## 5. Walkthrough

```
addWord("bad"):  root → 'b' → 'a' → 'd' (isEnd=T)
addWord("dad"):  root → 'd' → 'a' → 'd' (isEnd=T)
addWord("mad"):  root → 'm' → 'a' → 'd' (isEnd=T)

Trie structure:
  root
  ├── b → a → d*
  ├── d → a → d*
  └── m → a → d*

search(".ad"):
  index=0, char='.', try all children:
    child 'b': dfs("ad", 1, b-node)
      index=1, char='a' → exists → dfs("d", 2, a-node)
        index=2, char='d' → exists → dfs("", 3, d-node)
          index=3 == length → isEnd=TRUE → RETURN TRUE ✅

search("b.."):
  index=0, char='b' → exists → dfs("..", 1, b-node)
    index=1, char='.', try all children:
      child 'a': dfs(".", 2, a-node)
        index=2, char='.', try all children:
          child 'd': dfs("", 3, d-node)
            index=3 == length → isEnd=TRUE → RETURN TRUE ✅
```

---

## 6. Complexity Analysis

| Operation | Time | Space |
|-----------|------|-------|
| **addWord** | O(m) | O(m) per word |
| **search (no dots)** | O(m) | O(1) |
| **search (with dots)** | O(26^d · m) worst case | O(m) call stack |

Where `m` = word length, `d` = number of dots. In practice, the trie structure prunes most branches.

---

## 7. Follow-Up Questions

### 7.1 Implement Trie (LeetCode #208)

Basic trie without wildcards:

```
CLASS Trie:
    INITIALIZE():
        root = new TrieNode()

    INSERT(word):
        node = root
        FOR each char IN word:
            IF char NOT IN node.children:
                node.children[char] = new TrieNode()
            node = node.children[char]
        node.isEnd = TRUE

    SEARCH(word):
        node = findNode(word)
        RETURN node IS NOT NULL AND node.isEnd

    STARTS_WITH(prefix):
        RETURN findNode(prefix) IS NOT NULL

    FUNCTION findNode(s):
        node = root
        FOR each char IN s:
            IF char NOT IN node.children:
                RETURN NULL
            node = node.children[char]
        RETURN node
```

### 7.2 Word Search II (LeetCode #212)

Find all words from a dictionary in a 2D grid. Build a trie from the dictionary, then DFS on the grid using the trie for pruning.

### 7.3 Search Suggestions System (LeetCode #1268)

Return top 3 suggestions for each prefix. Build a trie and do DFS to collect sorted results.

### 7.4 Replace Words (LeetCode #648)

Replace words in a sentence with their shortest root from a dictionary. Use trie to find the shortest prefix match.

---

## Trie Problem Family

| Problem | Key Operation | Time |
|---------|---------------|------|
| **Implement Trie** (#208) | Insert, search, prefix | O(m) |
| **Add & Search Words** (#211) | Wildcard search | O(26^d · m) |
| **Word Search II** (#212) | Grid + trie DFS | O(m·n · 4^L) |
| **Search Suggestions** (#1268) | Prefix autocomplete | O(m) |
| **Replace Words** (#648) | Shortest prefix | O(m) |

---

## Key Takeaway

> The Trie is the go-to data structure for **prefix-based** operations. Adding wildcard support requires DFS branching at each `.` character. The trie's tree structure naturally prunes impossible branches, making searches much faster than brute-force in practice despite the theoretical worst case.
