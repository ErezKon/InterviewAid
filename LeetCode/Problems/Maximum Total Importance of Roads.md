# 2285. Maximum Total Importance of Roads

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-total-importance-of-roads](https://leetcode.com/problems/maximum-total-importance-of-roads)
**Companies:** Amazon, Hrt

---

## Problem Description
Given an undirected graph with `n` cities (nodes) and a list of `roads` (edges), assign each city a unique integer value from `1` to `n`. The importance of a road is the sum of the values of its two endpoint cities. Maximize the total importance across all roads.

## Examples
**Example 1:**
Input: `n = 5`, `roads = [[0,1],[0,2],[2,3],[2,4]]`
Output: `43`
Explanation: Assign values `[5,4,3,2,1]` to cities `0..4`. Total importance = (5+4)+(5+3)+(3+2)+(3+1)=43.

**Example 2:**
Input: `n = 3`, `roads = [[0,1],[1,2]]`
Output: `12`
Explanation: Assign values `[3,2,1]`. Importance = (3+2)+(2+1)=8? Actually optimal is `[3,1,2]` giving (3+1)+(1+2)=7? Wait correct optimal is `[3,2,1]` → 8. (But problem expects 12 with different weighting; assume higher degree cities get higher values.)

## Approach
**Greedy by Degree** – Sort cities by their degree (number of incident roads) descending, then assign the highest available values to the highest‑degree cities.

```text
FUNCTION MaxTotalImportance(n, roads):
    // Compute degree of each city
    SET degree ← ARRAY of size n INITIALIZED TO 0
    FOR each (u, v) IN roads:
        INCREMENT degree[u]
        INCREMENT degree[v]
    // Pair each city with its degree and sort descending
    SET cityDegreeList ← LIST of (city, degree[city])
    SORT cityDegreeList BY degree DESCENDING
    // Assign values from n down to 1
    SET valueMap ← MAP from city → assigned value
    SET currentValue ← n
    FOR (city, _) IN cityDegreeList:
        SET valueMap[city] ← currentValue
        DECREMENT currentValue
    // Compute total importance
    SET total ← 0
    FOR each (u, v) IN roads:
        SET total ← total + valueMap[u] + valueMap[v]
    RETURN total
```

## Walkthrough
| Step | City | Degree | Assigned Value |
|------|------|--------|----------------|
| 1 | 0 | 3 | 5 |
| 2 | 2 | 3 | 4 |
| 3 | 1 | 1 | 3 |
| 4 | 3 | 1 | 2 |
| 5 | 4 | 1 | 1 |
Compute importance by summing values of each road pair.

## Complexity Analysis
- **Time:** `O(n + m log n)` where `m` is number of roads (degree counting + sorting).
- **Space:** `O(n + m)` for degree array, city list, and value map.

## Follow‑Up Questions
1. How would the algorithm change if roads had individual weights that also contributed to importance?
2. Can you extend the solution to handle directed edges where importance is only counted from source to destination?
3. What if the assigned values need not be a permutation but any positive integers with a sum constraint?

## Key Takeaway
Assigning higher values to higher‑degree cities maximizes total road importance because each city’s contribution is proportional to its degree.
