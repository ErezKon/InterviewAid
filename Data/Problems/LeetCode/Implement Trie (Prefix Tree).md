
# 208. Implement Trie (Prefix Tree)

**Difficulty:** 🟡 Medium
**Acceptance:** 67.2%
**LeetCode:** [https://leetcode.com/problems/implement-trie-prefix-tree](https://leetcode.com/problems/implement-trie-prefix-tree)
**Companies:** Adobe, Amazon, Apple, Bloomberg, Citadel, Docusign, Doordash, General Motors, Goldman Sachs, Google, Grammarly, Instabase, Lyft, Meta, Microsoft, Mongodb, Oracle, Roblox, Snowflake, Tiktok, Twitter, Uber

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Concept: What Is a Trie?](#3-key-concept-what-is-a-trie)
4. [Solution ✅](#4-solution-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)

---

## 1. Problem Description

Implement a trie with `insert`, `search`, and `startsWith` methods.

- `insert(word)` — Inserts the string `word` into the trie.
- `search(word)` — Returns `true` if `word` is in the trie (exact match).
- `startsWith(prefix)` — Returns `true` if any word starts with `prefix`.

---

## 2. Examples

```
Trie trie = new Trie()
trie.insert("apple")
trie.search("apple")       // true
trie.search("app")         // false
trie.startsWith("app")     // true
trie.insert("app")
trie.search("app")         // true
```

---

## 3. Key Concept: What Is a Trie?

A **trie** (prefix tree) stores strings character by character as a tree. Each node represents a character, and paths from root to nodes represent prefixes.

```
After inserting "apple", "app", "apt", "bat":

          root
         /    \
        a      b
        |      |
        p      a
       / \     |
      p   t*   t*
      |
      l
      |
      e*

  * marks end of a complete word
```

**Advantages over hash sets:**
- Prefix queries (autocomplete)
- Ordered traversal
- No hash collisions
- Space-efficient for shared prefixes

---

## 4. Solution ✅

```
CLASS TrieNode:
    children = {}                  // char → TrieNode
    isEnd    = FALSE


CLASS Trie:

    INITIALIZE():
        this.root = new TrieNode()


    INSERT(word):
        node = this.root
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
        node = this.root
        FOR each char IN s:
            IF char NOT IN node.children:
                RETURN NULL
            node = node.children[char]
        RETURN node
```

### Implementation with Array Instead of HashMap

For lowercase letters only, use a fixed array of 26:

```
CLASS TrieNode:
    children = ARRAY of 26 NULLs      // children[0] = 'a', ..., children[25] = 'z'
    isEnd = FALSE

// Access: node.children[char - 'a']
```

Array-based is faster (no hashing), HashMap-based is more flexible (Unicode support).

---

## 5. Walkthrough

```
insert("apple"):
  root → 'a' (create) → 'p' (create) → 'p' (create) → 'l' (create) → 'e' (create, isEnd=T)

insert("app"):
  root → 'a' (exists) → 'p' (exists) → 'p' (exists, set isEnd=T)

search("apple"):
  root → 'a' → 'p' → 'p' → 'l' → 'e' → found, isEnd=TRUE → return TRUE ✅

search("app"):
  root → 'a' → 'p' → 'p' → found, isEnd=TRUE → return TRUE ✅

search("ap"):
  root → 'a' → 'p' → found, isEnd=FALSE → return FALSE ✅

startsWith("app"):
  root → 'a' → 'p' → 'p' → found (non-null) → return TRUE ✅

startsWith("b"):
  root → 'b' → NOT in children → return NULL → FALSE ✅
```

---

## 6. Complexity Analysis

| Operation | Time | Space |
|-----------|------|-------|
| **insert** | O(m) | O(m) worst case for new nodes |
| **search** | O(m) | O(1) |
| **startsWith** | O(m) | O(1) |

Where `m` = length of the word/prefix. Total space: O(total characters across all inserted words).

---

## 7. Follow-Up Questions

### 7.1 Delete a word from the trie

Mark `isEnd = FALSE`. Optionally, prune empty branches:

```
FUNCTION delete(word):
    FUNCTION dfs(node, word, depth):
        IF depth == LENGTH(word):
            IF NOT node.isEnd: RETURN FALSE  // word not found
            node.isEnd = FALSE
            RETURN SIZE(node.children) == 0  // can delete if no children

        char = word[depth]
        IF char NOT IN node.children:
            RETURN FALSE

        shouldDelete = dfs(node.children[char], word, depth + 1)

        IF shouldDelete:
            DELETE node.children[char]
            RETURN NOT node.isEnd AND SIZE(node.children) == 0

        RETURN FALSE

    dfs(root, word, 0)
```

### 7.2 Count words with a given prefix

Add a `prefixCount` field to each node, increment during insert:

```
INSERT(word):
    node = root
    FOR each char IN word:
        ...
        node = node.children[char]
        node.prefixCount += 1
    node.isEnd = TRUE

COUNT_PREFIX(prefix):
    node = findNode(prefix)
    RETURN node.prefixCount IF node IS NOT NULL ELSE 0
```

### 7.3 Autocomplete — return all words with a given prefix

```
FUNCTION autocomplete(prefix):
    node = findNode(prefix)
    IF node IS NULL: RETURN []

    results = []
    FUNCTION dfs(node, path):
        IF node.isEnd:
            results.ADD(prefix + path)
        FOR each (char, child) IN node.children:
            dfs(child, path + char)

    dfs(node, "")
    RETURN results
```

### 7.4 Longest Common Prefix among all words

Traverse from root while there's exactly one child and `isEnd` is false:

```
FUNCTION longestCommonPrefix():
    node = root
    prefix = ""
    WHILE SIZE(node.children) == 1 AND NOT node.isEnd:
        char = ONLY key in node.children
        prefix += char
        node = node.children[char]
    RETURN prefix
```

---

## Key Takeaway

> The Trie is fundamentally about **sharing common prefixes**. Its power comes from the O(m) operations where m is the word length (independent of how many words are stored). It's the backbone of autocomplete systems, spell checkers, IP routing tables, and dictionary matching. Know both the hashmap-based and array-based implementations.
