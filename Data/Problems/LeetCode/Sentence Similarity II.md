# 737. Sentence Similarity II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sentence-similarity-ii](https://leetcode.com/problems/sentence-similarity-ii)
**Companies:** Amazon, Apple, Google, Rippling

---

## Problem Description

We can represent a sentence as an array of words, for example, the sentence `"I am happy with leetcode"` can be represented as `arr = ["I","am","happy","with","leetcode"]`.

Given two sentences `sentence1` and `sentence2` each represented as a string array and given an array of string pairs `similarPairs` where `similarPairs[i] = [xi, yi]` indicates that the two words `xi` and `yi` are similar.

Return `true` *if* `sentence1` *and* `sentence2` *are similar, or* `false` *if they are not similar*.

Two sentences are similar if:

- They have **the same length** (i.e., the same number of words)
- `sentence1[i]` and `sentence2[i]` are similar.

Notice that a word is always similar to itself, also notice that the similarity relation is transitive. For example, if the words `a` and `b` are similar, and the words `b` and `c` are similar, then `a` and `c` are **similar**.

**Constraints:**

- `1 <= sentence1.length, sentence2.length <= 1000`
- `1 <= sentence1[i].length, sentence2[i].length <= 20`
- `sentence1[i]` and `sentence2[i]` consist of lower-case and upper-case English letters.
- `0 <= similarPairs.length <= 2000`
- `similarPairs[i].length == 2`
- `1 <= xi.length, yi.length <= 20`
- `xi` and `yi` consist of English letters.

---

## Examples

```
Example 1:
  Input: sentence1 = ["great","acting","skills"], sentence2 = ["fine","drama","talent"], similarPairs = [["great","good"],["fine","good"],["drama","acting"],["skills","talent"]]
  Output: true
  Explanation: The two sentences have the same length and each word i of sentence1 is also similar to the corresponding word in sentence2.
```

```
Example 2:
  Input: sentence1 = ["I","love","leetcode"], sentence2 = ["I","love","onepiece"], similarPairs = [["manga","onepiece"],["platform","anime"],["leetcode","platform"],["anime","manga"]]
  Output: true
  Explanation: "leetcode" --> "platform" --> "anime" --> "manga" --> "onepiece".
  Since "leetcode" is similar to "onepiece" and the first two words are the same, the two sentences are similar.
```

```
Example 3:
  Input: sentence1 = ["I","love","leetcode"], sentence2 = ["I","love","onepiece"], similarPairs = [["manga","hunterXhunter"],["platform","anime"],["leetcode","platform"],["anime","manga"]]
  Output: false
  Explanation: "leetcode" is not similar to "onepiece".
```

---

## Approach: Union-Find — O(P + N)

```text
FUNCTION areSentencesSimilarTwo(sentence1, sentence2, similarPairs):
    IF LENGTH(sentence1) ≠ LENGTH(sentence2):
        RETURN false
    // Build Union-Find structure for all words
    uf ← NEW UnionFind()
    FOR each pair [a, b] IN similarPairs:
        uf.union(a, b)
    // Verify each position
    FOR i ← 0 TO LENGTH(sentence1) - 1:
        w1 ← sentence1[i]
        w2 ← sentence2[i]
        IF w1 = w2: CONTINUE
        IF NOT uf.connected(w1, w2):
            RETURN false
    RETURN true
```

---

## Walkthrough

| Index | word1 | word2 | Same? | Union-Find Check |
|------|-------|-------|-------|------------------|
| 0 | great | fine | No | great ↔ good ↔ fine → connected → true |
| 1 | acting | drama | No | acting ↔ drama → connected → true |
| 2 | skills | talent | No | skills ↔ talent → connected → true |

All positions pass, so the sentences are similar.

---

## Complexity Analysis

- **Time:** O(P + N) – building unions for P pairs and checking N word positions.
- **Space:** O(P) – Union-Find parent map for distinct words.

---

## Follow-Up Questions

1. How would you handle case-insensitive word comparison?
2. Can you solve it without extra space by using a hashmap of equivalence classes?
3. What if the similarity relation were not transitive – how would the algorithm change?

---

## Key Takeaway

> Transitive word similarity can be modeled as connected components in an undirected graph; Union-Find efficiently builds and queries these components.
