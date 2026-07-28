# 899. Orderly Queue

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/orderly-queue](https://leetcode.com/problems/orderly-queue)
**Companies:** Amazon, Bloomberg

---

## Problem Description
Given a string `s` and an integer `k`, you may perform the following operation any number of times: choose one of the first `k` characters of `s` and move it to the end of the string. Return the lexicographically smallest string that can be obtained.

## Examples
**Example 1:**
```
Input: s = "cba", k = 1
Output: "acb"
Explanation: With k = 1 only rotations are allowed. The smallest rotation of "cba" is "acb".
```
**Example 2:**
```
Input: s = "baaca", k = 3
Output: "aaabc"
Explanation: When k > 1 any permutation of the characters can be achieved, so the answer is the sorted string.
```

## Approach
- If `k == 1`, the operation is equivalent to rotating the string. Use Booth's algorithm to find the lexicographically minimal rotation in linear time.
- If `k > 1`, the operation allows arbitrary swaps, thus any permutation is reachable. The smallest possible string is simply the characters of `s` sorted in non‑decreasing order.

## Walkthrough
| Case | Reasoning |
|------|-----------|
| k = 1 | Find minimal rotation using Booth's algorithm. |
| k > 1 | Sort all characters of `s` and return the sorted string. |

## Complexity Analysis
- **Time:** O(n) for Booth's algorithm when `k == 1`; O(n log n) for sorting when `k > 1`.
- **Space:** O(n) for the duplicated string used in Booth's algorithm or for the sorted array.

## Follow-Up Questions
1. How would the solution change if the operation allowed moving a character to the front instead of the end?
2. Can you compute the minimal string without explicitly sorting when `k > 1` using counting sort for limited alphabets?
3. What is the effect on the answer if the operation is limited to a fixed number of moves?

## Key Takeaway
When only the first character can be moved (`k = 1`), the problem reduces to finding the minimal rotation; with `k > 1` the string can be fully permuted, so the answer is simply the sorted characters.
