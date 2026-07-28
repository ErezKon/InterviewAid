# 1258. Synonymous Sentences

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/synonymous-sentences](https://leetcode.com/problems/synonymous-sentences)
**Companies:** Cruise Automation, Moveworks, Rippling

---

## Problem Description
Given a list of synonym pairs and a sentence, generate all possible sentences by replacing any word with any of its synonyms. Each synonym pair indicates that the two words are interchangeable, and synonym relationships are transitive. The output sentences must be sorted lexicographically.

## Examples
**Example 1:**
```
Input: synonyms = [["happy","joy"],["sad","sorrow"]], text = "I am happy"
Output: ["I am happy", "I am joy"]
```
Explanation: "happy" can be replaced with its synonym "joy".

**Example 2:**
```
Input: synonyms = [["great","good"],["good","fine"]], text = "great day"
Output: ["fine day", "good day", "great day"]
```
Explanation: "great", "good", and "fine" form a synonym group.

## Approach
Use Union‑Find to group all synonyms into disjoint sets, then perform backtracking to generate every combination.

```text
FUNCTION generateSentences(synonyms, text):
    // Build Union‑Find structure
    uf ← UnionFind()
    FOR each pair IN synonyms:
        uf.UNION(pair[0], pair[1])

    // Map each root to all words in its group
    groups ← MAP from root TO SET of words
    FOR each pair IN synonyms:
        rootA ← uf.FIND(pair[0])
        rootB ← uf.FIND(pair[1])
        groups[rootA].ADD(pair[0])
        groups[rootA].ADD(pair[1])
        groups[rootB].ADD(pair[0])
        groups[rootB].ADD(pair[1])

    words ← SPLIT(text, ' ')
    result ← []

    FUNCTION backtrack(idx, path):
        IF idx == LENGTH(words):
            result.APPEND(JOIN(path, ' '))
            RETURN
        word ← words[idx]
        root ← uf.FIND(word)
        candidates ← groups.GET(root, {word})
        FOR each w IN SORTED(candidates):
            backtrack(idx + 1, path + [w])

    backtrack(0, [])
    RETURN result
```

## Walkthrough
| Step | Current word | Candidates | Path so far |
|------|--------------|------------|------------|
| 0 | "I" | {"I"} | [] → ["I"] |
| 1 | "am" | {"am"} | ["I"] → ["I","am"] |
| 2 | "happy" | {"happy","joy"} (sorted) | ["I","am"] → ["I","am","happy"] and ["I","am","joy"] |
| 3 | End | – | Add both sentences to result |

## Complexity Analysis
- Time: O(N · K) where N is the number of words and K is the total number of generated sentences.
- Space: O(N + G) for the Union‑Find structure, groups map, and recursion stack.

## Follow‑Up Questions
1. How would you modify the algorithm to handle large synonym groups efficiently?
2. Can you generate sentences in lexicographic order without sorting at each step?
3. How would you adapt the solution to support dynamic updates to the synonym list?

## Key Takeaway
Group synonyms with Union‑Find and then use backtracking to enumerate all sentence variations.
