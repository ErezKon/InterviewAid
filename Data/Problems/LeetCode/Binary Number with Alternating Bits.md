# 693. Binary Number with Alternating Bits

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/binary-number-with-alternating-bits](https://leetcode.com/problems/binary-number-with-alternating-bits)
**Companies:** Amazon, Bloomberg, Google, Microsoft, Yahoo

---

## Problem Description
Given a positive integer `n`, determine whether its binary representation consists of alternating `0` and `1` bits. Return `true` if the bits alternate, otherwise return `false`. Constraints: `1 <= n <= 10^9`.

## Examples
| Input | Binary | Output | Explanation |
|-------|--------|--------|-------------|
| 5 | 101 | true | Bits alternate `1-0-1` |
| 7 | 111 | false | Consecutive `1`s break alternation |

## Approach
**Bit Manipulation** – The key insight is that for a number with alternating bits, `n` XOR (`n` right‑shifted by 1) yields a sequence of all `1`s. A number that is all `1`s has the property that `x & (x + 1) == 0`.

```text
FUNCTION hasAlternatingBits(n):
    SET x ← n XOR (n RIGHT_SHIFT 1)
    // x should be of the form 111...1
    RETURN (x AND (x + 1)) == 0
```

## Walkthrough
Consider `n = 10` (binary `1010`):
1. `n >> 1` → `0101`
2. `n XOR (n >> 1)` → `1111`
3. `x + 1` → `10000`
4. `x AND (x + 1)` → `0` → returns `true`.

## Complexity Analysis
- **Time:** O(1) – constant bit operations.
- **Space:** O(1) – only a few integer variables.

## Follow-Up Questions
- How would you check if a number is a power of two?
- Can you count the number of set bits in an integer efficiently?
- How to determine if a binary string has alternating bits without converting to an integer?

## Key Takeaway
A single XOR with the right‑shifted value transforms alternating‑bit numbers into all‑ones, enabling an O(1) check using a power‑of‑two test.