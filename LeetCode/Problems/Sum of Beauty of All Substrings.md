# 1781. Sum of Beauty of All Substrings

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sum-of-beauty-of-all-substrings](https://leetcode.com/problems/sum-of-beauty-of-all-substrings)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Zoho

---

## Problem Description
Given a lowercase string `s`, the *beauty* of a substring is defined as the difference between the maximum and minimum frequencies of any character in that substring. Compute the sum of beauties for all possible substrings of `s`.

## Examples
**Example 1:**
Input: `s = "aabcb"`
Output: `5`
Explanation: Substrings and beauties: "a"(0), "aa"(0), "aab"(1), "aabc"(1), "aabcb"(2), … total = 5.

**Example 2:**
Input: `s = "abc"`
Output: `0`
Explanation: All substrings have each character occurring once, so max‑min = 0.

## Approach
Iterate over each start index `i`. Maintain a frequency array of size 26 while extending the end index `j`. After each extension, compute `maxFreq` and `minFreq` among characters with non‑zero count and add `maxFreq - minFreq` to the answer.

## Walkthrough
| i | j | freq a | freq b | freq c | max | min | beauty |
|---|---|--------|--------|--------|-----|-----|--------|
|0|0|1|0|0|1|1|0|
|0|1|2|0|0|2|2|0|
|0|2|2|1|0|2|1|1|
|…|…|…|…|…|…|…|…|
The table shows incremental updates and accumulated sum.

## Complexity Analysis
Time: O(n²) – two nested loops over string length.
Space: O(1) – fixed 26‑element frequency array.

## Follow-Up Questions
* Can you reduce the time complexity using prefix frequency arrays or segment trees?
* How would the solution change if the string contained uppercase letters and digits?
* What if we need the maximum beauty among all substrings instead of the sum?

## Key Takeaway
Updating character frequencies while expanding each substring lets you compute its beauty in constant time, yielding an overall O(n²) solution.
