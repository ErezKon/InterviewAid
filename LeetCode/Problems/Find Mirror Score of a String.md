# 3412. Find Mirror Score of a String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-mirror-score-of-a-string](https://leetcode.com/problems/find-mirror-score-of-a-string)
**Companies:** Carwale, Google

---

## Problem Description
Given a string `s`, the *mirror score* is defined as the length of the longest prefix of `s` that is also a suffix of `s` (the two parts may overlap). Return the mirror score of the input string.

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| `"ababa"` | `3` | Prefix `"aba"` equals suffix `"aba"`. |
| `"abcd"` | `0` | No non‑empty prefix matches a suffix. |
| `"aaaa"` | `3` | Prefix `"aaa"` matches suffix `"aaa"` (overlap allowed). |

## Approach
Use the Knuth‑Morris‑Pratt (KMP) preprocessing to compute the longest proper prefix which is also a suffix for every prefix of the string. The value for the full string is the mirror score.

## Walkthrough
For `"ababa"`:
| i | char | pi[i] (longest prefix‑suffix) |
|---|------|-------------------------------|
| 0 | a | 0 |
| 1 | b | 0 |
| 2 | a | 1 |
| 3 | b | 2 |
| 4 | a | 3 |
The final `pi[4] = 3` gives the mirror score.

## Complexity Analysis
- **Time:** O(n) where n is the length of the string, due to the linear KMP preprocessing.
- **Space:** O(n) for the prefix table (can be reduced to O(1) with careful handling).

## Follow-Up Questions
- How would you modify the algorithm to return all prefix‑suffix lengths?
- Can the mirror score be computed in a streaming fashion?
- How does the problem change if the string contains Unicode characters?

## Key Takeaway
The KMP prefix table directly provides the longest prefix that is also a suffix, enabling an O(n) solution for the mirror score.
