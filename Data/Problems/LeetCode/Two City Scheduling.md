# 1029. Two City Scheduling

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/two-city-scheduling](https://leetcode.com/problems/two-city-scheduling)
**Companies:** Amazon, Bloomberg, Google, Meta, Oracle, Swiggy

---

## Problem Description

A company is planning to interview `2n` people. Given the array `costs` where `costs[i] = [aCost_i, bCost_i]`, the cost of flying the `i`th person to city `a` is `aCost_i`, and the cost of flying the `i`th person to city `b` is `bCost_i`.

Return *the minimum cost to fly every person to a city* such that exactly `n` people arrive in each city.

**Constraints:**
- `2 * n == costs.length`
- `2 <= costs.length <= 100`
- `costs.length` is even.
- `1 <= aCost_i, bCost_i <= 1000`

## Examples

**Example 1:**
```
Input: costs = [[10,20],[30,200],[400,50],[30,20]]
Output: 110
Explanation:
The first person goes to city A for a cost of 10.
The second person goes to city A for a cost of 30.
The third person goes to city B for a cost of 50.
The fourth person goes to city B for a cost of 20.

The total minimum cost is 10 + 30 + 50 + 20 = 110 to have half the people interviewing in each city.
```

**Example 2:**
```
Input: costs = [[259,770],[448,54],[926,667],[184,139],[840,118],[577,469]]
Output: 1859
```

**Example 3:**
```
Input: costs = [[515,563],[451,713],[537,709],[343,819],[855,779],[457,60],[650,359],[631,42]]
Output: 3086
```

## Approach
Compute the difference `diff = costA - costB` for each person. Sorting by `diff` (ascending) puts people who are cheaper to send to city A first and those cheaper for city B later. Assign the first `n` people to city A and the remaining `n` to city B.

## Walkthrough
| Person | costA | costB | diff (A-B) |
|--------|-------|-------|------------|
| 0 | 10 | 20 | -10 |
| 1 | 30 | 200 | -170 |
| 2 | 400 | 50 | 350 |
| 3 | 30 | 20 | 10 |
After sorting by diff: persons 1,0,3,2. First two → city A, last two → city B.

## Complexity Analysis
- **Time:** `O(m log m)` where `m = 2n` for sorting.
- **Space:** `O(m)` to store the differences (or sort in-place).

## Follow-Up Questions
1. How would you adapt the solution if each city must receive a different number of people?
2. Can you solve the problem using a priority queue without sorting the entire list?
3. What if travel costs can be negative?

## Key Takeaway
Sorting by the cost difference directly reveals which people are most beneficial to assign to each city, enabling a greedy optimal assignment.
