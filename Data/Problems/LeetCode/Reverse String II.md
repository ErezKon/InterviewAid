# 541. Reverse String II

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/reverse-string-ii](https://leetcode.com/problems/reverse-string-ii)
**Companies:** Accenture, Amazon, Bloomberg, Google, Infosys, Meta, Microsoft

---

## Problem Description

Given a string `s` and an integer `k`, reverse the first `k` characters for every `2k` characters counting from the start of the string.

If there are fewer than `k` characters left, reverse all of them. If there are less than `2k` but greater than or equal to `k` characters, then reverse the first `k` characters and leave the other as original.

**Constraints:**
- `1 <= s.length <= 10^4`
- `s` consists of only lowercase English letters.
- `1 <= k <= 10^4`

## Examples

**Example 1:**
```
Input: s = "abcdefg", k = 2
Output: "bacdfeg"
```

**Example 2:**
```
Input: s = "abcd", k = 2
Output: "bacd"
```

## Approach
Iterate over the string in steps of `2k`, reversing the slice `[i, i+k)` each time.

```text
FUNCTION ReverseStringII(s, k):
    SET chars ← LIST(s)
    SET n ← LENGTH(chars)
    FOR i ← 0 TO n-1 STEP 2*k:
        SET left ← i
        SET right ← MIN(i + k - 1, n - 1)
        // Reverse in‑place
        WHILE left < right:
            SWAP chars[left] WITH chars[right]
            INCREMENT left
            DECREMENT right
    RETURN JOIN(chars)
```

## Walkthrough
| i (start) | Segment before | Segment after reversal |
|-----------|----------------|------------------------|
| 0 (k=2) | a b | b a |
| 4 (next 2k) | d e | e d |
| Result | b a c d e f g → b a c d e f g → b a c d e f g |

## Complexity Analysis
- Time: O(n) – each character is visited at most once.
- Space: O(n) for the mutable character list (in‑place on list).

## Follow‑Up Questions
1. How would you modify the algorithm to work on a linked list representation of the string?
2. Can you achieve O(1) extra space without converting to a list?
3. What changes are needed if `k` can be larger than the string length?

## Key Takeaway
Processing the string in fixed `2k` blocks and reversing the first `k` characters yields a simple linear‑time solution.
