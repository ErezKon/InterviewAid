# 648. Replace Words

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/replace-words](https://leetcode.com/problems/replace-words)
**Companies:** Amazon, Google, Microsoft, Tiktok, Uber

---

## Problem Description
Given a list of root words `dictionary` and a sentence, replace every word in the sentence with the shortest root that is a prefix of that word. If no such root exists, keep the original word.

## Examples
- Input: `dictionary = ["cat","bat","rat"]`, `sentence = "the cattle was rattled by the battery"`
  → Output: `"the cat was rat by the bat"`.
- Input: `dictionary = ["a","aa","aaa","aaaa"]`, `sentence = "a aa a aaaa aaa aaa aaaaaa bbb baba ababa"`
  → Output: `"a a a a a a bbb baba a"`.

## Approach
Build a Trie from the dictionary roots, then for each word in the sentence, walk the Trie to find the shortest matching root.

```text
FUNCTION ReplaceWords(dictionary, sentence):
    // Build Trie
    SET trie ← {}
    FOR root IN dictionary:
        SET node ← trie
        FOR c IN root:
            IF c NOT IN node:
                node[c] ← {}
            SET node ← node[c]
        node['#'] ← root
    // Replace words
    SET result ← []
    FOR word IN SPLIT(sentence, " "):
        SET node ← trie
        SET replaced ← false
        FOR c IN word:
            IF c NOT IN node:
                BREAK
            SET node ← node[c]
            IF '#' IN node:
                APPEND node['#'] TO result
                SET replaced ← true
                BREAK
        IF NOT replaced:
            APPEND word TO result
    RETURN JOIN(result, " ")
```

## Walkthrough
| Word | Traversal | Replacement |
|------|-----------|-------------|
| "cattle" | c→a→t (found "cat") | "cat" |
| "rattled" | r→a→t (found "rat") | "rat" |
| "battery" | b→a→t (found "bat") | "bat" |
| "the" | t→h→e (no '#') | "the" |

## Complexity Analysis
- Time: O(N·L) where N is total characters in sentence and L is max root length.
- Space: O(T) for the Trie, where T is total characters in all roots.

## Follow‑Up Questions
1. How would you modify the algorithm to handle case‑insensitive matching?
2. Can you support dynamic updates to the dictionary (add/remove roots) efficiently?
3. What if you need to replace with the longest matching root instead of the shortest?

## Key Takeaway
A Trie enables fast prefix lookup, allowing each word to be replaced by its shortest root in linear time relative to the sentence length.
