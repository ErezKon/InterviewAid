# 3214. Year on Year Growth Rate

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/year-on-year-growth-rate](https://leetcode.com/problems/year-on-year-growth-rate)
**Companies:** Amazon

---

## Problem Description
Given an array `revenues` where `revenues[i]` represents the revenue of a company in year `i`, compute the year‑on‑year growth rate for each consecutive pair of years. The growth rate for year `i` is defined as `(revenues[i] - revenues[i-1]) / revenues[i-1]`. Return the list of growth rates as floating‑point numbers. Constraints typically include `2 <= revenues.length <= 10^5` and `revenues[i] > 0`.

## Examples
**Example 1**
```
Input: revenues = [100, 150, 120, 180]
Output: [0.5, -0.2, 0.5]
Explanation:
- Year 1 growth = (150‑100)/100 = 0.5
- Year 2 growth = (120‑150)/150 = -0.2
- Year 3 growth = (180‑120)/120 = 0.5
```

**Example 2**
```
Input: revenues = [80, 80, 80]
Output: [0.0, 0.0]
```

## Approach
Iterate once through the array, compute the ratio for each adjacent pair, and store the result. Since each computation is O(1), the overall algorithm is linear.

```text
FUNCTION yearOnYearGrowth(revenues):
    SET n ← LENGTH(revenues)
    SET growthRates ← []
    FOR i ← 1 TO n-1:
        SET prev ← revenues[i-1]
        SET curr ← revenues[i]
        SET rate ← (curr - prev) / prev
        APPEND rate TO growthRates
    RETURN growthRates
```

## Walkthrough
| i | prev | curr | rate |
|---|------|------|------|
|1|100|150|0.5|
|2|150|120|-0.2|
|3|120|180|0.5|

The function returns `[0.5, -0.2, 0.5]`.

## Complexity Analysis
- **Time:** O(n) where n is the length of `revenues`.
- **Space:** O(n) for the output list (O(1) auxiliary space).

## Follow-Up Questions
1. How would you handle queries that ask for the average growth rate over a range of years?
2. What if the input size is huge and you need to stream the data without storing the entire array?
3. Can you extend the solution to compute compound annual growth rate (CAGR) over multiple years?

## Key Takeaway
A single pass over the revenue list yields all year‑on‑year growth rates, turning a seemingly repetitive calculation into a straightforward O(n) solution.
