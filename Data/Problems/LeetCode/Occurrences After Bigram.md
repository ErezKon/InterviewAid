# 1078. Occurrences After Bigram

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/occurrences-after-bigram](https://leetcode.com/problems/occurrences-after-bigram)
**Companies:** Google

---

## Problem Description

Given two strings `first` and `second`, consider occurrences in some text of the form `"first second third"`, where `second` comes immediately after `first`, and `third` comes immediately after `second`.

Return *an array of all the words* `third` *for each occurrence of* `"first second third"`.

**Constraints:**
- `1 <= text.length <= 1000`
- `text` consists of lowercase English letters and spaces.
- All the words in `text` are separated by **a single space**.
- `1 <= first.length, second.length <= 10`
- `first` and `second` consist of lowercase English letters.
- `text` will not have any leading or trailing spaces.

## Examples

**Example 1:**
```
Input: text = "alice is a good girl she is a good student", first = "a", second = "good"
Output: ["girl","student"]
```

**Example 2:**
```
Input: text = "we will we will rock you", first = "we", second = "will"
Output: ["we","rock"]
```

## Approach
**Linear Scan with Sliding Window**
1. Split `text` into a list of words.
2. Iterate with index `i` from `0` to `len(words)-3`.
3. If `words[i]` and `words[i+1]` match the two words of `bigram`, append `words[i+2]` to the result list.
4. Return the collected list.

```text
FUNCTION findOccurrences(text, bigram):
    words ← SPLIT(text, " ")
    bigramWords ← SPLIT(bigram, " ")
    result ← []
    FOR i FROM 0 TO LENGTH(words) - 3:
        IF words[i] = bigramWords[0] AND words[i+1] = bigramWords[1]:
            APPEND(words[i+2]) TO result
    RETURN result
```

## Walkthrough
For `text = "alice is a good girl she is a good student"` and `bigram = "a good"`:
| i | words[i] | words[i+1] | Condition | Added Word |
|---|----------|-----------|-----------|------------|
| 2 | a | good | match → append `girl` |
| 7 | a | good | match → append `student` |
Result = `["girl", "student"]`.

## Complexity Analysis
- Time: `O(m)` where `m` is number of words in `text`.
- Space: `O(1)` extra besides output list.

## Follow‑Up Questions
1. How would you modify the solution to handle overlapping bigrams?
2. Extend to return the count of each following word.
3. Generalize to `k`‑word phrases (n‑grams).

## Key Takeaway
A simple sliding‑window scan over the word list efficiently captures words that follow a given bigram.
