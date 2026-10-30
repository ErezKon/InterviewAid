# 899. Orderly Queue

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/orderly-queue](https://leetcode.com/problems/orderly-queue)
**Companies:** Amazon, Bloomberg

---

## Problem Description

You are given a string `s` and an integer `k`. You can choose one of the first `k` letters of `s` and append it at the end of the string.

Return *the lexicographically smallest string you could have after applying the mentioned step any number of moves*.

**Constraints:**
- `1 <= k <= s.length <= 1000`
- `s` consist of lowercase English letters.

## Examples

**Example 1:**
```
Input: s = "cba", k = 1
Output: "acb"
Explanation: In the first move, we move the 1^st character 'c' to the end, obtaining the string "bac".
In the second move, we move the 1^st character 'b' to the end, obtaining the final result "acb".
```

**Example 2:**
```
Input: s = "baaca", k = 3
Output: "aaabc"
Explanation: In the first move, we move the 1^st character 'b' to the end, obtaining the string "aacab".
In the second move, we move the 3^rd character 'c' to the end, obtaining the final result "aaabc".
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
