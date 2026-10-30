# 777. Swap Adjacent in LR String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/swap-adjacent-in-lr-string](https://leetcode.com/problems/swap-adjacent-in-lr-string)
**Companies:** Bloomberg, Google, Lg Electronics

---

## Problem Description

In a string composed of `'L'`, `'R'`, and `'X'` characters, like `"RXXLRXRXL"`, a move consists of either replacing one occurrence of `"XL"` with `"LX"`, or replacing one occurrence of `"RX"` with `"XR"`. Given the starting string `start` and the ending string `result`, return `True` if and only if there exists a sequence of moves to transform `start` to `result`.

**Constraints:**
- `1 <= start.length <= 10^4`
- `start.length == result.length`
- Both `start` and `result` will only consist of characters in `'L'`, `'R'`, and `'X'`.

## Examples

**Example 1:**
```
Input: start = "RXXLRXRXL", result = "XRLXXRRLX"
Output: true
Explanation: We can transform start to result following these steps:
RXXLRXRXL ->
XRXLRXRXL ->
XRLXRXRXL ->
XRLXXRRXL ->
XRLXXRRLX
```

**Example 2:**
```
Input: start = "X", result = "L"
Output: false
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
