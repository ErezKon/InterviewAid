# 1258. Synonymous Sentences

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/synonymous-sentences](https://leetcode.com/problems/synonymous-sentences)
**Companies:** Cruise Automation, Moveworks, Rippling

---

## Problem Description

> *Note: premium problem (statement checked against the official text with verify.py).*

You are given a list of equivalent string pairs `synonyms` where `synonyms[i] = [s_i, t_i]` indicates that `s_i` and `t_i` are equivalent strings. You are also given a sentence `text`.

Return *all possible synonymous sentences **sorted lexicographically***.

**Constraints:**
- `0 <= synonyms.length <= 10`
- `synonyms[i].length == 2`
- `1 <= s_i.length, t_i.length <= 10`
- `s_i != t_i`
- `text` consists of at most `10` words.
- All the pairs of `synonyms` are **unique**.
- The words of `text` are separated by single spaces.

## Examples

**Example 1:**
```
Input: synonyms = [["happy","joy"],["sad","sorrow"],["joy","cheerful"]], text = "I am happy today but was sad yesterday"
Output: ["I am cheerful today but was sad yesterday","I am cheerful today but was sorrow yesterday","I am happy today but was sad yesterday","I am happy today but was sorrow yesterday","I am joy today but was sad yesterday","I am joy today but was sorrow yesterday"]
```

**Example 2:**
```
Input: synonyms = [["happy","joy"],["cheerful","glad"]], text = "I am happy today but was sad yesterday"
Output: ["I am happy today but was sad yesterday","I am joy today but was sad yesterday"]
```

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
