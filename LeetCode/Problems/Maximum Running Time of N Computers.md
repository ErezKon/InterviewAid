# 2141. Maximum Running Time of N Computers

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-running-time-of-n-computers](https://leetcode.com/problems/maximum-running-time-of-n-computers)
**Companies:** Amazon, Bloomberg, Capital One, Deutsche Bank, Google, Meta

---

## Problem Description
You are given `n` computers and an array `batteries` where `batteries[i]` is the amount of charge (in minutes) of the i‑th battery. Each computer can use any number of batteries, but a battery can power only one computer at a time. Determine the maximum integer `t` such that all `n` computers can run simultaneously for at least `t` minutes.

Constraints: `1 <= n <= 10^5`, `1 <= batteries.length <= 10^5`, `1 <= batteries[i] <= 10^9`.

## Examples
| n | batteries | Output | Explanation |
|---|-----------|--------|-------------|
| 3 | [3,3,3,3] | 4 | Total charge = 12. Each computer can run 4 minutes using portions of the batteries. |
| 2 | [1,2,3,4] | 5 | Distribute batteries to achieve 5 minutes for both computers. |

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

## Follow‑Up Questions
1. How would the algorithm change if each computer must use whole batteries (no splitting)?
2. What if batteries can be recharged after a certain cooldown period?
3. Can you extend the solution to handle a scenario where some computers have higher power requirements than others?

## Key Takeaway
Binary searching the runtime and checking feasibility with a simple sum of capped battery contributions yields an optimal O(m log S) solution.
