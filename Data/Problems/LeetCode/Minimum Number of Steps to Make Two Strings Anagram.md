# 1347. Minimum Number of Steps to Make Two Strings Anagram

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-steps-to-make-two-strings-anagram](https://leetcode.com/problems/minimum-number-of-steps-to-make-two-strings-anagram)
**Companies:** Amazon, Bloomberg, Doordash, Google, Ixl, Jpmorgan, Microsoft, Oracle, Sofi, Twitter

---

## Problem Description

You are given two strings of the same length `s` and `t`. In one step you can choose **any character** of `t` and replace it with **another character**.

Return *the minimum number of steps* to make `t` an anagram of `s`.

An **Anagram** of a string is a string that contains the same characters with a different (or the same) ordering.

**Constraints:**
- `1 <= s.length <= 5 * 10^4`
- `s.length == t.length`
- `s` and `t` consist of lowercase English letters only.

## Examples

**Example 1:**
```
Input: s = "bab", t = "aba"
Output: 1
Explanation: Replace the first 'a' in t with b, t = "bba" which is anagram of s.
```

**Example 2:**
```
Input: s = "leetcode", t = "practice"
Output: 5
Explanation: Replace 'p', 'r', 'a', 'i' and 'c' from t with proper characters to make t anagram of s.
```

**Example 3:**
```
Input: s = "anagram", t = "mangaar"
Output: 0
Explanation: "anagram" and "mangaar" are anagrams.
```

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
