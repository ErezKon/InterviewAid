# 1451. Rearrange Words in a Sentence

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/rearrange-words-in-a-sentence](https://leetcode.com/problems/rearrange-words-in-a-sentence)
**Companies:** Expedia, Microsoft

---

## Problem Description
Given a sentence consisting of words separated by a single space, where the first word is capitalized and the rest are lowercase, return a new sentence where the words are ordered by increasing length. The first word of the result should be capitalized and the others lowercase.

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| "Leetcode is cool" | "Is cool leetcode" | Lengths: 8, 2, 4 → ordered as 2,4,8; capitalize first word. |
| "Keep calm and code on" | "On and keep calm code" | Sorted by length: 2,3,4,4,5.

## Approach
1. Split the sentence into words.
2. Convert all words to lowercase, then sort them by length (stable to preserve original order for equal lengths).
3. Capitalize the first word of the sorted list.
4. Join the words with a single space.

```text
FUNCTION rearrangeSentence(s):
    words ← SPLIT s BY ' '
    lowerWords ← [LOWERCASE(w) FOR w IN words]
    sortedWords ← SORT lowerWords BY LENGTH (stable)
    sortedWords[0] ← CAPITALIZE(sortedWords[0])
    RETURN JOIN(sortedWords, ' ')
```

## Walkthrough
`s = "Leetcode is cool"`
1. words = ["Leetcode","is","cool"]
2. lowerWords = ["leetcode","is","cool"]
3. sorted by length → ["is","cool","leetcode"]
4. capitalize first → ["Is","cool","leetcode"]
5. join → "Is cool leetcode".

## Complexity Analysis
- **Time:** O(n log n) for sorting `n` words.
- **Space:** O(n) to store the list of words.

## Follow-Up Questions
1. How would you modify the algorithm to sort by descending length?
2. Can you achieve O(n) time using counting sort if word lengths are bounded?
3. How to handle punctuation attached to words?

## Key Takeaway
Sort the words by length after normalizing case, then re‑capitalize the first word to form the final sentence.
