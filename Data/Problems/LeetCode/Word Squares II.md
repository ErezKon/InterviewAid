# 3799. Word Squares II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/word-squares-ii](https://leetcode.com/problems/word-squares-ii)
**Companies:** Oracle

---

## Problem Description

You are given a string array `words`, consisting of **distinct** 4-letter strings, each containing lowercase English letters.

A **word square** consists of 4 **distinct** words: `top`, `left`, `right` and `bottom`, arranged as follows:

- `top` forms the **top row**.
- `bottom` forms the **bottom row**.
- `left` forms the **left column** (top to bottom).
- `right` forms the **right column** (top to bottom).

It must satisfy:

- `top[0] == left[0]`, `top[3] == right[0]`
- `bottom[0] == left[3]`, `bottom[3] == right[3]`

Return all valid **distinct** word squares, sorted in **ascending lexicographic** order by the 4-tuple `(top, left, right, bottom)`.

**Constraints:**
- `4 <= words.length <= 15`
- `words[i].length == 4`
- `words[i]` consists of only lowercase English letters.
- All `words[i]` are **distinct**.

## Examples

**Example 1:**
```
Input: words = ["able","area","echo","also"]
Output: [["able","area","echo","also"],["area","able","also","echo"]]
Explanation: There are exactly two valid 4-word squares that satisfy all corner constraints:
- "able" (top), "area" (left), "echo" (right), "also" (bottom)
- top[0] == left[0] == 'a'
- top[3] == right[0] == 'e'
- bottom[0] == left[3] == 'a'
- bottom[3] == right[3] == 'o'
- "area" (top), "able" (left), "also" (right), "echo" (bottom)
- All corner constraints are satisfied.
Thus, the answer is [["able","area","echo","also"],["area","able","also","echo"]].
```

**Example 2:**
```
Input: words = ["code","cafe","eden","edge"]
Output: []
Explanation: No combination of four words satisfies all four corner constraints. Thus, the answer is empty array [].
```

## Approach
Use backtracking with a prefix‑hash map. For each partial square, the next word must have a prefix matching the characters in the current column position.

```text
FUNCTION buildWordSquares(words):
    SET n ← LENGTH(words[0])
    CREATE prefixMap ← MAP FROM prefix TO LIST OF words
    FOR each word IN words:
        FOR i FROM 0 TO n:
            SET prefix ← SUBSTRING(word, 0, i)
            ADD word TO prefixMap[prefix]
    SET results ← []
    FOR each word IN words:
        CALL backtrack([word], n, prefixMap, results)
    RETURN results

FUNCTION backtrack(square, n, prefixMap, results):
    IF LENGTH(square) = n:
        APPEND COPY(square) TO results
        RETURN
    SET idx ← LENGTH(square)
    SET prefix ← ""
    FOR each w IN square:
        SET prefix ← prefix + w[idx]
    FOR each candidate IN prefixMap.get(prefix, []):
        APPEND candidate TO square
        CALL backtrack(square, n, prefixMap, results)
        REMOVE LAST(square)
```

## Walkthrough
For the first example, start with "wall". The required prefix for the second word is "a" (second column). Candidates with prefix "a" are "area". Continue building until a full square of size 4 is formed.

## Complexity Analysis
- Time: O(m * n * 26) in practice, where `m` is number of words and `n` is word length, due to prefix lookups and backtracking.
- Space: O(m * n) for the prefix map and recursion stack.

## Follow‑Up Questions
1. How would you adapt the solution for words of varying lengths?
2. Can you improve performance by using a Trie instead of a hash map for prefix queries?
3. How would you generate word squares when the input list is extremely large (e.g., streaming words)?

## Key Takeaway
Backtracking combined with a prefix map efficiently prunes invalid candidates, enabling construction of all valid word squares.
