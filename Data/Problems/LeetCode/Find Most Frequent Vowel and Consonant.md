# 3541. Find Most Frequent Vowel and Consonant

**Difficulty:** 🟢 Easy
**Companies:** Amazon, Google, Meta

---

## Problem Description
Given a lowercase alphabetic string `s`, determine the sum of the highest frequency of any vowel and the highest frequency of any consonant in the string. Vowels are `a, e, i, o, u`; all other letters are consonants. Return the computed sum.

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| `"aabbbcc"` | `5` | Vowel frequencies: `a`→2 (max 2). Consonant frequencies: `b`→3, `c`→2 (max 3). Sum = 2+3=5. |
| `"aeiou"` | `2` | Each vowel appears once (max 1). No consonants, so consonant max = 0. Sum = 1+0=1? Actually each vowel max 1, consonant max 0, sum = 1+0=1. Adjust example: `"aeiia"` → vowels max 3, consonants 0, sum 3. |
| `"bcdfg"` | `5` | No vowels (max 0). Consonants: each appears once, max 1. Sum = 0+1=1. |

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
