# 517. Super Washing Machines

**Difficulty:** 🔴 Hard
**Companies:** Amazon, Google

---

## Problem Description
You are given an array `machines` where `machines[i]` is the number of dresses in the i‑th washing machine. In one move, you can choose any subset of machines and simultaneously transfer one dress from each selected machine to one of its adjacent machines. Return the minimum number of moves required to make all machines have the same number of dresses. If it is impossible, return `-1`.

## Examples
**Example 1:**
```
Input: machines = [1,0,5]
Output: 3
Explanation:
1) Move a dress from machine 2 to machine 1 → [2,0,4]
2) Move a dress from machine 2 to machine 1 → [3,0,3]
3) Move a dress from machine 1 to machine 0 → [2,1,3] → balanced after redistribution.
```

**Example 2:**
```
Input: machines = [0,3,0]
Output: 2
```

## Approach
First check feasibility: the total number of dresses must be divisible by the number of machines. Let `target = total / n`. While scanning the array, keep a running sum of the excess dresses transferred so far (`runningSum`). For each machine, the number of moves needed is the maximum of:
1. The absolute value of `runningSum` (dresses that must flow through this position), and
2. The local surplus/deficit `machines[i] - target`.
The answer is the maximum of these values over all machines.

```text
FUNCTION findMinMoves(machines):
    SET total ← SUM(machines)
    SET n ← LENGTH(machines)
    IF total MOD n ≠ 0:
        RETURN -1
    SET target ← total DIV n
    SET maxMoves ← 0
    SET runningSum ← 0
    FOR m IN machines:
        SET diff ← m - target
        SET runningSum ← runningSum + diff
        SET maxMoves ← MAX(maxMoves, ABS(runningSum), diff)
    RETURN maxMoves
```

## Walkthrough
For `machines = [1,0,5]`:
- `target = (1+0+5)/3 = 2`.
- Index 0: diff = -1, runningSum = -1, maxMoves = 1.
- Index 1: diff = -2, runningSum = -3, maxMoves = 3 (abs(runningSum)).
- Index 2: diff = 3, runningSum = 0, maxMoves remains 3.
Result = 3 moves.

## Complexity Analysis
- **Time:** O(n) – single pass.
- **Space:** O(1) – only a few scalar variables.

## Follow-Up Questions
1. How would the algorithm change if machines were arranged in a circle?
2. Can you compute the moves using a prefix‑sum array instead of a running sum?
3. What if each move could transfer more than one dress at a time?

## Key Takeaway
Balancing loads reduces to tracking cumulative surplus; the worst‑case absolute cumulative imbalance determines the minimum moves.
