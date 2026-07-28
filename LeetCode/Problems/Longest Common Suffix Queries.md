# 3093. Longest Common Suffix Queries

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/longest-common-suffix-queries](https://leetcode.com/problems/longest-common-suffix-queries)
**Companies:** Google

---

## 1. Problem Description

Given `wordsContainer` and `wordsQuery`, for each query find the word in the container with the longest common suffix. Ties broken by shortest length, then smallest index.

## 2. Examples

| wordsContainer | wordsQuery | Output |
|----------------|------------|--------|
| ["time", "me", "bell"] | ["time", "bell", "me"] | [0,2,1] |
| ["abc", "def"] | ["ghi"] | [-1] |

*Explanation*: For each query we compare suffixes with all container words and select the best according to the rules.

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