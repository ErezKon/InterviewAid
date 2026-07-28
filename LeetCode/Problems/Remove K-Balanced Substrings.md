# 3703. Remove K-Balanced Substrings

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/remove-k-balanced-substrings](https://leetcode.com/problems/remove-k-balanced-substrings)
**Companies:** Bloomberg, Deloitte

---

## Problem Description
Given a string `s` consisting only of characters `'a'` and `'b'`, and an integer `k`, repeatedly remove any substring of length `2k` that contains exactly `k` `'a'` characters and `k` `'b'` characters (i.e., a k‑balanced substring). Continue until no such substring exists. Return the final string.

## Examples
**Example 1:**
```
Input: s = "aabbab", k = 2
Output: ""
Explanation: The whole string is a 2‑balanced substring and is removed.
```
**Example 2:**
```
Input: s = "aaabbb", k = 1
Output: "aaabbb"
Explanation: No substring of length 2 with one 'a' and one 'b' exists.
```

## Approach
Use a stack to keep track of characters and the count of consecutive `'a'` and `'b'` in the current window. When the stack size reaches `2k`, check if the window is balanced; if so, pop `2k` characters. This greedy removal works because any removable balanced substring can be eliminated as soon as it appears without affecting future possibilities.

```text
FUNCTION removeKBalanced(s, k):
    SET stack ← []               // each element is a character
    FOR ch IN s:
        PUSH ch ONTO stack
        IF LENGTH(stack) >= 2 * k:
            // Examine the last 2k characters
            SET window ← LAST 2 * k ELEMENTS OF stack
            SET countA ← NUMBER OF 'a' IN window
            SET countB ← NUMBER OF 'b' IN window
            IF countA = k AND countB = k:
                // Remove the balanced substring
                FOR i ← 1 TO 2 * k:
                    POP stack
    RETURN JOIN(stack)
```

## Walkthrough
| Step | Processed char | Stack (last few) | Action |
|------|----------------|------------------|--------|
| 1 | 'a' | a | push |
| 2 | 'a' | a a | push |
| 3 | 'b' | a a b | push |
| 4 | 'b' | a a b b | length=4 (=2k) → balanced → pop all 4 → stack empty |
| 5 | 'a' | a | push |
| 6 | 'b' | a b | length=2 (<2k) → no check |

Resulting string after processing all characters.

## Complexity Analysis
- **Time:** O(n) where n is the length of `s`; each character is pushed once and popped at most once.
- **Space:** O(n) for the stack in the worst case.

## Follow-Up Questions
1. How would you adapt the algorithm for multiple values of `k` in a single pass?
2. Can the solution be implemented with O(1) extra space by modifying the string in‑place?
3. How would the approach change if the string contained more than two distinct characters?

## Key Takeaway
A stack enables greedy removal of k‑balanced substrings as soon as they appear, guaranteeing linear time processing.
