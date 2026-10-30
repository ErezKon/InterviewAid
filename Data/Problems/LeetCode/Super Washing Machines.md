# 517. Super Washing Machines

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/super-washing-machines](https://leetcode.com/problems/super-washing-machines)
**Companies:** Amazon, Google

---

## Problem Description

You have `n` super washing machines on a line. Initially, each washing machine has some dresses or is empty.

For each move, you could choose any `m` (`1 <= m <= n`) washing machines, and pass one dress of each washing machine to one of its adjacent washing machines at the same time.

Given an integer array `machines` representing the number of dresses in each washing machine from left to right on the line, return *the minimum number of moves to make all the washing machines have the same number of dresses*. If it is not possible to do it, return `-1`.

**Constraints:**
- `n == machines.length`
- `1 <= n <= 10^4`
- `0 <= machines[i] <= 10^5`

## Examples

**Example 1:**
```
Input: machines = [1,0,5]
Output: 3
Explanation:
1st move:    1     0 <-- 5    =>    1     1     4
2nd move:    1 <-- 1 <-- 4    =>    2     1     3
3rd move:    2     1 <-- 3    =>    2     2     2
```

**Example 2:**
```
Input: machines = [0,3,0]
Output: 2
Explanation:
1st move:    0 <-- 3     0    =>    1     2     0
2nd move:    1     2 --> 0    =>    1     1     1
```

**Example 3:**
```
Input: machines = [0,2,0]
Output: -1
Explanation:
It's impossible to make all three washing machines have the same number of dresses.
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
