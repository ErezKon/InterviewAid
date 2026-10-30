# 754. Reach a Number

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/reach-a-number](https://leetcode.com/problems/reach-a-number)
**Companies:** Amazon, Bloomberg, Google, Ibm, Inmobi, Meesho, Meta, Microsoft
---

## Problem Description
You are standing at position `0` on an infinite number line. There is a destination at position `target`.

You can make some number of moves `numMoves` so that:

- On each move, you can either go left or right.
- During the `iᵗʰ` move (starting from `i == 1` to `i == numMoves`), you take `i` steps in the chosen direction.

Given the integer `target`, return *the **minimum** number of moves required (i.e., the minimum* `numMoves`*) to reach the destination*.

**Constraints:**

- `-10⁹ <= target <= 10⁹`
- `target != 0`

## Examples

```
Example 1:
  Input: target = 2
  Output: 3
  Explanation:
    On the 1st move, we step from 0 to 1 (1 step).
    On the 2nd move, we step from 1 to -1 (2 steps).
    On the 3rd move, we step from -1 to 2 (3 steps).
```

```
Example 2:
  Input: target = 3
  Output: 2
  Explanation:
    On the 1st move, we step from 0 to 1 (1 step).
    On the 2nd move, we step from 1 to 3 (2 steps).
```

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
