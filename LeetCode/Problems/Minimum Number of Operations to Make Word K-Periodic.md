# 3137. Minimum Number of Operations to Make Word K-Periodic

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-operations-to-make-word-k-periodic](https://leetcode.com/problems/minimum-number-of-operations-to-make-word-k-periodic)
**Companies:** Google, Turing

---

## Problem Description
Given a string `s` of length `n` and an integer `k` (1 ≤ k ≤ n), you may change any character to any other lowercase letter. An operation counts as one character change. A string is **k‑periodic** if for every index `i` (0‑based) the characters at positions `i` and `i + k` are equal whenever `i + k < n`. Return the minimum number of operations required to transform `s` into a k‑periodic string.

## Examples
**Example 1:**
```
Input: s = "abcabc", k = 3
Output: 0
Explanation: The string is already 3‑periodic because s[i] == s[i+3] for all i.
```
**Example 2:**
```
Input: s = "abac", k = 2
Output: 1
Explanation: Change the last character to 'b' → "abab", which is 2‑periodic.
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
| 0 | s[0], s[2], s[4] = a, a, a | a:3 | 3‑3 = 0 |
| 1 | s[1], s[3], s[5] = b, b, b | b:3 | 0 |
| Total cost = 0 |

## Complexity Analysis
- **Time:** O(n) – a single pass to count characters per group.
- **Space:** O(k) for frequency maps of each group.

## Follow‑Up Questions
1. How would the solution change if you could only replace characters in contiguous blocks?
2. What if the cost of changing a character depended on its position?
3. Can the algorithm be adapted to find the minimal cost for making the string **k‑palindromic**?

## Key Takeaway
Group characters by their modulo‑k positions and change each group to its most common character; the sum of mismatches yields the minimal operations.
