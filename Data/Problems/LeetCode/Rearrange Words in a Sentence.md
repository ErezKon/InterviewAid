# 1451. Rearrange Words in a Sentence

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/rearrange-words-in-a-sentence](https://leetcode.com/problems/rearrange-words-in-a-sentence)
**Companies:** Expedia, Microsoft

---

## Problem Description
Given a sentence `text` (A *sentence* is a string of space-separated words) in the following format:

- First letter is in upper case.
- Each word in `text` are separated by a single space.

Your task is to rearrange the words in text such that all words are rearranged in an increasing order of their lengths. If two words have the same length, arrange them in their original order.

Return the new text following the format shown above.

**Constraints:**

- `text` begins with a capital letter and then contains lowercase letters and single space between words.
- `1 <= text.length <= 10⁵`

## Examples

```
Example 1:
  Input: text = "Leetcode is cool"
  Output: "Is cool leetcode"
  Explanation: There are 3 words, "Leetcode" of length 8, "is" of length 2 and "cool" of length 4.
    Output is ordered by length and the new first word starts with capital letter.
```

```
Example 2:
  Input: text = "Keep calm and code on"
  Output: "On and keep calm code"
  Explanation: Output is ordered as follows:
    "On" 2 letters.
    "and" 3 letters.
    "keep" 4 letters in case of tie order by position in original text.
    "calm" 4 letters.
    "code" 4 letters.
```

```
Example 3:
  Input: text = "To be or not to be"
  Output: "To be or to be not"
```

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
Sort the words by length after normalizing case, then re-capitalize the first word to form the final sentence.
