# 745. Prefix and Suffix Search

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/prefix-and-suffix-search](https://leetcode.com/problems/prefix-and-suffix-search)
**Companies:** Google, Meta, Microsoft

---

## Problem Description

Design a special dictionary that searches the words in it by a prefix and a suffix.

Implement the `WordFilter` class:

- `WordFilter(string[] words)` Initializes the object with the `words` in the dictionary.
- `f(string pref, string suff)` Returns *the index of the word in the dictionary,* which has the prefix `pref` and the suffix `suff`. If there is more than one valid index, return **the largest** of them. If there is no such word in the dictionary, return `-1`.

**Constraints:**
- `1 <= words.length <= 10^4`
- `1 <= words[i].length <= 7`
- `1 <= pref.length, suff.length <= 7`
- `words[i]`, `pref` and `suff` consist of lowercase English letters only.
- At most `10^4` calls will be made to the function `f`.

## Examples

**Example 1:**
```
Input
["WordFilter", "f"]
[[["apple"]], ["a", "e"]]
Output
[null, 0]
Explanation
WordFilter wordFilter = new WordFilter(["apple"]);
wordFilter.f("a", "e"); // return 0, because the word at index 0 has prefix = "a" and suffix = "e".
```

## Approach
**Algorithm:** Build a combined suffix‑prefix trie (wrapped trie) where each inserted string is `suffix + "#" + word`. For each word, insert all possible suffixes concatenated with the whole word, storing the word's index at each node. Query by traversing the trie with `suffix + "#" + prefix`.
**Key Insight:** By encoding every possible suffix of a word together with the full word, a single trie lookup can simultaneously enforce both prefix and suffix constraints.

```text
CLASS WordFilter:
    CONSTRUCTOR(words):
        trie ← EMPTY NODE
        FOR index, word IN ENUMERATE(words):
            // Insert all suffixes of the word combined with the word itself
            combined ← word + "#" + word
            FOR i ← 0 TO LENGTH(word):
                node ← trie
                FOR c IN combined[i:]:
                    IF c NOT IN node.children:
                        node.children[c] ← NEW NODE
                    node ← node.children[c]
                    node.weight ← index   // store latest (largest) index

    FUNCTION f(prefix, suffix):
        node ← trie
        queryStr ← suffix + "#" + prefix
        FOR c IN queryStr:
            IF c NOT IN node.children:
                RETURN -1
            node ← node.children[c]
        RETURN node.weight
```

## Walkthrough
For `words = ["apple"]` (index 0):
- Insert `"apple#apple"` and all its suffix‑starting positions:
  - i=0 → insert full string.
  - i=1 → insert `"pple#apple"`.
  - … i=5 → insert `"#apple"`.
All nodes along each insertion path store `weight = 0`.
Query `f("ap", "le")` builds `"le#ap"` and follows the trie; the final node holds weight 0, so the answer is 0.

## Complexity Analysis
- **Time (build):** O(N·L²) where N is number of words and L is average word length (each word contributes O(L²) insertions).
- **Time (query):** O(L) where L = len(prefix) + len(suffix).
- **Space:** O(N·L²) for the trie nodes.

## Follow‑Up Questions
1. How can the construction be optimized to O(N·L) using a suffix‑prefix map instead of a full trie?
2. Can the data structure support dynamic insertion of new words after initialization?
3. What modifications are needed to handle Unicode characters or case‑insensitive matching?

## Key Takeaway
Encoding every possible suffix together with the full word in a single trie enables constant‑time lookup of the highest‑indexed word matching both a given prefix and suffix.
