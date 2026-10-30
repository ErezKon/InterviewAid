# 1804. Implement Trie II (Prefix Tree)

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/implement-trie-ii-prefix-tree](https://leetcode.com/problems/implement-trie-ii-prefix-tree)
**Companies:** Amazon, Microsoft

---

## 1. Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

A **trie** (pronounced as "try") or **prefix tree** is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker.

Implement the Trie class:

- `Trie()` Initializes the trie object.
- `void insert(String word)` Inserts the string `word` into the trie.
- `int countWordsEqualTo(String word)` Returns the number of instances of the string `word` in the trie.
- `int countWordsStartingWith(String prefix)` Returns the number of strings in the trie that have the string `prefix` as a prefix.
- `void erase(String word)` Erases the string `word` from the trie.

**Constraints:**
- `1 <= word.length, prefix.length <= 2000`
- `word` and `prefix` consist only of lowercase English letters.
- At most `3 * 10^4` calls **in total** will be made to `insert`, `countWordsEqualTo`, `countWordsStartingWith`, and `erase`.
- It is guaranteed that for any function call to `erase`, the string `word` will exist in the trie.

## 2. Approach: Trie with Word + Prefix Counts ✅

```
CLASS TrieNode:
    children = {}
    wordCount = 0      // how many words end here
    prefixCount = 0    // how many words pass through here

CLASS Trie:
    FUNCTION insert(word):
        node ← root
        FOR c IN word:
            node = node.children[c]
            node.prefixCount += 1
        node.wordCount += 1

    FUNCTION countWordsEqualTo(word):
        node ← traverse(word)
        RETURN node.wordCount IF found ELSE 0

    FUNCTION countWordsStartingWith(prefix):
        node ← traverse(prefix)
        RETURN node.prefixCount IF found ELSE 0

    FUNCTION erase(word):
        node ← root
        FOR c IN word:
            node = node.children[c]
            node.prefixCount -= 1
        node.wordCount -= 1
```

## Examples

**Example 1:**
```
Input
["Trie", "insert", "insert", "countWordsEqualTo", "countWordsStartingWith", "erase", "countWordsEqualTo", "countWordsStartingWith", "erase", "countWordsStartingWith"]
[[], ["apple"], ["apple"], ["apple"], ["app"], ["apple"], ["apple"], ["app"], ["apple"], ["app"]]
Output:
[null, null, null, 2, 2, null, 1, 1, null, 0]
Explanation:
Trie trie = new Trie();
trie.insert("apple");               // Inserts "apple".
trie.insert("apple");               // Inserts another "apple".
trie.countWordsEqualTo("apple");    // There are two instances of "apple" so return 2.
trie.countWordsStartingWith("app"); // "app" is a prefix of "apple" so return 2.
trie.erase("apple");                // Erases one "apple".
trie.countWordsEqualTo("apple");    // Now there is only one instance of "apple" so return 1.
trie.countWordsStartingWith("app"); // return 1
trie.erase("apple");                // Erases "apple". Now the trie is empty.
trie.countWordsStartingWith("app"); // return 0
```

## Walkthrough

| Step | Operation | Prefix Count Change |
|------|-----------|----------------------|
| 1 | insert("app") | nodes a,p,p prefixCount +1 each, wordCount at last node =1 |
| 2 | insert("apple") | nodes a,p,p prefixCount +1, nodes l,e new nodes created, wordCount at e =1 |
| 3 | countWordsStartingWith("app") | returns prefixCount at node p =2 |
| 4 | erase("app") | decrement prefixCount on a,p,p nodes, wordCount at p =0 |

## Complexity Analysis

- **Time:** Each operation traverses the word length `L`: O(L).
- **Space:** O(N·L) for storing N words of average length L in the Trie.

## Follow-Up Questions

- How would you modify the Trie to support wildcard `.` queries?
- Can you implement a compressed Trie to save space?

## Key Takeaway

> Standard Trie + two counters per node: `wordCount` for exact matches, `prefixCount` for prefix queries. Erase decrements both.
