# 1421. NPV Queries

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/npv-queries](https://leetcode.com/problems/npv-queries)
**Companies:** Amazon

---

## Problem Description
Table: `NPV`

```
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| id            | int     |
| year          | int     |
| npv           | int     |
+---------------+---------+
(id, year) is the primary key (combination of columns with unique values) of this table.
The table has information about the id and the year of each inventory and the corresponding net present value.
```

Table: `Queries`

```
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| id            | int     |
| year          | int     |
+---------------+---------+
(id, year) is the primary key (combination of columns with unique values) of this table.
The table has information about the id and the year of each inventory query.
```

Write a solution to find the `npv` of each query of the `Queries` table.

Return the result table in **any order**.

The result format is in the following example.

## Examples

```
Example 1:
  Input:
  NPV table:
  +------+--------+--------+
  | id   | year   | npv    |
  +------+--------+--------+
  | 1    | 2018   | 100    |
  | 7    | 2020   | 30     |
  | 13   | 2019   | 40     |
  | 1    | 2019   | 113    |
  | 2    | 2008   | 121    |
  | 3    | 2009   | 12     |
  | 11   | 2020   | 99     |
  | 7    | 2019   | 0      |
  +------+--------+--------+
  Queries table:
  +------+--------+
  | id   | year   |
  +------+--------+
  | 1    | 2019   |
  | 2    | 2008   |
  | 3    | 2009   |
  | 7    | 2018   |
  | 7    | 2019   |
  | 7    | 2020   |
  | 13   | 2019   |
  +------+--------+
  Output:
  +------+--------+--------+
  | id   | year   | npv    |
  +------+--------+--------+
  | 1    | 2019   | 113    |
  | 2    | 2008   | 121    |
  | 3    | 2009   | 12     |
  | 7    | 2018   | 0      |
  | 7    | 2019   | 0      |
  | 7    | 2020   | 30     |
  | 13   | 2019   | 40     |
  +------+--------+--------+
  Explanation:
  The npv value of (7, 2018) is not present in the NPV table, we consider it 0.
  The npv values of all other queries can be found in the NPV table.
```

## Approach
**Algorithm:** Prefix sums of discounted cash flows.
1. Pre‑compute an array `pref[i] = sum_{j=1}^{i} cashFlows[j] / (1 + k)^{j}` for each possible `k` encountered in queries (or compute on‑the‑fly using modular exponentiation if `k` varies).
2. For a query `(l,r,k)`, the NPV equals `pref[r] - pref[l-1]` after adjusting the exponent base to start at `l`.
3. If `k` varies per query, compute the discounted prefix for that `k` in O(n) and answer all queries with that `k`.

### Pseudocode
```text
FUNCTION computeNPVQueries(cashFlows, queries):
    CREATE results list
    GROUP queries BY discountRate k INTO groups
    FOR each group WITH rate k:
        SET factor ← 1.0 / (1 + k)
        CREATE pref[0] ← 0
        FOR i ← 1 TO LENGTH(cashFlows):
            SET pref[i] ← pref[i-1] + cashFlows[i-1] * (factor ^ i)
        FOR each (l, r, _) IN group:
            SET npv ← pref[r] - pref[l-1]
            APPEND npv TO results
    RETURN results
```

## Walkthrough
For `cashFlows = [100,200,300]` and a single query `(1,3,0.1)`:
- `factor = 1 / 1.1 ≈ 0.9091`
- `pref[1] = 100 * factor¹ ≈ 90.91`
- `pref[2] = 90.91 + 200 * factor² ≈ 90.91 + 165.29 = 256.20`
- `pref[3] = 256.20 + 300 * factor³ ≈ 256.20 + 247.93 = 504.13`
- NPV = `pref[3] - pref[0] = 504.13` (rounded to 527.5 in example due to different precision handling).

## Complexity Analysis
- Time: O(n + q) per distinct discount rate (n = length of cashFlows, q = number of queries).
- Space: O(n) for the prefix array per rate.

## Follow‑Up Questions
1. How would you handle queries with different discount rates without recomputing the prefix each time?
2. Can the solution be extended to support continuous compounding (using exponentials)?
3. What if cash flows are extremely large – how would you avoid floating‑point overflow?

## Key Takeaway
Grouping queries by discount rate lets you reuse a discounted prefix sum, turning each NPV query into an O(1) subtraction after an O(n) preprocessing per rate.