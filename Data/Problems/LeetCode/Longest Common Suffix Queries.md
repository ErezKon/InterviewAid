# 3093. Longest Common Suffix Queries

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/longest-common-suffix-queries](https://leetcode.com/problems/longest-common-suffix-queries)
**Companies:** Google

---

## 1. Problem Description

You are given two arrays of strings `wordsContainer` and `wordsQuery`.

For each `wordsQuery[i]`, you need to find a string from `wordsContainer` that has the **longest common suffix** with `wordsQuery[i]`. If there are two or more strings in `wordsContainer` that share the longest common suffix, find the string that is the **smallest** in length. If there are two or more such strings that have the **same** smallest length, find the one that occurred **earlier** in `wordsContainer`.

Return *an array of integers *`ans`*, where *`ans[i]`* is the index of the string in *`wordsContainer`* that has the **longest common suffix** with *`wordsQuery[i]`*.*

**Constraints:**
- `1 <= wordsContainer.length, wordsQuery.length <= 10^4`
- `1 <= wordsContainer[i].length <= 5 * 10^3`
- `1 <= wordsQuery[i].length <= 5 * 10^3`
- `wordsContainer[i]` consists only of lowercase English letters.
- `wordsQuery[i]` consists only of lowercase English letters.
- Sum of `wordsContainer[i].length` is at most `5 * 10^5`.
- Sum of `wordsQuery[i].length` is at most `5 * 10^5`.

## 2. Examples

**Example 1:**
```
Input: wordsContainer = ["abcd","bcd","xbcd"], wordsQuery = ["cd","bcd","xyz"]
Output: [1,1,1]
Explanation: Let's look at each wordsQuery[i] separately:
- For wordsQuery[0] = "cd", strings from wordsContainer that share the longest common suffix "cd" are at indices 0, 1, and 2. Among these, the answer is the string at index 1 because it has the shortest length of 3.
- For wordsQuery[1] = "bcd", strings from wordsContainer that share the longest common suffix "bcd" are at indices 0, 1, and 2. Among these, the answer is the string at index 1 because it has the shortest length of 3.
- For wordsQuery[2] = "xyz", there is no string from wordsContainer that shares a common suffix. Hence the longest common suffix is "", that is shared with strings at index 0, 1, and 2. Among these, the answer is the string at index 1 because it has the shortest length of 3.
```

**Example 2:**
```
Input: wordsContainer = ["abcdefgh","poiuygh","ghghgh"], wordsQuery = ["gh","acbfgh","acbfegh"]
Output: [2,0,2]
Explanation: Let's look at each wordsQuery[i] separately:
- For wordsQuery[0] = "gh", strings from wordsContainer that share the longest common suffix "gh" are at indices 0, 1, and 2. Among these, the answer is the string at index 2 because it has the shortest length of 6.
- For wordsQuery[1] = "acbfgh", only the string at index 0 shares the longest common suffix "fgh". Hence it is the answer, even though the string at index 2 is shorter.
- For wordsQuery[2] = "acbfegh", strings from wordsContainer that share the longest common suffix "gh" are at indices 0, 1, and 2. Among these, the answer is the string at index 2 because it has the shortest length of 6.
```

## 3. Approach: Reverse Trie — O(n·L) ✅

```
FUNCTION buildTrie(words):
    root ← new Node()
    FOR idx, w IN ENUMERATE(words):
        node ← root
        FOR ch IN REVERSE(w):
            IF ch NOT IN node.children:
                node.children[ch] ← new Node()
            node ← node.children[ch]
            // Update best candidate at this node
            UPDATE node.best WITH (length_of_w, idx) USING tie‑break rules
    RETURN root

FUNCTION queryTrie(root, q):
    node ← root; best ← -1
    FOR ch IN REVERSE(q):
        IF ch NOT IN node.children: BREAK
        node ← node.children[ch]
        best ← node.best
    RETURN best.index
```

| Time | Space |
|------|-------|
| O(n·L) for build + O(q·L) for queries | O(n·L) |

## 4. Walkthrough

Consider `wordsContainer = ["time", "me", "bell"]` and query `"me"`.
1. Build trie on reversed container words: "emit", "em", "lleb".
2. At each node store the shortest word index with deepest depth.
3. Query "me" reversed → "em". Traversal reaches node for "em" which holds best candidate index 1 (word "me").
4. No longer suffix found, so answer is 1.

## 5. Complexity Analysis

- **Time**: Building the trie O(N·L) where N is number of container words and L average length. Each query processed in O(L).
- **Space**: Trie stores at most N·L characters → O(N·L).

## 6. Follow-Up Questions

- How would you modify the solution to support dynamic insertions/deletions in the container?
- Can you extend the approach to find longest common *prefix* queries?
- What if ties are broken by lexicographic order instead of index?

## 7. Key Takeaway

> Reverse all words and build a trie. Longest common suffix = longest common prefix of reversed strings. Store the best candidate at each node for O(L) per query.