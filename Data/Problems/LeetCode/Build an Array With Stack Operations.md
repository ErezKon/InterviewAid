# 1441. Build an Array With Stack Operations

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/build-an-array-with-stack-operations](https://leetcode.com/problems/build-an-array-with-stack-operations)
**Companies:** Bloomberg, Google, Microsoft

---

## Problem Description
You are given an integer array `target` and an integer `n`.

You have an empty stack with the two following operations:

- **`"Push"`**: pushes an integer to the top of the stack.
- **`"Pop"`**: removes the integer on the top of the stack.

You also have a stream of the integers in the range `[1, n]`.

Use the two stack operations to make the numbers in the stack (from the bottom to the top) equal to `target`. You should follow the following rules:

- If the stream of the integers is not empty, pick the next integer from the stream and push it to the top of the stack.
- If the stack is not empty, pop the integer at the top of the stack.
- If, at any moment, the elements in the stack (from the bottom to the top) are equal to `target`, do not read new integers from the stream and do not do more operations on the stack.

Return *the stack operations needed to build* `target` following the mentioned rules. If there are multiple valid answers, return **any of them**.

**Constraints:**
- `1 ≤ target.length ≤ 100`
- `1 ≤ n ≤ 100`
- `1 ≤ target[i] ≤ n`
- `target` is strictly increasing.

## Examples
```
Example 1:
  Input: target = [1,3], n = 3
  Output: ["Push","Push","Pop","Push"]
  Explanation: Initially the stack s is empty. The last element is the top of the stack.
  Read 1 from the stream and push it to the stack. s = [1].
  Read 2 from the stream and push it to the stack. s = [1,2].
  Pop the integer on the top of the stack. s = [1].
  Read 3 from the stream and push it to the stack. s = [1,3].

Example 2:
  Input: target = [1,2,3], n = 3
  Output: ["Push","Push","Push"]
  Explanation: Initially the stack s is empty. The last element is the top of the stack.
  Read 1 from the stream and push it to the stack. s = [1].
  Read 2 from the stream and push it to the stack. s = [1,2].
  Read 3 from the stream and push it to the stack. s = [1,2,3].

Example 3:
  Input: target = [1,2], n = 4
  Output: ["Push","Push"]
  Explanation: Initially the stack s is empty. The last element is the top of the stack.
  Read 1 from the stream and push it to the stack. s = [1].
  Read 2 from the stream and push it to the stack. s = [1,2].
  Since the stack (from the bottom to the top) is equal to target, we stop the stack operations.
  The answers that read integer 3 from the stream are not accepted.
```

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
