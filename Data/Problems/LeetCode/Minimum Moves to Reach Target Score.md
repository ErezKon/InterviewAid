# 2139. Minimum Moves to Reach Target Score

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-moves-to-reach-target-score](https://leetcode.com/problems/minimum-moves-to-reach-target-score)
**Companies:** Amazon, Meta, Wayfair

---

## Problem Description

You are playing a game with integers. You start with the integer `1` and you want to reach the integer `target`.

In one move, you can either:

- **Increment** the current integer by one (i.e., `x = x + 1`).
- **Double** the current integer (i.e., `x = 2 * x`).

You can use the **increment** operation **any** number of times, however, you can only use the **double** operation **at most** `maxDoubles` times.

Given the two integers `target` and `maxDoubles`, return *the minimum number of moves needed to reach *`target`* starting with *`1`.

**Constraints:**
- `1 <= target <= 10^9`
- `0 <= maxDoubles <= 100`

## Examples

**Example 1:**
```
Input: target = 5, maxDoubles = 0
Output: 4
Explanation: Keep incrementing by 1 until you reach target.
```

**Example 2:**
```
Input: target = 19, maxDoubles = 2
Output: 7
Explanation: Initially, x = 1
Increment 3 times so x = 4
Double once so x = 8
Increment once so x = 9
Double again so x = 18
Increment once so x = 19
```

**Example 3:**
```
Input: target = 10, maxDoubles = 4
Output: 4
Explanation: Initially, x = 1
Increment once so x = 2
Double once so x = 4
Increment once so x = 5
Double again so x = 10
```

## Approach

**Algorithm:** Greedy reverse simulation.

- Work backwards from `target` to 1.
- If a double is still available and the current value is even, halve it (reverse of a double).
- Otherwise, subtract 1 (reverse of a +1).
- When no doubles remain, the remaining distance is covered by simple increments.

```text
FUNCTION minMoves(target, maxDoubles):
    moves ← 0
    WHILE target > 1:
        IF maxDoubles > 0 AND target MOD 2 == 0:
            target ← target / 2
            maxDoubles ← maxDoubles - 1
        ELSE IF maxDoubles > 0:
            target ← target - 1
        ELSE:
            moves ← moves + (target - 1)
            BREAK
        moves ← moves + 1
    RETURN moves
```

## Walkthrough

Take `target = 10`, `maxDoubles = 4`.
1. `target` is even and a double is available → halve to 5 (moves=1, doubles=3).
2. 5 is odd → subtract 1 → 4 (moves=2).
3. 4 is even → halve to 2 (moves=3, doubles=2).
4. 2 is even → halve to 1 (moves=4, doubles=1).
5. Reached 1, total moves = 4, which is optimal.

## Complexity Analysis

- **Time:** O(log target) – each iteration reduces the target by at least half or by one.
- **Space:** O(1) – only a few scalar variables are used.

## Follow-Up Questions

- How would the solution change if the `+1` operation could be replaced by `+k` for a given `k`?
- What if the number of allowed doubles is unlimited?
- Can we extend the approach to compute the actual sequence of operations?

## Key Takeaway

> Reverse simulation turns forward additions/doubles into backward subtractions/halves, yielding a greedy O(log target) solution.
