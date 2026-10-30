# 953. Verifying an Alien Dictionary

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/verifying-an-alien-dictionary](https://leetcode.com/problems/verifying-an-alien-dictionary)
**Companies:** Amazon, Anduril, Apple, Bloomberg, Google, Meta, Uber, Wix

---

## Problem Description

In an alien language, surprisingly, they also use English lowercase letters, but possibly in a different `order`. The `order` of the alphabet is some permutation of lowercase letters.

Given a sequence of `words` written in the alien language, and the `order` of the alphabet, return `true` if and only if the given `words` are sorted lexicographically in this alien language.

**Constraints:**
- `1 <= words.length <= 100`
- `1 <= words[i].length <= 20`
- `order.length == 26`
- All characters in `words[i]` and `order` are English lowercase letters.

## Examples

**Example 1:**
```
Input: words = ["hello","leetcode"], order = "hlabcdefgijkmnopqrstuvwxyz"
Output: true
Explanation: As 'h' comes before 'l' in this language, then the sequence is sorted.
```

**Example 2:**
```
Input: words = ["word","world","row"], order = "worldabcefghijkmnpqstuvxyz"
Output: false
Explanation: As 'd' comes after 'l' in this language, then words[0] > words[1], hence the sequence is unsorted.
```

**Example 3:**
```
Input: words = ["apple","app"], order = "abcdefghijklmnopqrstuvwxyz"
Output: false
Explanation: The first three characters "app" match, and the second string is shorter (in size.) According to lexicographical rules "apple" > "app", because 'l' > '∅', where '∅' is defined as the blank character which is less than any other character.
```

## Approach
Create a mapping from each character to its rank in the alien alphabet. Compare each adjacent pair of words character by character using the rank map. If a mismatch is found where the first word's character rank is greater, the list is unsorted. If one word is a prefix of the other, the shorter word should come first.

```text
FUNCTION isAlienSorted(words, order):
    rank ← MAP each char in order to its index
    FOR i FROM 0 TO LENGTH(words) - 2:
        IF NOT inOrder(words[i], words[i+1], rank):
            RETURN false
    RETURN true

FUNCTION inOrder(w1, w2, rank):
    FOR j FROM 0 TO MIN(LENGTH(w1), LENGTH(w2)) - 1:
        IF w1[j] ≠ w2[j]:
            RETURN rank[w1[j]] ≤ rank[w2[j]]
    RETURN LENGTH(w1) ≤ LENGTH(w2)
```

## Walkthrough
| Step | w1 | w2 | Comparison | Result |
|------|----|----|------------|--------|
| 1 | "hello" | "leetcode" | 'h' vs 'l' → rank 0 < 1 | continue |
| 2 | end of w1 prefix check → lengths ok | → sorted |
| 3 | "word" vs "world" | first three letters equal, compare 'd' vs 'l' → rank 15 > 11 | return false |

## Complexity Analysis
- **Time:** O(N * L) where N is number of words and L is average word length.
- **Space:** O(1) extra space for the rank map of size 26.

## Follow‑Up Questions
1. How would you handle duplicate words?
2. Can the algorithm be extended to support Unicode characters?
3. What if the alien order is given as a list of pairs instead of a full string?

## Key Takeaway
Mapping each alien character to its rank lets you compare words in linear time, turning the problem into a standard lexicographic check.
