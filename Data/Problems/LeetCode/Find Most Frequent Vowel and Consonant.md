# 3541. Find Most Frequent Vowel and Consonant

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-most-frequent-vowel-and-consonant](https://leetcode.com/problems/find-most-frequent-vowel-and-consonant)
**Companies:** Amazon, Google, Meta

---

## Problem Description

You are given a string `s` consisting of lowercase English letters (`'a'` to `'z'`).

Your task is to:

- Find the vowel (one of `'a'`, `'e'`, `'i'`, `'o'`, or `'u'`) with the **maximum** frequency.
- Find the consonant (all other letters excluding vowels) with the **maximum** frequency.

Return the sum of the two frequencies.

**Note**: If multiple vowels or consonants have the same maximum frequency, you may choose any one of them. If there are no vowels or no consonants in the string, consider their frequency as 0.
The **frequency** of a letter `x` is the number of times it occurs in the string.

**Constraints:**
- `1 <= s.length <= 100`
- `s` consists of lowercase English letters only.

## Examples

**Example 1:**
```
Input: s = "successes"
Output: 6
Explanation: - The vowels are: 'u' (frequency 1), 'e' (frequency 2). The maximum frequency is 2.
- The consonants are: 's' (frequency 4), 'c' (frequency 2). The maximum frequency is 4.
- The output is 2 + 4 = 6.
```

**Example 2:**
```
Input: s = "aeiaeia"
Output: 3
Explanation: - The vowels are: 'a' (frequency 3), 'e' ( frequency 2), 'i' (frequency 2). The maximum frequency is 3.
- There are no consonants in s. Hence, maximum consonant frequency = 0.
- The output is 3 + 0 = 3.
```

## Approach
Count occurrences of each character using a hash map. Separate counts for vowels and consonants. Determine the maximum count in each group (use 0 if a group is empty). Return the sum of the two maxima.

## Walkthrough
For `"aabbbcc"`:
| Char | Count (vowel) | Count (consonant) |
|------|---------------|-------------------|
| a | 2 | - |
| b | - | 3 |
| c | - | 2 |
Maximum vowel count = 2, maximum consonant count = 3, sum = 5.

## Complexity Analysis
- **Time:** O(n) where n is the length of the string.
- **Space:** O(1) extra space (fixed-size arrays for 26 letters).

## Follow-Up Questions
- How would you modify the solution to handle uppercase letters and Unicode?
- Can you return the actual characters that achieve the maximum frequencies?
- What if you need the sum of top‑k frequent vowels and consonants?

## Key Takeaway
A single pass with separate frequency counters for vowels and consonants yields the required sum efficiently.
