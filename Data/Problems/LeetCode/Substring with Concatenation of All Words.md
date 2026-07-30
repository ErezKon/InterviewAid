# 30. Substring with Concatenation of All Words

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/substring-with-concatenation-of-all-words](https://leetcode.com/problems/substring-with-concatenation-of-all-words)
**Companies:** Amazon, Apple, Bloomberg, Google, Infosys, Meta, Microsoft, Samsung, Texas Instruments

---

## Problem Description
Given a string `s` and an array `words` of equal‑length strings, find all starting indices of substrings in `s` that are a concatenation of each word in `words` exactly once and without any intervening characters. The order of words can be any permutation.

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| `s = "barfoothefoobarman"`, `words = ["foo","bar"]` | `[0,9]` | Substrings starting at 0 (`"barfoo"`) and 9 (`"foobar"`). |
| `s = "wordgoodgoodgoodbestword"`, `words = ["word","good","best","word"]` | `[]` | No concatenation uses each word exactly once. |

## Approach
Use a sliding window of word‑length chunks. For each possible offset within a word length, maintain a frequency map of words seen in the current window and shrink the window when a word exceeds its required count.

```text
FUNCTION findSubstring(s, words):
    wordLen ← LENGTH(words[0])
    totalLen ← wordLen * LENGTH(words)
    required ← COUNTER(words)
    result ← []

    FOR offset ← 0 TO wordLen - 1:
        left ← offset
        window ← COUNTER()
        count ← 0

        FOR right ← offset TO LENGTH(s) - wordLen STEP wordLen:
            word ← SUBSTRING(s, right, right + wordLen)
            IF word IN required:
                window[word] ← window.get(word,0) + 1
                count ← count + 1
                WHILE window[word] > required[word]:
                    leftWord ← SUBSTRING(s, left, left + wordLen)
                    window[leftWord] ← window[leftWord] - 1
                    count ← count - 1
                    left ← left + wordLen
                IF count == LENGTH(words):
                    APPEND result WITH left
            ELSE:
                window.clear()
                count ← 0
                left ← right + wordLen
    RETURN result
```

## Walkthrough
Consider `s = "barfoothefoobarman"`, `words = ["foo","bar"]` (wordLen = 3).
1. Offset 0: slide windows `"bar"`, `"foo"`, `"the"` …
2. When window contains `"bar"` then `"foo"`, count reaches 2 → record index 0.
3. Continue sliding; later window `"foo"` then `"bar"` at index 9 → record 9.

## Complexity Analysis
*Time*: O(|s| · wordLen) – each character is visited at most twice per offset.
*Space*: O(|words|) for the frequency maps.

## Follow‑Up Questions
* How would you adapt the solution if words have varying lengths?
* Can you solve the problem in O(|s|) without the inner loop over offsets?
* How does the approach change if words may repeat in the array?

## Key Takeaway
Sliding a fixed‑size word window while maintaining a frequency counter lets you efficiently locate all concatenations of the given words.
