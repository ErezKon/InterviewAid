# 2217. Find Palindrome With Fixed Length

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-palindrome-with-fixed-length](https://leetcode.com/problems/find-palindrome-with-fixed-length)
**Companies:** Vmware

---

## Problem Description

Given an integer array `queries` and a **positive** integer `intLength`, return *an array* `answer` *where* `answer[i]` *is either the *`queries[i]^th` *smallest **positive palindrome** of length* `intLength` *or* `-1`* if no such palindrome exists*.

A **palindrome** is a number that reads the same backwards and forwards. Palindromes cannot have leading zeros.

**Constraints:**
- `1 <= queries.length <= 5 * 10^4`
- `1 <= queries[i] <= 10^9`
- `1 <= intLength <= 15`

## Examples

**Example 1:**
```
Input: queries = [1,2,3,4,5,90], intLength = 3
Output: [101,111,121,131,141,999]
Explanation: The first few palindromes of length 3 are:
101, 111, 121, 131, 141, 151, 161, 171, 181, 191, 202, ...
The 90^th palindrome of length 3 is 999.
```

**Example 2:**
```
Input: queries = [2,4,6], intLength = 4
Output: [1111,1331,1551]
Explanation: The first six palindromes of length 4 are:
1001, 1111, 1221, 1331, 1441, and 1551.
```

## Approach
Use a sliding window of size `k` to examine each substring. For each window, check if it is a palindrome by comparing characters symmetrically from the ends toward the center. Early exit when a palindrome is found.

## Walkthrough
For `s = "ababa", k = 3`:
| start index | substring | palindrome? |
|-------------|-----------|-------------|
| 0 | `aba` | yes → return `true` |
| 1 | `bab` | (not reached) |
The algorithm stops after the first successful check.

## Complexity Analysis
- **Time:** O((n‑k+1) · k) in the worst case, where `n` is `len(s)`. Each window requires up to `k/2` character comparisons.
- **Space:** O(1) extra space.

## Follow-Up Questions
- How can you improve the time complexity using rolling hash or Manacher’s algorithm?
- What changes are needed if you must find the longest palindrome of length at least `k`?
- Can the solution be adapted to handle Unicode characters and case‑insensitive comparison?

## Key Takeaway
A straightforward sliding‑window scan with a palindrome check suffices for the fixed‑length requirement, though more advanced string algorithms can reduce the per‑window cost.
