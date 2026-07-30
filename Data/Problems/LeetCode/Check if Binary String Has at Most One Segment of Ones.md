# 1784. Check if Binary String Has at Most One Segment of Ones

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/check-if-binary-string-has-at-most-one-segment-of-ones](https://leetcode.com/problems/check-if-binary-string-has-at-most-one-segment-of-ones)
**Companies:** Amazon, Cisco, Google

---

## Problem Description
Given a binary string `s`, determine whether all the `1` characters form at most one contiguous segment. In other words, there should be no occurrence of `01` after a `1` has appeared.

## Examples
- Input: `"1001"` → Output: `false` (two separate `1` segments)
- Input: `"110"` → Output: `true` (single segment of `1`s)
- Input: `"0"` → Output: `true` (no `1`s at all)

## Approach
**Algorithm:** Simple Scan
- Iterate through the string once.
- Track whether we have seen a `1` segment.
- If we encounter a `0` after a `1` segment and later see another `1`, return false.
- Otherwise, return true.

```text
FUNCTION hasAtMostOneOnesSegment(s):
    SET seenOne ← false
    SET afterOneZero ← false
    FOR ch IN s:
        IF ch = '1':
            IF afterOneZero: RETURN false
            SET seenOne ← true
        ELSE: // ch = '0'
            IF seenOne: SET afterOneZero ← true
    RETURN true
```

## Walkthrough
| Index | Char | seenOne | afterOneZero | Decision |
|-------|------|---------|--------------|----------|
| 0 | '1' | true | false | continue |
| 1 | '0' | true | true | continue |
| 2 | '0' | true | true | continue |
| 3 | '1' | true | true | return false |

## Complexity Analysis
- **Time:** O(n) where n is the length of the string.
- **Space:** O(1) constant extra space.

## Follow-Up Questions
1. How would you modify the algorithm to allow at most *k* segments of `1`s?
2. Can the same logic be applied to check for at most one segment of a different character?
3. What if the input is a stream of characters rather than a stored string?

## Key Takeaway
A single linear scan with a few state flags is sufficient to verify the presence of at most one contiguous block of `1`s.
