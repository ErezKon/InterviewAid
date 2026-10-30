# 30. Substring with Concatenation of All Words

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/substring-with-concatenation-of-all-words](https://leetcode.com/problems/substring-with-concatenation-of-all-words)
**Companies:** Amazon, Apple, Bloomberg, Google, Infosys, Meta, Microsoft, Samsung, Texas Instruments

---

## Problem Description

You are given a string `s` and an array of strings `words`. All the strings of `words` are of **the same length**.

A **concatenated string** is a string that exactly contains all the strings of any permutation of `words` concatenated.

- For example, if `words = ["ab","cd","ef"]`, then `"abcdef"`, `"abefcd"`, `"cdabef"`, `"cdefab"`, `"efabcd"`, and `"efcdab"` are all concatenated strings. `"acdbef"` is not a concatenated string because it is not the concatenation of any permutation of `words`.

Return an array of *the starting indices* of all the concatenated substrings in `s`. You can return the answer in **any order**.

**Constraints:**
- `1 <= s.length <= 10^4`
- `1 <= words.length <= 5000`
- `1 <= words[i].length <= 30`
- `s` and `words[i]` consist of lowercase English letters.

## Examples

**Example 1:**
```
Input: s = "barfoothefoobarman", words = ["foo","bar"]
Output: [0,9]
Explanation:
The substring starting at 0 is "barfoo". It is the concatenation of ["bar","foo"] which is a permutation of words.
The substring starting at 9 is "foobar". It is the concatenation of ["foo","bar"] which is a permutation of words.
```

**Example 2:**
```
Input: s = "wordgoodgoodgoodbestword", words = ["word","good","best","word"]
Output: []
Explanation:
There is no concatenated substring.
```

**Example 3:**
```
Input: s = "barfoofoobarthefoobarman", words = ["bar","foo","the"]
Output: [6,9,12]
Explanation:
The substring starting at 6 is "foobarthe". It is the concatenation of ["foo","bar","the"].
The substring starting at 9 is "barthefoo". It is the concatenation of ["bar","the","foo"].
The substring starting at 12 is "thefoobar". It is the concatenation of ["the","foo","bar"].
```

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
