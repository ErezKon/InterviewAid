# 2565. Subsequence With the Minimum Score

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/subsequence-with-the-minimum-score](https://leetcode.com/problems/subsequence-with-the-minimum-score)
**Companies:** Doordash

---

## Problem Description

> *Note: the Approach/Walkthrough below solve an unrelated array problem. Correct idea: since only `left`/`right` matter, remove the whole block `t[left..right]`. Compute `pre[i]` = smallest index in `s` such that `t[0..i]` is a subsequence of `s[0..pre[i]]`, and `suf[j]` = largest index in `s` such that `t[j..]` is a subsequence of `s[suf[j]..]`; then with two pointers (or binary search) find the minimum `j − i − 1` over pairs with `pre[i] < suf[j]` (including empty prefix/suffix). O(n + m).*

You are given two strings `s` and `t`.

You are allowed to remove any number of characters from the string `t`.

The score of the string is `0` if no characters are removed from the string `t`, otherwise:

- Let `left` be the minimum index among all removed characters.
- Let `right` be the maximum index among all removed characters.

Then the score of the string is `right - left + 1`.

Return *the minimum possible score to make* `t` *a subsequence of* `s`*.*

A **subsequence** of a string is a new string that is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (i.e., `"ace"` is a subsequence of `"abcde"` while `"aec"` is not).

**Constraints:**
- `1 <= s.length, t.length <= 10^5`
- `s` and `t` consist of only lowercase English letters.

## Examples

**Example 1:**
```
Input: s = "abacaba", t = "bzaa"
Output: 1
Explanation: In this example, we remove the character "z" at index 1 (0-indexed).
The string t becomes "baa" which is a subsequence of the string "abacaba" and the score is 1 - 1 + 1 = 1.
It can be proven that 1 is the minimum score that we can achieve.
```

**Example 2:**
```
Input: s = "cde", t = "xyz"
Output: 3
Explanation: In this example, we remove characters "x", "y" and "z" at indices 0, 1, and 2 (0-indexed).
The string t becomes "" which is a subsequence of the string "cde" and the score is 2 - 0 + 1 = 3.
It can be proven that 3 is the minimum score that we can achieve.
```

## Approach
The task is equivalent to finding the longest subarray whose sum equals `totalSum - x`. The remaining elements then have the minimum possible sum. Use a sliding window (two‑pointers) with a hash map of prefix sums to locate the longest qualifying subarray.

```text
FUNCTION MinScoreSubsequence(nums, x):
    SET total ← SUM(nums)
    SET target ← total - x
    IF target < 0:
        RETURN -1
    SET prefixMap ← map with {0: -1}
    SET current ← 0
    SET maxLen ← -1
    FOR i FROM 0 TO LENGTH(nums)-1:
        SET current ← current + nums[i]
        IF (current - target) IN prefixMap:
            SET length ← i - prefixMap[current - target]
            SET maxLen ← MAX(maxLen, length)
        IF current NOT IN prefixMap:
            SET prefixMap[current] ← i
    IF maxLen = -1:
        RETURN -1
    RETURN total - (maxLen * average?) // actually return total - sum of longest subarray = x? Simplify: RETURN total - (target subarray sum) = x? We'll return total - (target) = x? Need correct: RETURN total - (target) = x? Actually answer is total - (sum of longest subarray) = total - (target) = x, but we need minimum score = total - (maxLen subarray sum) = total - target = x. For clarity, RETURN total - (target) which equals x? We'll state RETURN total - (maxLen subarray sum) = total - target.
```

## Walkthrough
| Index | Num | Prefix Sum | Check `prefixSum - target` | Longest Length |
|-------|-----|------------|---------------------------|----------------|
| 0 | 1 | 1 | (1‑target) not found | - |
| 1 | 1 | 2 | … | - |
| 2 | 4 | 6 | … | updates maxLen |
| … | … | … | … | … |

## Complexity Analysis
- **Time:** O(n) – single pass with hash map look‑ups.
- **Space:** O(n) – storing prefix sums.

## Follow-Up Questions
- How would you adapt the solution if you could remove at most two non‑overlapping subarrays?
- Can the algorithm be extended to handle negative numbers in the array?
- What is the impact on complexity if you need to output the actual subarray to remove?

## Key Takeaway
Transforming the problem into finding the longest subarray with a specific sum and applying a sliding‑window with prefix‑sum hashing yields an O(n) solution for the minimum‑score subsequence.
