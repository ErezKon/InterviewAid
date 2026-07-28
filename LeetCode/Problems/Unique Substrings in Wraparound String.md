# 467. Unique Substrings in Wraparound String

**Difficulty:** 🟡 Medium
**Companies:** Google, Maq Software

---

## Problem Description
Given a string `s` consisting of lowercase English letters, consider an infinite wraparound string `"...zabcdefghijklmnopqrstuvwxyzabc..."`. A substring of `s` is **valid** if it appears as a contiguous substring in this infinite wraparound string. Return the number of distinct valid substrings of `s`.

## Examples
**Example 1**
```
Input: s = "zab"
Output: 6
Explanation: The valid substrings are "z", "a", "b", "za", "ab", "zab".
```
**Example 2**
```
Input: s = "cac"
Output: 2
Explanation: The valid substrings are "c" and "a". Substrings like "ca" are not consecutive in the wraparound order.
```

## Approach
Dynamic Programming – for each character, track the length of the longest valid substring ending at that character. The maximum length for a character determines how many distinct substrings ending with that character exist.

```text
FUNCTION countWraparoundSubstrings(s):
    maxLen ← array[26] of zeros          // max length for each ending letter
    curLen ← 0
    FOR i ← 0 TO LENGTH(s) - 1:
        IF i > 0 AND (ORD(s[i]) - ORD(s[i-1])) % 26 == 1:
            curLen ← curLen + 1
        ELSE:
            curLen ← 1
        idx ← ORD(s[i]) - ORD('a')
        maxLen[idx] ← MAX(maxLen[idx], curLen)
    RETURN SUM(maxLen)
```
The sum of `maxLen` values gives the count of distinct substrings because for each letter we can form substrings of lengths `1..maxLen[letter]`.

## Walkthrough
For `s = "zab"`:
| i | char | condition | curLen | maxLen['z'] | maxLen['a'] | maxLen['b'] |
|---|------|-----------|--------|-------------|-------------|-------------|
|0|z| - |1|1|0|0|
|1|a| (a‑z) %26 ==1|2|1|2|0|
|2|b| (b‑a)%26==1|3|1|2|3|
Sum = 1+2+3 = 6 distinct substrings.

## Complexity Analysis
Time: O(n) – single pass over the string.
Space: O(1) – fixed array of size 26.

## Follow‑Up Questions
* How would the solution change if uppercase letters were also allowed?
* Can the algorithm be extended to count substrings that appear at least `k` times in the wraparound string?
* What if the wraparound order were custom (e.g., a given permutation of the alphabet)?

## Key Takeaway
By recording the longest valid substring ending at each character, we can count all distinct wraparound substrings in linear time.
