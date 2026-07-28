# 991. Broken Calculator

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/broken-calculator](https://leetcode.com/problems/broken-calculator)
**Companies:** Bloomberg, Google, Microsoft, Nutanix, Zopsmart

---

## Problem Description
You are given two integers `startValue` and `target`. You can perform two operations on `startValue`: multiply it by 2, or subtract 1. Return the minimum number of operations required to transform `startValue` into `target`.

## Examples
- Input: `startValue = 2`, `target = 3` → Output: `2`. Operations: `2 * 2 = 4`, then `4 - 1 = 3`.
- Input: `startValue = 5`, `target = 8` → Output: `2`. Operations: `5 - 1 = 4`, `4 * 2 = 8`.

## Approach
**Reverse Greedy** – Work backwards from `target` to `startValue`. If `target` is greater than `startValue`:
- If `target` is even, the last operation must have been a multiplication, so divide by 2.
- If `target` is odd, the last operation must have been a subtraction, so add 1.
Count each step until `target` ≤ `startValue`, then add the remaining difference.

```text
FUNCTION brokenCalc(startValue, target):
    SET ops ← 0
    WHILE target > startValue:
        IF target MOD 2 = 0:
            SET target ← target / 2
        ELSE:
            SET target ← target + 1
        SET ops ← ops + 1
    RETURN ops + (startValue - target)
```

## Walkthrough
For `startValue = 2`, `target = 3`:
1. `target` (3) > 2 and odd → `target = 4`, ops=1.
2. `target` (4) > 2 and even → `target = 2`, ops=2.
Now `target == startValue`, total ops = 2.

## Complexity Analysis
- **Time:** O(log target) because each division halves the value.
- **Space:** O(1) extra space.

## Follow‑Up Questions
1. How would the solution change if the allowed operations were `*3` and `+1`?
2. Can you compute the sequence of operations, not just the count?
3. What if both multiplication and subtraction have different costs?

## Key Takeaway
Reversing the process turns a branching forward search into a deterministic greedy walk, yielding a logarithmic‑time solution.
