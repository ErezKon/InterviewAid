# 3666. Minimum Operations to Equalize Binary String

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-operations-to-equalize-binary-string](https://leetcode.com/problems/minimum-operations-to-equalize-binary-string)
**Companies:** Amazon, Google, Infosys, Microsoft

---

## Problem Description
You are given a binary string `s`, and an integer `k`.

In one operation, you must choose **exactly** `k` **different** indices and **flip** each `'0'` to `'1'` and each `'1'` to `'0'`.

Return the **minimum** number of operations required to make all characters in the string equal to `'1'`. If it is not possible, return `-1`.

**Constraints:**
- `1 <= s.length <= 10^5`
- `s[i]` is either `'0'` or `'1'`.
- `1 <= k <= s.length`

## Examples

```
Example 1:
  Input: s = "110", k = 1
  Output: 1
  Explanation:
  - There is one '0' in s.
  - Since k = 1, we can flip it directly in one operation.
```

```
Example 2:
  Input: s = "0101", k = 3
  Output: 2
  Explanation: One optimal set of operations choosing k = 3 indices in each operation is:
  - Operation 1: Flip indices [0, 1, 3]. s changes from "0101" to "1000".
  - Operation 2: Flip indices [1, 2, 3]. s changes from "1000" to "1111".
  Thus, the minimum number of operations is 2.
```

```
Example 3:
  Input: s = "101", k = 2
  Output: -1
  Explanation: Since k = 2 and s has only one '0', it is impossible to flip exactly k indices to make all '1'. Hence, the answer is -1.
```

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
