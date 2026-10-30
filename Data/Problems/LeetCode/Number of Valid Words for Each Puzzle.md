# 1178. Number of Valid Words for Each Puzzle

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/number-of-valid-words-for-each-puzzle](https://leetcode.com/problems/number-of-valid-words-for-each-puzzle)
**Companies:** Dropbox

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#examples)
3. [Approach: Bitmask Subset Enumeration — O(W + P · 2⁷)](#approach)
4. [Walkthrough](#walkthrough)
5. [Complexity Analysis](#complexity-analysis)
6. [Follow-Up Questions](#follow-up-questions)
7. [Key Takeaway](#key-takeaway)

---

## 1. Problem Description

With respect to a given `puzzle` string, a `word` is *valid* if both the following conditions are satisfied:

- `word` contains the first letter of `puzzle`.
- For each letter in `word`, that letter is in `puzzle`.

- For example, if the puzzle is `"abcdefg"`, then valid words are `"faced"`, `"cabbage"`, and `"baggage"`, while
- invalid words are `"beefed"` (does not include `'a'`) and `"based"` (includes `'s'` which is not in the puzzle).

Return *an array *`answer`*, where *`answer[i]`* is the number of words in the given word list *`words`* that is valid with respect to the puzzle *`puzzles[i]`.

**Constraints:**
- `1 <= words.length <= 10^5`
- `4 <= words[i].length <= 50`
- `1 <= puzzles.length <= 10^4`
- `puzzles[i].length == 7`
- `words[i]` and `puzzles[i]` consist of lowercase English letters.
- Each `puzzles[i] `does not contain repeated characters.

---

## Examples

**Example 1:**
```
Input: words = ["aaaa","asas","able","ability","actt","actor","access"], puzzles = ["aboveyz","abrodyz","abslute","absoryz","actresz","gaswxyz"]
Output: [1,1,3,2,4,0]
Explanation: 1 valid word for "aboveyz" : "aaaa"
1 valid word for "abrodyz" : "aaaa"
3 valid words for "abslute" : "aaaa", "asas", "able"
2 valid words for "absoryz" : "aaaa", "asas"
4 valid words for "actresz" : "aaaa", "asas", "actt", "access"
There are no valid words for "gaswxyz" cause none of the words in the list contains letter 'g'.
```

**Example 2:**
```
Input: words = ["apple","pleas","please"], puzzles = ["aelwxyz","aelpxyz","aelpsxy","saelpxy","xaelpsy"]
Output: [0,1,3,2,0]
```

---

## Approach: Bitmask Subset Enumeration — O(W + P · 2⁷)

```text
FUNCTION findNumOfValidWords(words, puzzles):
    // Build a frequency map of word bitmasks
    wordMasks ← Counter(bitmask(w) for w in words)
    result ← []
    FOR puzzle IN puzzles:
        mask ← bitmask(puzzle)               // 26‑bit integer
        firstBit ← 1 << (puzzle[0] - 'a')    // bit of the first letter
        count ← 0
        submask ← mask
        WHILE submask > 0:
            IF submask & firstBit != 0:
                count ← count + wordMasks[submask]
            submask ← (submask - 1) & mask   // next submask
        result.APPEND(count)
    RETURN result
```

---

## Walkthrough

Consider the first example puzzle "aboveyz":
| Step | Action | Explanation |
|------|--------|-------------|
| 1 | Convert puzzle to bitmask | `mask = 0b...` representing letters a,b,o,v,e,y,z |
| 2 | Identify first‑letter bit | `firstBit` corresponds to 'a' |
| 3 | Enumerate submasks (≤128) | Loop over all subsets of the 7 letters |
| 4 | Check inclusion of first bit | Only submasks containing 'a' are considered |
| 5 | Look up submask in `wordMasks` | Only submask representing "aaaa" exists, count = 1 |
The same process repeats for each puzzle, yielding the final output `[1,1,3,2,4]`.

---

## Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(W + P · 2⁷) – building word masks plus enumerating at most 128 submasks per puzzle |
| **Space** | O(W) for the word‑mask frequency map |

---

## Follow-Up Questions

1. How would the solution change if puzzles could contain up to 10 letters?
2. Can you adapt the algorithm to return the actual list of valid words for each puzzle instead of just the count?
3. What alternative data structures (e.g., Trie) could be used to solve this problem, and what trade‑offs would they introduce?

---

## Key Takeaway

> **Bitmask + submask enumeration.** Puzzles have exactly 7 unique letters → only 128 submasks. Enumerate submasks containing the first letter and look up word counts.
