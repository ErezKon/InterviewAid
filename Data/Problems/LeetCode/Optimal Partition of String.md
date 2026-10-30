# 2405. Optimal Partition of String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/optimal-partition-of-string](https://leetcode.com/problems/optimal-partition-of-string)
**Companies:** Amazon, Google, Ibm, Microsoft

---

## Problem Description

Given a string `s`, partition the string into one or more **substrings** such that the characters in each substring are **unique**. That is, no letter appears in a single substring more than **once**.

Return *the **minimum** number of substrings in such a partition.*

Note that each character should belong to exactly one substring in a partition.

**Constraints:**
- `1 <= s.length <= 10^5`
- `s` consists of only English lowercase letters.

## Examples

**Example 1:**
```
Input: s = "abacaba"
Output: 4
Explanation: Two possible partitions are ("a","ba","cab","a") and ("ab","a","ca","ba").
It can be shown that 4 is the minimum number of substrings needed.
```

**Example 2:**
```
Input: s = "ssssss"
Output: 6
Explanation: The only valid partition is ("s","s","s","s","s","s").
```

## Approach
Use a greedy scan while maintaining a set of characters seen in the current substring. When a duplicate character is encountered, start a new substring and reset the set.

## Walkthrough
| Step | Current char | Seen set | Parts |
|------|--------------|----------|-------|
| 1    | a            | {a}      | 1 |
| 2    | b            | {a,b}    | 1 |
| 3    | a (duplicate) | {}     | 2 |
| 4    | c            | {c}      | 2 |
| 5    | a            | {c,a}    | 2 |
| 6    | b            | {c,a,b}  | 2 |
| 7    | a (duplicate) | {}     | 3 |
| ...  | ...          | ...      | ... |

## Complexity Analysis
- **Time:** O(n), where n is the length of `s`.
- **Space:** O(σ), σ is the size of the character set (at most 26 for lowercase letters).

## Follow-Up Questions
1. How would the solution change if the string could contain Unicode characters?
2. Can you modify the algorithm to also return the actual substrings?
3. What if the constraint was that each substring must contain at most `k` distinct characters?

## Key Takeaway
A simple greedy scan with a hash set yields the optimal minimum partition when the only restriction is unique characters per substring.
