# 1963. Minimum Number of Swaps to Make the String Balanced

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-swaps-to-make-the-string-balanced](https://leetcode.com/problems/minimum-number-of-swaps-to-make-the-string-balanced)
**Companies:** Adobe, Amazon, Bloomberg, Expedia, Google, Ibm, Meta, Microsoft, Microstrategy, Paypal, Servicenow, Visa, Zoho

---

## Problem Description

You are given a **0-indexed** string `s` of **even** length `n`. The string consists of **exactly** `n / 2` opening brackets `'['` and `n / 2` closing brackets `']'`.

A string is called **balanced** if and only if:

- It is the empty string, or
- It can be written as `AB`, where both `A` and `B` are **balanced** strings, or
- It can be written as `[C]`, where `C` is a **balanced** string.

You may swap the brackets at **any** two indices **any** number of times.

Return *the **minimum** number of swaps to make *`s` ***balanced***.

**Constraints:**
- `n == s.length`
- `2 <= n <= 10^6`
- `n` is even.
- `s[i]` is either `'[' `or `']'`.
- The number of opening brackets `'['` equals `n / 2`, and the number of closing brackets `']'` equals `n / 2`.

## Examples

**Example 1:**
```
Input: s = "][]["
Output: 1
Explanation: You can make the string balanced by swapping index 0 with index 3.
The resulting string is "[[]]".
```

**Example 2:**
```
Input: s = "]]][[["
Output: 2
Explanation: You can do the following to make the string balanced:
- Swap index 0 with index 4. s = "[]][][".
- Swap index 1 with index 5. s = "[[][]]".
The resulting string is "[[][]]".
```

**Example 3:**
```
Input: s = "[]"
Output: 0
Explanation: The string is already balanced.
```

## Approach
The key insight is that after cancelling all matched pairs, the remaining unmatched `'['` brackets determine the answer. Each swap can fix two unmatched `'['` (by moving a `']'` to its right side), so the minimum swaps equal the ceiling of `unmatched / 2`.

### Pseudocode
```text
FUNCTION minSwaps(s):
    // Count unmatched opening brackets
    SET unmatched ← 0
    FOR ch IN s:
        IF ch = '[':
            INCREMENT unmatched
        ELSE: // ch = ']'
            IF unmatched > 0:
                DECREMENT unmatched
    // Each swap resolves two unmatched openings
    RETURN CEIL(unmatched / 2)
```

## Walkthrough
Take `s = "]][]["` (length 5).
1. Process characters:
   - `]`: unmatched = 0 (no opening to match).
   - `]`: unmatched = 0.
   - `[`: unmatched = 1.
   - `]`: unmatched > 0 → unmatched = 0.
   - `[`: unmatched = 1.
2. After the pass, `unmatched = 1`. Swaps needed = CEIL(1/2) = 1, which matches the optimal solution.

## Complexity Analysis
- **Time:** O(n) – single traversal of the string.
- **Space:** O(1) – only a few integer counters.

## Follow-Up Questions
- How would the solution change if you could only swap adjacent characters?
- Can you compute the minimum number of swaps for strings containing other types of brackets, e.g., `{}` and `()`?
- What is the answer if the cost of swapping differs based on the positions of the characters?

## Key Takeaway
Counting unmatched opening brackets and taking the ceiling of half that count yields the minimum swaps needed to balance a bracket string.
