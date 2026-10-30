# 648. Replace Words

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/replace-words](https://leetcode.com/problems/replace-words)
**Companies:** Amazon, Google, Microsoft, Tiktok, Uber

---

## Problem Description

In English, we have a concept called **root**, which can be followed by some other word to form another longer word - let's call this word **derivative**. For example, when the **root** `"help"` is followed by the word `"ful"`, we can form a derivative `"helpful"`.

Given a `dictionary` consisting of many **roots** and a `sentence` consisting of words separated by spaces, replace all the derivatives in the sentence with the **root** forming it. If a derivative can be replaced by more than one **root**, replace it with the **root** that has **the shortest length**.

Return *the `sentence`* after the replacement.

**Constraints:**
- `1 <= dictionary.length <= 1000`
- `1 <= dictionary[i].length <= 100`
- `dictionary[i]` consists of only lower-case letters.
- `1 <= sentence.length <= 10^6`
- `sentence` consists of only lower-case letters and spaces.
- The number of words in `sentence` is in the range `[1, 1000]`
- The length of each word in `sentence` is in the range `[1, 1000]`
- Every two consecutive words in `sentence` will be separated by exactly one space.
- `sentence` does not have leading or trailing spaces.

## Examples

**Example 1:**
```
Input: dictionary = ["cat","bat","rat"], sentence = "the cattle was rattled by the battery"
Output: "the cat was rat by the bat"
```

**Example 2:**
```
Input: dictionary = ["a","b","c"], sentence = "aadsfasf absbs bbab cadsfafs"
Output: "a a b c"
```

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
