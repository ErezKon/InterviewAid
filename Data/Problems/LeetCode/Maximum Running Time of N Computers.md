# 2141. Maximum Running Time of N Computers

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-running-time-of-n-computers](https://leetcode.com/problems/maximum-running-time-of-n-computers)
**Companies:** Amazon, Bloomberg, Capital One, Deutsche Bank, Google, Meta

---

## Problem Description

You have `n` computers. You are given the integer `n` and a **0-indexed** integer array `batteries` where the `i^th` battery can **run** a computer for `batteries[i]` minutes. You are interested in running **all** `n` computers **simultaneously** using the given batteries.

Initially, you can insert **at most one battery** into each computer. After that and at any integer time moment, you can remove a battery from a computer and insert another battery **any number of times**. The inserted battery can be a totally new battery or a battery from another computer. You may assume that the removing and inserting processes take no time.

Note that the batteries cannot be recharged.

Return *the **maximum** number of minutes you can run all the *`n`* computers simultaneously.*

**Constraints:**
- `1 <= n <= batteries.length <= 10^5`
- `1 <= batteries[i] <= 10^9`

## Examples

**Example 1:**
```
Input: n = 2, batteries = [3,3,3]
Output: 4
Explanation: Initially, insert battery 0 into the first computer and battery 1 into the second computer.
After two minutes, remove battery 1 from the second computer and insert battery 2 instead. Note that battery 1 can still run for one minute.
At the end of the third minute, battery 0 is drained, and you need to remove it from the first computer and insert battery 1 instead.
By the end of the fourth minute, battery 1 is also drained, and the first computer is no longer running.
We can run the two computers simultaneously for at most 4 minutes, so we return 4.
```

**Example 2:**
```
Input: n = 2, batteries = [1,1,1,1]
Output: 2
Explanation: Initially, insert battery 0 into the first computer and battery 2 into the second computer.
After one minute, battery 0 and battery 2 are drained so you need to remove them and insert battery 1 into the first computer and battery 3 into the second computer.
After another minute, battery 1 and battery 3 are also drained so the first and second computers are no longer running.
We can run the two computers simultaneously for at most 2 minutes, so we return 2.
```

## Approach
**Binary Search on feasible runtime** – The predicate “can all computers run for `t` minutes?” can be checked by summing `min(battery, t)` over all batteries; if the sum ≥ `n * t`, the runtime is feasible.

### Pseudocode
```text
FUNCTION maxRunTime(n, batteries):
    SET lo ← 0
    SET hi ← SUM(batteries) / n  // upper bound per computer
    WHILE lo < hi:
        SET mid ← (lo + hi + 1) DIV 2
        SET total ← 0
        FOR each b IN batteries:
            SET total ← total + MIN(b, mid)
        IF total >= n * mid:
            SET lo ← mid
        ELSE:
            SET hi ← mid - 1
    RETURN lo
```

## Walkthrough
For `n = 3`, `batteries = [3,3,3,3]`:
- `hi = SUM/ n = 12/3 = 4`
- `mid = (0+4+1)//2 = 2`; total = 2+2+2+2 = 8 ≥ 3*2 → lo=2
- `mid = (2+4+1)//2 = 3`; total = 3+3+3+3 = 12 ≥ 9 → lo=3
- `mid = (3+4+1)//2 = 4`; total = 3+3+3+3 = 12 ≥ 12 → lo=4
- Loop ends, answer = 4.

## Complexity Analysis
- **Time:** O(m log S) where `m = batteries.length` and `S` is the sum of battery capacities.
- **Space:** O(1) – only a few scalar variables.

## Follow-Up Questions
1. How would the algorithm change if each computer must use whole batteries (no splitting)?
2. What if batteries can be recharged after a certain cooldown period?
3. Can you extend the solution to handle a scenario where some computers have higher power requirements than others?

## Key Takeaway
Binary searching the runtime and checking feasibility with a simple sum of capped battery contributions yields an optimal O(m log S) solution.
