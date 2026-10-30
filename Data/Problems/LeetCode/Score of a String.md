# 3110. Score of a String

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/score-of-a-string](https://leetcode.com/problems/score-of-a-string)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description

You are given a string `s`. The **score** of a string is defined as the sum of the absolute difference between the **ASCII** values of adjacent characters.

Return the **score** of `s`.

**Constraints:**

- `2 <= s.length <= 100`
- `s` consists only of lowercase English letters.

---

## Approach

```text
FUNCTION scoreOfString(s):
    // Sum absolute differences of consecutive characters
    SET total ← 0
    FOR i ← 0 TO LENGTH(s) - 2:
        SET diff ← ABS(ASCII(s[i]) - ASCII(s[i+1]))
        SET total ← total + diff
    RETURN total
```

---

## Examples

```
Example 1:
  Input: s = "hello"
  Output: 13
  Explanation: The ASCII values of the characters in s are: 'h' = 104, 'e' = 101, 'l' = 108, 'o' = 111.
  So, the score of s would be |104 - 101| + |101 - 108| + |108 - 108| + |108 - 111| = 3 + 7 + 0 + 3 = 13.
```

```
Example 2:
  Input: s = "zaz"
  Output: 50
  Explanation: The ASCII values of the characters in s are: 'z' = 122, 'a' = 97.
  So, the score of s would be |122 - 97| + |97 - 122| = 25 + 25 = 50.
```

---

## Walkthrough

Take `s = "hello"`:

1. Initialize `total = 0`.
2. i=0: diff = |'h'(104) - 'e'(101)| = 3 → total = 3.
3. i=1: diff = |'e'(101) - 'l'(108)| = 7 → total = 10.
4. i=2: diff = |'l'(108) - 'l'(108)| = 0 → total = 10.
5. i=3: diff = |'l'(108) - 'o'(111)| = 3 → total = 13.
6. Return 13.

---

## Complexity Analysis

| Time | Space |
|------|-------|
| O(n) | O(1) |

The algorithm scans the string once and uses constant extra space.

---

## Follow-Up Questions

- How would you modify the solution to handle Unicode code points?
- Can you compute the result modulo a large prime for very long strings?

---

## Key Takeaway

> Summing absolute ASCII differences reduces to a simple linear scan with constant extra memory.
