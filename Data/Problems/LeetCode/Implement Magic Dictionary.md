# 676. Implement Magic Dictionary

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/implement-magic-dictionary](https://leetcode.com/problems/implement-magic-dictionary)

**Companies:** Bloomberg, Google
---

## 1. Problem Description

Design a data structure that is initialized with a list of **different** words. Provided a string, you should determine if you can change exactly one character in this string to match any word in the data structure.

Implement the `MagicDictionary` class:

- `MagicDictionary()` Initializes the object.
- `void buildDict(String[] dictionary)` Sets the data structure with an array of distinct strings `dictionary`.
- `bool search(String searchWord)` Returns `true` if you can change **exactly one character** in `searchWord` to match any string in the data structure, otherwise returns `false`.

**Constraints:**
- `1 <= dictionary.length <= 100`
- `1 <= dictionary[i].length <= 100`
- `dictionary[i]` consists of only lower-case English letters.
- All the strings in `dictionary` are **distinct**.
- `1 <= searchWord.length <= 100`
- `searchWord` consists of only lower-case English letters.
- `buildDict` will be called only once before `search`.
- At most `100` calls will be made to `search`.

## 2. Examples

**Example 1:**
```
Input
["MagicDictionary", "buildDict", "search", "search", "search", "search"]
[[], [["hello", "leetcode"]], ["hello"], ["hhllo"], ["hell"], ["leetcoded"]]
Output:
[null, null, false, true, false, false]
Explanation:
MagicDictionary magicDictionary = new MagicDictionary();
magicDictionary.buildDict(["hello", "leetcode"]);
magicDictionary.search("hello"); // return False
magicDictionary.search("hhllo"); // We can change the second 'h' to 'e' to match "hello" so we return True
magicDictionary.search("hell"); // return False
magicDictionary.search("leetcoded"); // return False
```

## 3. Approach

**Brute Force Compare — O(n·k)** ✅

```
FUNCTION buildDict(dictionary):
    SET self.words ← dictionary

FUNCTION search(searchWord):
    FOR w IN self.words:
        IF LENGTH(w) ≠ LENGTH(searchWord): CONTINUE
        SET diff ← 0
        FOR i ← 0 TO LENGTH(w)-1:
            IF w[i] ≠ searchWord[i]:
                SET diff ← diff + 1
                IF diff > 1: BREAK
        IF diff = 1: RETURN true
    RETURN false
```

*Insight*: Only words of equal length need comparison; count mismatched characters and accept exactly one.

## 4. Walkthrough

Consider dictionary `["hello","leetcode"]` and `searchWord = "hhllo"`.
1. Compare with "hello": mismatches at positions 1 (`e` vs `h`). diff = 1 → return true.
2. No need to check further words.

## 5. Complexity Analysis

- **Time**: O(n·k) where *n* is number of stored words and *k* is word length.
- **Space**: O(1) extra beyond storing the dictionary.

## 6. Follow‑Up Questions

- How would you improve the search to O(k) using a Trie with one‑mismatch DFS?
- How to support multiple character modifications?
- How to handle large dictionaries efficiently?

## Key Takeaway

> For each dictionary word of same length, count character differences. Exactly one difference = match. Alternative: Trie with one‑mismatch DFS.
