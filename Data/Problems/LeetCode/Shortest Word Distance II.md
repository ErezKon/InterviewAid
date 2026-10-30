# 244. Shortest Word Distance II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/shortest-word-distance-ii](https://leetcode.com/problems/shortest-word-distance-ii)
**Companies:** Anduril, Google, Linkedin, Palantir

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

Design a data structure that will be initialized with a string array, and then it should answer queries of the shortest distance between two different strings from the array.

Implement the `WordDistance` class:

- `WordDistance(String[] wordsDict)` initializes the object with the strings array `wordsDict`.
- `int shortest(String word1, String word2)` returns the shortest distance between `word1` and `word2` in the array `wordsDict`.

**Constraints:**
- `1 <= wordsDict.length <= 3 * 10^4`
- `1 <= wordsDict[i].length <= 10`
- `wordsDict[i]` consists of lowercase English letters.
- `word1` and `word2` are in `wordsDict`.
- `word1 != word2`
- At most `5000` calls will be made to `shortest`.

**Examples:**

**Example 1:**
```
Input
["WordDistance", "shortest", "shortest"]
[[["practice", "makes", "perfect", "coding", "makes"]], ["coding", "practice"], ["makes", "coding"]]
Output:
[null, 3, 1]
Explanation:
WordDistance wordDistance = new WordDistance(["practice", "makes", "perfect", "coding", "makes"]);
wordDistance.shortest("coding", "practice"); // return 3
wordDistance.shortest("makes", "coding");    // return 1
```

---

## Approach: Precompute Index Lists + Two Pointer — O(n) init, O(m+p) per query ✅

Store a map from each word to its sorted list of indices. For a query, merge-scan both lists with two pointers, always advancing the pointer at the smaller index.

```
CLASS WordDistance:
    CONSTRUCTOR(wordsDict):
        indices = defaultdict(list)
        FOR i, word IN enumerate(wordsDict):
            indices[word].ADD(i)

    FUNCTION shortest(word1, word2):
        list1 = indices[word1]
        list2 = indices[word2]
        i = j = 0
        minDist = infinity
        WHILE i < len(list1) AND j < len(list2):
            minDist = MIN(minDist, ABS(list1[i] - list2[j]))
            IF list1[i] < list2[j]: i += 1
            ELSE: j += 1
        RETURN minDist
```

### Walkthrough — `shortest("coding", "practice")`

`indices["coding"] = [3]`, `indices["practice"] = [0]`

| i | j | list1[i] | list2[j] | dist | minDist |
|---|---|----------|----------|------|---------|
| 0 | 0 | 3        | 0        | 3    | 3       |

Result: `3`

| Operation | Time | Space |
|-----------|------|-------|
| Constructor | O(n) | O(n) |
| shortest | O(m + p) | O(1) |

---

## Follow-up

- See **Shortest Word Distance** (LC 243) for the single-query version.
- See **Shortest Word Distance III** (LC 245) where `word1 == word2` is allowed.
