# 777. Swap Adjacent in LR String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/swap-adjacent-in-lr-string](https://leetcode.com/problems/swap-adjacent-in-lr-string)
**Companies:** Bloomberg, Google, Lg Electronics

---

## Problem Description
You are given two strings `start` and `end` of equal length consisting of characters `'L'`, `'R'`, and `'X'`. In one move you can swap any occurrence of "XL" with "LX" or "RX" with "XR" (i.e., move `'L'` left or `'R'` right by swapping with an adjacent `'X'`). Determine whether it is possible to transform `start` into `end` using any number of such moves.

## Examples
**Example 1:**
```
Input: start = "RXXLRXRXL", end = "XRLXXRRLX"
Output: true
Explanation: Perform a sequence of swaps to reach `end`.
```

**Example 2:**
```
Input: start = "XRL", end = "LRX"
Output: false
Explanation: `'L'` cannot move right and `'R'` cannot move left.
```

## Approach
1. Remove all `'X'` characters from both strings; the remaining sequences of `'L'` and `'R'` must be identical.
2. Scan both strings with two pointers skipping `'X'`. For each `'L'` ensure its index in `start` is **not** greater than its index in `end` (it can only move left). For each `'R'` ensure its index in `start` is **not** less than its index in `end` (it can only move right).
3. If all checks pass, the transformation is possible.

```text
FUNCTION canTransform(start, end):
    // Step 1: check order of L/R
    IF removeX(start) ≠ removeX(end):
        RETURN false
    SET i ← 0, j ← 0
    WHILE i < LENGTH(start) AND j < LENGTH(end):
        // skip X's
        WHILE i < LENGTH(start) AND start[i] = 'X':
            SET i ← i + 1
        WHILE j < LENGTH(end) AND end[j] = 'X':
            SET j ← j + 1
        IF i = LENGTH(start) OR j = LENGTH(end):
            BREAK
        IF start[i] = 'L' AND i < j:
            RETURN false
        IF start[i] = 'R' AND i > j:
            RETURN false
        SET i ← i + 1
        SET j ← j + 1
    RETURN true

FUNCTION removeX(s):
    SET result ← empty string
    FOR ch IN s:
        IF ch ≠ 'X':
            SET result ← result + ch
    RETURN result
```

## Walkthrough
For `start = "RXXLRXRXL"`, `end = "XRLXXRRLX"`:
- After removing `'X'`: both become "RLRL" → order matches.
- Scan pointers: each `'R'` in `start` is at or left of its position in `end`; each `'L'` is at or right of its position. All checks succeed → return true.

## Complexity Analysis
- **Time:** O(n) – single pass through the strings.
- **Space:** O(n) for the temporary strings without `'X'` (can be O(1) if compared on the fly).

## Follow-Up Questions
1. How would you modify the algorithm to output the actual sequence of swaps?
2. Can the approach be extended to support additional movable characters?
3. What is the complexity if the strings are extremely long (e.g., >10⁶ characters)?

## Key Takeaway
By verifying the relative order and movement constraints of `'L'` and `'R'` after stripping `'X'`, we can decide transformability in linear time.
