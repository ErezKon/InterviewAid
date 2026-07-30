# 1554. Strings Differ by One Character

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/strings-differ-by-one-character](https://leetcode.com/problems/strings-differ-by-one-character)
**Companies:** Airbnb

---

## Problem Description
Given an array of strings `words` where each string has the same length, determine if there exist two distinct strings that differ by exactly one character at the same position. Return `true` if such a pair exists, otherwise `false`.

## Examples
- **Input:** `words = ["abcd","acbd","aacd"]` **Output:** `true`
  // "abcd" and "acbd" differ at the second character.
- **Input:** `words = ["abc","def","ghi"]` **Output:** `false`
- **Input:** `words = ["aaa","aba","aab"]` **Output:** `true`

## Approach
**Algorithm:** Use a hash set of masked strings.
- **Insight:** For each word, generate all possible masks by replacing one character with a placeholder (e.g., `*`). If any mask has been seen before, two words share the same mask, meaning they differ by exactly one character.
- Iterate through words, for each position create a masked version and check the set.

### Pseudocode
```text
FUNCTION differByOne(words):
    CREATE empty set seenMasks
    FOR each word IN words:
        FOR i FROM 0 TO LENGTH(word)-1:
            mask ← word[0:i] + '*' + word[i+1:]
            IF mask IN seenMasks:
                RETURN true
            ADD mask TO seenMasks
    RETURN false
```

## Walkthrough
For `words = ["abcd","acbd","aacd"]`:
1. Process "abcd": masks `*bcd`, `a*cd`, `ab*d`, `abc*` → added to set.
2. Process "acbd": mask `*cbd` not seen, `a*bd` not seen, `ac*d` matches mask `ab*d`? No, different. `acb*` not seen.
3. Process "aacd": mask `*acd` matches previously generated mask `*bcd`? No. `a*cd` matches mask from "abcd" (`a*cd`) → found duplicate → return true.

## Complexity Analysis
- **Time:** O(n·L) where n is number of words and L is word length (generate L masks per word).
- **Space:** O(n·L) for storing masks.

## Follow‑Up Questions
- How would you adapt the solution if the strings could have different lengths?
- Can you solve the problem in O(n·L) time without extra space by sorting masked strings?
- What changes are needed to find all pairs that differ by exactly one character?

## Key Takeaway
Masking each position with a placeholder and checking for duplicates quickly identifies a pair of strings that differ by exactly one character.
