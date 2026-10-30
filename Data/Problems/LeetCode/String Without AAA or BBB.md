# 984. String Without AAA or BBB

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/string-without-aaa-or-bbb](https://leetcode.com/problems/string-without-aaa-or-bbb)
**Companies:** Amazon, Google, Zalando

---

## Problem Description

Given two integers `a` and `b`, return **any** string `s` such that:

- `s` has length `a + b` and contains exactly `a` `'a'` letters, and exactly `b` `'b'` letters,
- The substring `'aaa'` does not occur in `s`, and
- The substring `'bbb'` does not occur in `s`.

**Constraints:**
- `0 <= a, b <= 100`
- It is guaranteed such an `s` exists for the given `a` and `b`.

## Examples

**Example 1:**
```
Input: a = 1, b = 2
Output: "abb"
Explanation: "abb", "bab" and "bba" are all correct answers.
```

**Example 2:**
```
Input: a = 4, b = 1
Output: "aabaa"
```

## Approach
**Algorithm:** Greedy construction.
- **Insight:** Always place the character with the larger remaining count unless the last two placed characters are the same as that character, in which case place the other character.
- Build the result incrementally, updating counts.

### Pseudocode
```text
FUNCTION strWithout3a3b(a, b):
    result ← []
    WHILE a > 0 OR b > 0:
        IF LENGTH(result) ≥ 2 AND result[-1] = result[-2] = 'a':
            // Must place 'b' to avoid "aaa"
            APPEND 'b' TO result
            b ← b - 1
        ELSE IF LENGTH(result) ≥ 2 AND result[-1] = result[-2] = 'b':
            // Must place 'a' to avoid "bbb"
            APPEND 'a' TO result
            a ← a - 1
        ELSE IF a ≥ b:
            APPEND 'a' TO result
            a ← a - 1
        ELSE:
            APPEND 'b' TO result
            b ← b - 1
    RETURN JOIN(result)
```

## Walkthrough
For `a = 4, b = 1`:
| Step | result | a | b |
|------|--------|---|---|
|1|"a"|3|1|
|2|"aa"|2|1|
|3|"aab"|2|0| // forced 'b' after two 'a's
|4|"aaba"|1|0|
|5|"aabaa"|0|0|
The final string respects the constraints.

## Complexity Analysis
- **Time:** O(a + b) – each character is added once.
- **Space:** O(a + b) for the output string.

## Follow-Up Questions
- How would you modify the algorithm if the forbidden substrings were of length 4 (e.g., "aaaa")?
- Can the solution be extended to more than two distinct characters?
- What is the lexicographically smallest valid string for given `a` and `b`?

## Key Takeaway
A simple greedy rule that always prefers the character with the larger remaining count, while avoiding three consecutive identical characters, constructs a valid string efficiently.
