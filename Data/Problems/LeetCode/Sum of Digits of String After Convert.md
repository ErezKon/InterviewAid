# 1945. Sum of Digits of String After Convert

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/sum-of-digits-of-string-after-convert](https://leetcode.com/problems/sum-of-digits-of-string-after-convert)
**Companies:** Bloomberg, Google, Meta, Microsoft

---

## Problem Description

You are given a string `s` consisting of lowercase English letters, and an integer `k`. Your task is to *convert* the string into an integer by a special process, and then *transform* it by summing its digits repeatedly `k` times. More specifically, perform the following steps:

- **Convert** `s` into an integer by replacing each letter with its position in the alphabet (i.e. replace `'a'` with `1`, `'b'` with `2`, ..., `'z'` with `26`).
- **T****ransform** the integer by replacing it with the **sum of its digits**.
- Repeat the **transform** operation (step 2) `k`** times** in total.

For example, if `s = "zbax"` and `k = 2`, then the resulting integer would be `8` by the following operations:

- **Convert**: `"zbax" ➝ "(26)(2)(1)(24)" ➝ "262124" ➝ 262124`
- **Transform #1**: `262124 ➝ 2 + 6 + 2 + 1 + 2 + 4 ➝ 17`
- **Transform #2**: `17 ➝ 1 + 7 ➝ 8`

Return the **resulting** **integer** after performing the **operations** described above.

**Constraints:**
- `1 <= s.length <= 100`
- `1 <= k <= 10`
- `s` consists of lowercase English letters.

## Examples

**Example 1:**
```
Input: s = "iiii", k = 1
Output: 36
Explanation: The operations are as follows:
- Convert: "iiii" ➝ "(9)(9)(9)(9)" ➝ "9999" ➝ 9999
- Transform #1: 9999 ➝ 9 + 9 + 9 + 9 ➝ 36
Thus the resulting integer is 36.
```

**Example 2:**
```
Input: s = "leetcode", k = 2
Output: 6
Explanation: The operations are as follows:
- Convert: "leetcode" ➝ "(12)(5)(5)(20)(3)(15)(4)(5)" ➝ "12552031545" ➝ 12552031545
- Transform #1: 12552031545 ➝ 1 + 2 + 5 + 5 + 2 + 0 + 3 + 1 + 5 + 4 + 5 ➝ 33
- Transform #2: 33 ➝ 3 + 3 ➝ 6
Thus the resulting integer is 6.
```

**Example 3:**
```
Input: s = "zbax", k = 2
Output: 8
```

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
