# 1781. Sum of Beauty of All Substrings

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sum-of-beauty-of-all-substrings](https://leetcode.com/problems/sum-of-beauty-of-all-substrings)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Zoho

---

## Problem Description

The **beauty** of a string is the difference in frequencies between the most frequent and least frequent characters.

- For example, the beauty of `"abaacc"` is `3 - 1 = 2`.

Given a string `s`, return *the sum of **beauty** of all of its substrings.*

**Constraints:**
- `1 <= s.length <= 500`
- `s` consists of only lowercase English letters.

## Examples

**Example 1:**
```
Input: s = "aabcb"
Output: 5
Explanation: The substrings with non-zero beauty are ["aab","aabc","aabcb","abcb","bcb"], each with beauty equal to 1.
```

**Example 2:**
```
Input: s = "aabcbaa"
Output: 17
```

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
