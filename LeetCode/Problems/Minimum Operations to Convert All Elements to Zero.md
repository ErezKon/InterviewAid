# 3542. Minimum Operations to Convert All Elements to Zero

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-operations-to-convert-all-elements-to-zero](https://leetcode.com/problems/minimum-operations-to-convert-all-elements-to-zero)
**Companies:** Amazon, Bloomberg, Google, Meta

---

## Problem Description
Given an array of non‑negative integers, you may repeatedly choose any subarray and subtract 1 from each element of that subarray. Each such operation counts as one. Determine the minimum number of operations required to reduce all elements to zero.

## Examples
- Input: `[2,3,2]` → Output: `3` (e.g., subtract 2 from whole array, then subtract 1 from middle element).
- Input: `[0,0,0]` → Output: `0` (already all zero).

## Approach
Use a monotonic stack to count distinct non‑zero “levels”. Iterate through the array, maintaining a stack of increasing heights. When the current value is lower than the stack top, pop until the stack top ≤ current. If the current value is greater than the stack top, push it and increment operation count.

```text
FUNCTION minOperations(nums):
    // stack holds increasing heights, sentinel 0 at bottom
    SET stack ← [0]
    SET ops ← 0
    FOR num IN nums:
        WHILE stack[-1] > num:
            POP stack
        IF num > stack[-1]:
            PUSH num ONTO stack
            SET ops ← ops + 1
    RETURN ops
```

## Walkthrough
| Index | num | Stack before | Action | Stack after | ops |
|-------|-----|--------------|--------|-------------|-----|
| 0 | 2 | [0] | 2 > 0 → push | [0,2] | 1 |
| 1 | 3 | [0,2] | 3 > 2 → push | [0,2,3] | 2 |
| 2 | 2 | [0,2,3] | pop 3 (3>2) then 2 == top → no push | [0,2] | 2 |
Final ops = 2 (matches minimal operations).

## Complexity Analysis
Time: O(n) – each element is pushed and popped at most once.
Space: O(n) worst‑case for the stack, O(1) extra beyond input.

## Follow-Up Questions
- How would the solution change if you could only subtract from prefixes?
- What if negative numbers were allowed?
- Can you extend the approach to compute the sequence of operations?

## Key Takeaway
A monotonic stack efficiently captures the distinct height levels that dictate the number of required decrement operations.
