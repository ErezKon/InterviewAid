# 527. Word Abbreviation

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/word-abbreviation](https://leetcode.com/problems/word-abbreviation)
**Companies:** Amazon, Applied Intuition, Google, Snapchat

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

Given an array of **distinct** strings `words`, return *the minimal possible **abbreviations** for every word*.

The following are the rules for a string abbreviation:

- The **initial** abbreviation for each word is: the first character, then the number of characters in between, followed by the last character.
- If more than one word shares the **same** abbreviation, then perform the following operation:

- **Increase** the prefix (characters in the first part) of each of their abbreviations by `1`.

- For example, say you start with the words `["abcdef","abndef"]` both initially abbreviated as `"a4f"`. Then, a sequence of operations would be `["a4f","a4f"]` -> `["ab3f","ab3f"]` -> `["abc2f","abn2f"]`.

- This operation is repeated until every abbreviation is **unique**.

- At the end, if an abbreviation did not make a word shorter, then keep it as the original word.

**Constraints:**
- `1 <= words.length <= 400`
- `2 <= words[i].length <= 400`
- `words[i]` consists of lowercase English letters.
- All the strings of `words` are **unique**.

## Examples

**Example 1:**
```
Input: words = ["like","god","internal","me","internet","interval","intension","face","intrusion"]
Output: ["l2e","god","internal","me","i6t","interval","inte4n","f2e","intr4n"]
```

**Example 2:**
```
Input: words = ["aa","aaa"]
Output: ["aa","aaa"]
```

## Approach
Iteratively resolve conflicts:
1. Start with prefix length `k = 1` for all words and compute their abbreviations.
2. Group words by identical abbreviation.
3. For each group with more than one word, increment `k` for those words and recompute their abbreviations.
4. Repeat until all abbreviations are unique.
The helper `abbr(word, k)` returns the abbreviation using prefix length `k` (or the original word if it would not shorten).

```text
FUNCTION wordsAbbreviation(words):
    SET n ← LENGTH(words)
    SET prefixLen[0..n-1] ← 1
    SET result[i] ← abbr(words[i], 1) FOR i FROM 0 TO n-1
    WHILE true:
        SET groups ← MAP from abbreviation TO list of indices
        FOR i FROM 0 TO n-1:
            ADD i TO groups[result[i]]
        SET changed ← false
        FOR each (abbr, idxList) IN groups:
            IF LENGTH(idxList) > 1:
                FOR idx IN idxList:
                    SET prefixLen[idx] ← prefixLen[idx] + 1
                    SET result[idx] ← abbr(words[idx], prefixLen[idx])
                    SET changed ← true
        IF NOT changed: BREAK
    RETURN result

FUNCTION abbr(word, k):
    IF LENGTH(word) - k <= 2:
        RETURN word
    SET count ← LENGTH(word) - k - 1
    RETURN SUBSTRING(word, 0, k) + STRING(count) + LAST CHARACTER of word
```

## Walkthrough
| Word | k | Abbreviation |
|------|---|--------------|
| "internal" | 1 | "i6l" |
| "internet" | 1 | "i6t" |
| Conflict? No |
| After first pass, "interval" also yields "i6l" → conflict |
| Increment k for "interval" to 2 → "in5l" (now unique) |
| Continue until all unique.

## Complexity Analysis
- Time: O(m · n) where *n* is number of words and *m* is average word length (due to repeated abbreviation recomputation). In practice fast because conflicts resolve quickly.
- Space: O(n) for prefix lengths and result array.

## Follow‑Up Questions
- How would you adapt the algorithm to handle very large dictionaries efficiently?
- Can you guarantee a bound on the maximum prefix length needed?
- What if abbreviations must also be lexicographically minimal?

## Key Takeaway
Iteratively increasing prefix lengths for colliding words yields a set of minimal unique abbreviations.
