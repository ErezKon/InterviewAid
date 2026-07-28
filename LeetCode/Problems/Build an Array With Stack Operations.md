# 1441. Build an Array With Stack Operations

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/build-an-array-with-stack-operations](https://leetcode.com/problems/build-an-array-with-stack-operations)
**Companies:** Bloomberg, Google, Microsoft

---

## Problem Description
You are given a strictly increasing integer array `target` and an integer `n`. Starting with an empty stack and a pointer `curr` at `1`, you can perform two operations:
1. **Push** – push `curr` onto the stack and increment `curr`.
2. **Pop** – pop the top element from the stack.
Return the sequence of operations that builds the `target` array and stops when `curr` exceeds `n`. The operations must result in the stack containing exactly the elements of `target` in order.

## Examples
- Input: `target = [1,3], n = 3` → Output: `["Push","Push","Pop","Push"]`. Push 1, push 2 then pop it, then push 3.
- Input: `target = [2,3,4], n = 4` → Output: `["Push","Pop","Push","Push","Push"]`.

## Approach
**Simulation with Two Pointers** – Iterate through `target` while maintaining `curr`. For each desired value `t`:
- Push and immediately pop all numbers from `curr` up to `t-1` (these are not needed).
- Push `t`.
Increment `curr` accordingly. Stop when all target elements are processed.

```text
FUNCTION buildArray(target, n):
    SET ops ← empty list
    SET curr ← 1
    FOR t IN target:
        WHILE curr < t:
            ops.APPEND("Push")
            ops.APPEND("Pop")
            SET curr ← curr + 1
        ops.APPEND("Push")
        SET curr ← curr + 1
    RETURN ops
```

## Walkthrough
Target `[1,3]`, `n = 3`:
1. `t = 1`, `curr = 1` → no while loop, `Push` (ops: Push), `curr = 2`.
2. `t = 3`, `curr = 2` → while `curr < 3`:
   - `Push` (push 2), `Pop` (remove 2), `curr = 3`.
   - Exit loop, then `Push` (push 3).
Result `['Push','Push','Pop','Push']`.

## Complexity Analysis
- **Time:** O(n) in the worst case, as each number from 1 to `n` is considered at most once.
- **Space:** O(k) for the output list, where `k` is the number of operations (≤ 2·n).

## Follow‑Up Questions
1. How would you modify the algorithm if the stack could hold at most `m` elements at any time?
2. Can you generate the operations in reverse order (starting from the last target element)?
3. What if the `target` array is not strictly increasing?

## Key Takeaway
By simulating the process and discarding unwanted numbers with immediate push‑pop pairs, we can construct the required operation sequence in linear time.
