# 3137. Minimum Number of Operations to Make Word K-Periodic

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-operations-to-make-word-k-periodic](https://leetcode.com/problems/minimum-number-of-operations-to-make-word-k-periodic)
**Companies:** Google, Turing

---

## Problem Description

> *Note: the Approach below changes single characters. Officially one operation copies a whole length-`k` block. The answer is `n/k − (max frequency of any block word[i..i+k−1], i % k == 0)`.*

You are given a string `word` of size `n`, and an integer `k` such that `k` divides `n`.

In one operation, you can pick any two indices `i` and `j`, that are divisible by `k`, then replace the substring of length `k` starting at `i` with the substring of length `k` starting at `j`. That is, replace the substring `word[i..i + k - 1]` with the substring `word[j..j + k - 1]`.

Return *the **minimum** number of operations required to make* `word` ***k-periodic***.

We say that `word` is **k-periodic** if there is some string `s` of length `k` such that `word` can be obtained by concatenating `s` an arbitrary number of times. For example, if `word == “ababab”`, then `word` is 2-periodic for `s = "ab"`.

**Constraints:**
- `1 <= n == word.length <= 10^5`
- `1 <= k <= word.length`
- `k` divides `word.length`.
- `word` consists only of lowercase English letters.

## Examples

**Example 1:**
```
Input: word = "leetcodeleet", k = 4
Output: 1
Explanation: We can obtain a 4-periodic string by picking i = 4 and j = 0. After this operation, word becomes equal to "leetleetleet".
```

**Example 2:**
```
Input: word = "leetcoleet", k = 2
Output: 3
Explanation: We can obtain a 2-periodic string by applying the operations in the table below.
  i
  j
  word
  0
  2
  etetcoleet
  4
  0
  etetetleet
  6
  0
  etetetetet
```

## Approach
The positions that must match form `k` independent groups: indices `i, i+k, i+2k, …`. For each group, the optimal character is the one that appears most frequently.

1. Iterate `i` from `0` to `k-1`.
2. Collect characters at indices `i + j*k`.
3. Count frequencies; the group cost = group size – max frequency.
4. Sum costs over all groups.

## Walkthrough
| Group start | Characters | Frequencies | Group cost |
|-------------|------------|-------------|------------|
| 0 | s[0], s[2], s[4] = a, a, a | a:3 | 3-3 = 0 |
| 1 | s[1], s[3], s[5] = b, b, b | b:3 | 0 |
| Total cost = 0 |

## Complexity Analysis
- **Time:** O(n) – a single pass to count characters per group.
- **Space:** O(k) for frequency maps of each group.

## Follow-Up Questions
1. How would the solution change if you could only replace characters in contiguous blocks?
2. What if the cost of changing a character depended on its position?
3. Can the algorithm be adapted to find the minimal cost for making the string **k-palindromic**?

## Key Takeaway
Group characters by their modulo-k positions and change each group to its most common character; the sum of mismatches yields the minimal operations.
