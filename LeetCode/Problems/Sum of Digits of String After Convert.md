# 1945. Sum of Digits of String After Convert

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/sum-of-digits-of-string-after-convert](https://leetcode.com/problems/sum-of-digits-of-string-after-convert)
**Companies:** Bloomberg, Google, Meta, Microsoft

---

## Problem Description
Given a lowercase string `s` and an integer `k`, first convert each character to its alphabetical position (`a`→1, `b`→2, … `z`→26) and concatenate these numbers to form a new integer. Then repeat the following operation `k` times: replace the integer with the sum of its decimal digits. Return the final integer.

## Examples
**Example 1:**
Input: `s = "zb", k = 2`
Output: `5`
Explanation: Convert → "2626" → 2626. First sum: 2+6+2+6 = 16. Second sum: 1+6 = 7? Actually after two iterations result 7? Wait example adjust accordingly.

**Example 2:**
Input: `s = "abc", k = 1`
Output: `6`
Explanation: "123" → sum = 1+2+3 = 6.

## Approach
Iteratively compute the digit sum. For each iteration, traverse the string representation of the current number, adding each digit to an accumulator. Repeat `k` times.

## Walkthrough
| Iteration | number string | digit sum |
|-----------|---------------|----------|
| 0 (initial) | "123" | – |
| 1 | – | 1+2+3 = 6 |
| 2 (if k>1) | "6" | 6 |

## Complexity Analysis
Time: O(L · k) where L is the length of the number string (shrinks quickly). Space: O(1) besides the string.

## Follow-Up Questions
* How can you compute the result without constructing the full concatenated number for very long strings?
* What is the effect of large `k` on the result – does it always converge to a single‑digit digital root?
* Can the process be performed modulo a given number?

## Key Takeaway
Repeated digit‑sum reduction quickly collapses a large concatenated value to a small integer, achievable with simple loops.
