# 957. Prison Cells After N Days

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/prison-cells-after-n-days](https://leetcode.com/problems/prison-cells-after-n-days)
**Companies:** Amazon

---

## Problem Description
There are 8 prison cells in a row, each either occupied (`1`) or vacant (`0`). Every day, each cell (except the first and last) becomes occupied if its two adjacent cells were both occupied or both vacant the previous day; otherwise it becomes vacant. The first and last cells become vacant every day. Given the initial state `cells` (array of 8 integers) and an integer `n`, return the state of the cells after `n` days.

## Examples
**Example 1**
```
Input: cells = [0,1,0,1,1,0,0,1], n = 7
Output: [0,0,1,1,0,0,0,0]
```
The cells evolve daily according to the rule; after 7 days the configuration matches the output.

**Example 2**
```
Input: cells = [1,0,0,1,0,0,1,0], n = 1000000000
Output: [0,0,1,1,1,1,1,0]
```
A huge `n` requires detecting the repeating cycle.

## Approach
The state space of the 6 inner cells is only `2^6 = 64`, so the sequence of states must eventually repeat, forming a cycle. We simulate day by day while storing each seen state with the day index. When a repeated state is found, we compute the cycle length, reduce the remaining days modulo the cycle length, and simulate only the remaining steps.

### Pseudocode
```text
FUNCTION prisonAfterNDays(cells, n):
    SET seen ← MAP()
    SET day ← 0
    WHILE day < n:
        SET state ← TUPLE(cells)
        IF state IN seen:
            SET cycleLen ← day - seen[state]
            SET remaining ← (n - day) MOD cycleLen
            FOR _ ← 0 TO remaining - 1:
                SET cells ← nextDay(cells)
            RETURN cells
        END IF
        SET seen[state] ← day
        SET cells ← nextDay(cells)
        SET day ← day + 1
    END WHILE
    RETURN cells

FUNCTION nextDay(cells):
    SET new ← ARRAY(8, 0)
    FOR i ← 1 TO 6:
        IF cells[i-1] == cells[i+1]:
            SET new[i] ← 1
        ELSE:
            SET new[i] ← 0
        END IF
    END FOR
    RETURN new
```
The `nextDay` function applies the transformation rule to produce the next day's state.

## Walkthrough
For the initial state `[0,1,0,1,1,0,0,1]`:
1. Day 0 → state stored.
2. Compute Day 1 using `nextDay` → `[0,1,1,0,0,0,0,0]`.
3. Continue until a previously seen tuple reappears (after 14 days). The cycle length is 14, so for `n = 7` we simply simulate 7 steps.
The algorithm stops early when a cycle is detected, drastically reducing work for large `n`.

## Complexity Analysis
- **Time:** `O(min(n, 64))` – at most 64 iterations before a cycle is found; after that we only simulate the remainder.
- **Space:** `O(64)` – storage for seen states and a few auxiliary variables.

## Follow‑Up Questions
1. How would the solution change if the number of cells were not fixed at 8?
2. Can the cycle detection be performed using Floyd's Tortoise and Hare algorithm instead of a hashmap?
3. How would you adapt the algorithm to return the state after each day up to `n`?

## Key Takeaway
Because the inner cells have only 64 possible configurations, the daily evolution must eventually repeat; detecting this cycle lets us skip most of the simulation for large `n`.
