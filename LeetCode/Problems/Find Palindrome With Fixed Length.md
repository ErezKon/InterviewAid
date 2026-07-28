# 2217. Find Palindrome With Fixed Length

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-palindrome-with-fixed-length](https://leetcode.com/problems/find-palindrome-with-fixed-length)
**Companies:** Vmware

---

## Problem Description
Given a string `s` and an integer `k`, determine whether there exists a palindrome substring of length exactly `k` within `s`. Return `true` if such a substring exists, otherwise return `false`.

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| `s = "ababa", k = 3` | `true` | Substring `"aba"` (positions 0‑2) is a palindrome of length 3. |
| `s = "abcde", k = 2` | `false` | No length‑2 palindrome exists. |
| `s = "aaaa", k = 4` | `true` | The whole string is a palindrome of length 4. |

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
