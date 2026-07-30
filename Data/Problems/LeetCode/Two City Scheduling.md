# 1029. Two City Scheduling

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/two-city-scheduling](https://leetcode.com/problems/two-city-scheduling)
**Companies:** Amazon, Bloomberg, Google, Meta, Oracle, Swiggy

---

## Problem Description
There are `2 * n` people each needing to travel to one of two cities, `A` or `B`. The `i`‑th person has a travel cost `costs[i][0]` to city A and `costs[i][1]` to city B. Exactly `n` people must be assigned to each city. Minimize the total travel cost.

## Examples
**Example 1:**
Input: `costs = [[10,20],[30,200],[400,50],[30,20]]`
Output: `110`
Explanation: Send person 0 and 3 to city A (cost 10 + 30) and persons 1 and 2 to city B (cost 200 + 50). Total = 110.

**Example 2:**
Input: `costs = [[259,770],[448,54],[926,667],[184,139],[840,118],[577,469]]`
Output: `1859`

## Approach
Compute the difference `diff = costA - costB` for each person. Sorting by `diff` (ascending) puts people who are cheaper to send to city A first and those cheaper for city B later. Assign the first `n` people to city A and the remaining `n` to city B.

## Walkthrough
| Person | costA | costB | diff (A‑B) |
|--------|-------|-------|------------|
| 0 | 10 | 20 | -10 |
| 1 | 30 | 200 | -170 |
| 2 | 400 | 50 | 350 |
| 3 | 30 | 20 | 10 |
After sorting by diff: persons 1,0,3,2. First two → city A, last two → city B.

## Complexity Analysis
- **Time:** `O(m log m)` where `m = 2n` for sorting.
- **Space:** `O(m)` to store the differences (or sort in‑place).

## Follow‑Up Questions
1. How would you adapt the solution if each city must receive a different number of people?
2. Can you solve the problem using a priority queue without sorting the entire list?
3. What if travel costs can be negative?

## Key Takeaway
Sorting by the cost difference directly reveals which people are most beneficial to assign to each city, enabling a greedy optimal assignment.
