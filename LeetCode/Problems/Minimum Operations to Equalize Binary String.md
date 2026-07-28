# 3666. Minimum Operations to Equalize Binary String

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-operations-to-equalize-binary-string](https://leetcode.com/problems/minimum-operations-to-equalize-binary-string)
**Companies:** Amazon, Google, Infosys, Microsoft

---

## Problem Description
Given a binary string `s`, you may perform an operation that selects any contiguous substring and flips all its bits (changing `0` to `1` and `1` to `0`). Determine the minimum number of operations required to make all characters in `s` equal (either all `0`s or all `1`s).

## Examples
- Input: `"0101"` → Output: `2` (flip the first two characters to get `"1101"`, then flip the last three to obtain `"1111"`).
- Input: `"111"` → Output: `0` (already equal).

## Approach
Consider both possible target characters (`0` and `1`). For a chosen target, scan the string and count the number of contiguous groups of characters that differ from the target; each group requires one flip. The answer is the minimum of the two counts.

```text
FUNCTION minOperations(s):
    // helper to count groups not equal to target
    FUNCTION countGroups(target):
        SET groups ← 0
        SET i ← 0
        WHILE i < LENGTH(s):
            IF s[i] ≠ target:
                SET groups ← groups + 1
                // skip the whole mismatched segment
                WHILE i < LENGTH(s) AND s[i] ≠ target:
                    SET i ← i + 1
            ELSE:
                SET i ← i + 1
        RETURN groups
    SET opsZero ← countGroups('0')
    SET opsOne ← countGroups('1')
    RETURN MIN(opsZero, opsOne)
```

## Walkthrough
| Step | Target | s | Groups of mismatches | Operations |
|------|--------|---|----------------------|------------|
| 1 | `0` | `0101` | segments `[1]` at index1 and `[1]` at index3 → 2 groups | 2 |
| 2 | `1` | `0101` | segments `[0]` at index0 and `[0]` at index2 → 2 groups | 2 |
Minimum = 2.

## Complexity Analysis
Time: O(n) – single pass for each target (constant factor 2). Space: O(1).

## Follow-Up Questions
- How would the solution change if flips could only be applied to prefixes?
- Can you extend the method to return the actual sequence of flip operations?
- What is the answer for strings with very large length (streaming input)?

## Key Takeaway
The minimal flips equal the number of mismatched contiguous groups for the optimal target character; scanning twice yields the answer in linear time.
