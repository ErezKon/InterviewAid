# 1014. Best Sightseeing Pair

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/best-sightseeing-pair](https://leetcode.com/problems/best-sightseeing-pair)
**Companies:** Amazon, Bloomberg, Google, Meta, Nutanix, Wayfair

---

## Problem Description
Given an array `values` where `values[i]` represents the value of a sightseeing spot at position `i`, find two different spots `i` and `j` (`i < j`) that maximize the score `values[i] + values[j] + i - j`. Return the maximum possible score.

## Examples
**Example 1:**
```
Input: values = [8,1,5,2,6]
Output: 11
Explanation: Choose i = 0, j = 2 → 8 + 5 + 0 - 2 = 11.
```

**Example 2:**
```
Input: values = [1,2]
Output: 2
Explanation: Only pair (0,1) gives 1 + 2 + 0 - 1 = 2.
```

## Approach
**One‑Pass Scan — O(n)**
While iterating `j` from left to right, keep track of the best `values[i] + i` seen so far (`maxI`). For each `j`, the candidate score is `maxI + values[j] - j`. Update the answer and possibly `maxI`.

```text
FUNCTION maxScoreSightseeingPair(values):
    maxI ← values[0] + 0          // best values[i] + i so far
    maxScore ← 0
    FOR j ← 1 TO LENGTH(values)-1:
        candidate ← maxI + values[j] - j
        maxScore ← MAX(maxScore, candidate)
        maxI ← MAX(maxI, values[j] + j)
    RETURN maxScore
```

## Walkthrough
For `values = [8,1,5,2,6]`:
| j | values[j] | maxI before | candidate = maxI + values[j] - j | maxScore | maxI after |
|---|-----------|------------|----------------------------------|----------|-----------|
|1|1|8+0=8|8 + 1 - 1 = 8|8|max(8,1+1)=8|
|2|5|8|8 + 5 - 2 = 11|11|max(8,5+2)=8|
|3|2|8|8 + 2 - 3 = 7|11|max(8,2+3)=8|
|4|6|8|8 + 6 - 4 = 10|11|max(8,6+4)=10|
The maximum score remains 11.

## Complexity Analysis
- **Time:** O(n) – single pass through the array.
- **Space:** O(1) – only a few scalar variables.

## Follow‑Up Questions
1. How would you adapt the solution if the score formula were `values[i] + values[j] - |i - j|`?
2. Can you extend the approach to find the top‑k best pairs?
3. What changes are needed if the array is streamed and you cannot store all values?

## Key Takeaway
By rewriting the score as `(values[i] + i) + (values[j] - j)`, we can maintain the best left component while scanning, turning a quadratic problem into a linear‑time solution.