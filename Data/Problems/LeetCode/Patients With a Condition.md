# 1527. Patients With a Condition

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/patients-with-a-condition](https://leetcode.com/problems/patients-with-a-condition)
**Companies:** Amazon, Bloomberg, Google

---

## Problem Description
Given a table `Patients` with a column `conditions` that stores a space‑separated list of medical condition codes for each patient, return all rows where the patient has a condition code that starts with the prefix `DIAB1` (e.g., `DIAB10`, `DIAB1A`). The prefix may appear at the beginning of the string or after a space.

Constraints: The table may contain up to 10⁵ rows; each `conditions` string length ≤ 100.

## Examples
| patients.id | conditions | Result |
|-------------|------------|--------|
| 1 | "DIAB10 HYPER" | ✅ returned |
| 2 | "HYPER DIAB1A" | ✅ returned |
| 3 | "HYPER HYPOT" | ❌ not returned |

## Approach
Use SQL `LIKE` patterns to match the prefix at the start or after a space.

```text
SELECT *
FROM Patients
WHERE conditions LIKE 'DIAB1%'
   OR conditions LIKE '% DIAB1%';
```
The first pattern captures rows where the prefix is the first token; the second captures rows where it appears later.

## Walkthrough
For a row with `conditions = 'HYPER DIAB1A'`:
- The expression `conditions LIKE 'DIAB1%'` is false because the string does not start with the prefix.
- The expression `conditions LIKE '% DIAB1%'` matches because the substring `' DIAB1'` appears, so the row is selected.

## Complexity Analysis
- Time: O(N) where N is the number of rows, as each row is evaluated against two simple pattern matches.
- Space: O(1) additional space beyond the result set.

## Follow‑Up Questions
1. How would you handle case‑insensitive matching?
2. What if the condition codes are stored in a separate normalized table with a many‑to‑many relationship?
3. Can you write a query to return only the matching condition codes instead of the whole row?

## Key Takeaway
Combining two `LIKE` patterns—one for the start of the string and one for a space‑prefixed occurrence—efficiently finds rows containing a specific condition prefix.
