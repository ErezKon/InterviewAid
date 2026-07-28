# 1963. Minimum Number of Swaps to Make the String Balanced

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-swaps-to-make-the-string-balanced](https://leetcode.com/problems/minimum-number-of-swaps-to-make-the-string-balanced)
**Companies:** Adobe, Amazon, Bloomberg, Expedia, Google, Ibm, Meta, Microsoft, Microstrategy, Paypal, Servicenow, Visa, Zoho

---

## Problem Description
You are given a string `s` consisting only of the characters `'['` and `']'`. A string is **balanced** if it meets the following conditions:
1. It is an empty string, or
2. It can be written as `AB` where both `A` and `B` are balanced, or
3. It can be written as `[C]` where `C` is balanced.
You may swap any two characters in the string. Return the minimum number of swaps required to make `s` balanced.

## Examples
| s | Output | Explanation |
|---|---|---|
| "]][][" | 2 | Swap the first `]` with the third `[` and the second `]` with the fourth `[` to obtain "[[]]". |
| "[[]]" | 0 | Already balanced. |
| "[]][" | 1 | Swap the third `]` with the fourth `[` to get "[[]]". |

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
