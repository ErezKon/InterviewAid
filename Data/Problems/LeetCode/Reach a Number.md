# 754. Reach a Number

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/reach-a-number](https://leetcode.com/problems/reach-a-number)
**Companies:** Amazon, Bloomberg, Google, Ibm, Inmobi, Meesho, Meta, Microsoft
---

## Problem Description
Given an integer `target`, you start at position `0` on a number line. On the `i`‑th move you may move `i` steps either to the right (+i) or to the left (‑i). Return the minimum number of moves required to reach `target`.

## Examples
- Input: `target = 2` → Output: `3`. Sequence: `0 → 1 → 3 → 2`.
- Input: `target = 3` → Output: `2`. Sequence: `0 → 1 → 3`.

## Approach
The sum of the first `k` natural numbers is `k(k+1)/2`. Find the smallest `k` such that this sum is at least `|target|`. If the difference between the sum and `|target|` is even, we can flip the direction of some moves to exactly reach the target. Otherwise, increase `k` until the parity matches.

```text
FUNCTION reachNumber(target):
    SET target ← ABS(target)
    SET step ← 0
    SET sum ← 0
    WHILE sum < target OR (sum - target) MOD 2 != 0:
        SET step ← step + 1
        SET sum ← sum + step
    END WHILE
    RETURN step
END FUNCTION
```

## Walkthrough
| step | sum | sum‑target | parity | action |
|------|-----|------------|--------|--------|
|1|1|‑1|odd|continue|
|2|3|1|odd|continue|
|3|6|4|even|stop → answer `3` for target 2 |
|...|...|...|...|...|

## Complexity Analysis
- Time: O(√target) because the sum grows quadratically.
- Space: O(1).

## Follow‑Up Questions
1. How would you modify the algorithm for a target that can be any integer (including negative) without using `ABS`?
2. Can you compute the answer in O(1) time using a direct formula?
3. What if the step size increments by a different constant instead of 1?

## Key Takeaway
By accumulating the triangular numbers until the overshoot has even parity, we can flip a subset of moves to exactly land on the target, yielding the minimal step count.
