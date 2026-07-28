# 1347. Minimum Number of Steps to Make Two Strings Anagram

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-steps-to-make-two-strings-anagram](https://leetcode.com/problems/minimum-number-of-steps-to-make-two-strings-anagram)
**Companies:** Amazon, Bloomberg, Doordash, Google, Ixl, Jpmorgan, Microsoft, Oracle, Sofi, Twitter

---

## Problem Description
Given two strings `s` and `t` of equal length consisting of lowercase English letters, you may replace any character in `s` with any other character. Return the minimum number of replacement operations required to make `s` an anagram of `t`.

## Examples
| s | t | Output | Explanation |
|---|---|---|---|
| "bab" | "aba" | 1 | Replace the second `b` in `s` with `a`.
| "leetcode" | "practice" | 5 | Replace `l, e, e, d, o` in `s`.
| "abc" | "def" | 3 | Replace all three characters.

## Approach
Count the frequency of each character in both strings. For each letter, the excess count in `s` (positive difference) indicates how many replacements are needed. Summing these excesses yields the answer.

### Pseudocode
```text
FUNCTION minSteps(s, t):
    // Frequency arrays for 26 letters
    SET freq[26] ← ARRAY OF ZEROES
    FOR ch IN s:
        SET idx ← ASCII(ch) - ASCII('a')
        INCREMENT freq[idx]
    FOR ch IN t:
        SET idx ← ASCII(ch) - ASCII('a')
        DECREMENT freq[idx]
    SET steps ← 0
    FOR i ← 0 TO 25:
        IF freq[i] > 0:
            SET steps ← steps + freq[i]
    RETURN steps
```

## Walkthrough
Take `s = "leetcode"`, `t = "practice"`.
1. After processing `s`, `freq` holds counts of its letters.
2. Subtract counts of `t` letters; positive entries now represent excess characters in `s`.
3. Summing positive values gives `5`, the minimum replacements.

## Complexity Analysis
- **Time:** O(n) where n is the length of the strings.
- **Space:** O(1) – fixed array of size 26.

## Follow-Up Questions
- How would the solution adapt if strings could contain uppercase letters or Unicode?
- What if you could also delete characters instead of only replace them?
- Can you extend the method to compute the minimum number of swaps needed?

## Key Takeaway
The sum of positive frequency differences between the two strings directly gives the minimum replacements to make them anagrams.
