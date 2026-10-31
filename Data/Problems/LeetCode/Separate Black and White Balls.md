# 2938. Separate Black and White Balls

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/separate-black-and-white-balls](https://leetcode.com/problems/separate-black-and-white-balls)
**Companies:** 1Kosmos, Accenture, Amazon, Google, Microsoft

---

## Problem Description

There are `n` balls on a table, each ball has a color black or white.

You are given a **0-indexed** binary string `s` of length `n`, where `1` and `0` represent black and white balls, respectively.

In each step, you can choose two adjacent balls and swap them.

Return *the **minimum** number of steps to group all the black balls to the right and all the white balls to the left*.

**Constraints:**

- `1 <= n == s.length <= 10^5`
- `s[i]` is either `'0'` or `'1'`.

---

## Examples

```
Example 1:
  Input: s = "101"
  Output: 1
  Explanation: We can group all the black balls to the right in the following way:
  - Swap s[0] and s[1], s = "011".
  Initially, 1s are not grouped together, requiring at least 1 step to group them to the right.
```

```
Example 2:
  Input: s = "100"
  Output: 2
  Explanation: We can group all the black balls to the right in the following way:
  - Swap s[0] and s[1], s = "010".
  - Swap s[1] and s[2], s = "001".
  It can be proven that the minimum number of steps needed is 2.
```

```
Example 3:
  Input: s = "0111"
  Output: 0
  Explanation: All the black balls are already grouped to the right.
```

---

## Approach

```
FUNCTION minimumSteps(s):
    ones ← 0
    swaps ← 0
    FOR c IN s:
        IF c == '1':
            ones ← ones + 1
        ELSE:
            swaps ← swaps + ones
    RETURN swaps
```

---

## Walkthrough

Example 2: `s = "100"`.

1. Initialize `ones = 0`, `swaps = 0`.
2. Iterate characters:
   - `c='1'`: `ones = 1`.
   - `c='0'`: `swaps += ones` → `swaps = 1`.
   - `c='0'`: `swaps += ones` → `swaps = 2`.
3. End of loop, `swaps = 2`, matching the expected output.

Example 1 `"101"`: the single `0` sees one `1` before it → `1`. Example 3 `"0111"`: the `0` comes first with `ones = 0` → `0`.

---

## Complexity Analysis

**Time:** O(n) where n is length of the string.
**Space:** O(1) auxiliary space.

---

## Follow-Up Questions

- How would the solution change if swaps could be performed between any two positions (not just adjacent)?
- Can you extend the approach to handle multiple colors (more than two types of characters)?

---

## Key Takeaway

> Count the number of `1`s encountered so far; each `0` must swap past all those `1`s, giving a linear-time solution.
