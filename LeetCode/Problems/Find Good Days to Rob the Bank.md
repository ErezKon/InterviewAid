# 2100. Find Good Days to Rob the Bank

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-good-days-to-rob-the-bank](https://leetcode.com/problems/find-good-days-to-rob-the-bank)
**Companies:** Amazon, Google

---

## Problem Description
You are given an integer array `security` where `security[i]` is the number of guards on day `i`. A day `i` is considered a good day to rob the bank if there are at least `time` consecutive days before `i` with non‑increasing guard counts and at least `time` consecutive days after `i` with non‑decreasing guard counts. Return a list of all good days.

## Examples
```text
Input: security = [5,3,3,3,5,6,2], time = 2
Output: [2,3]
Explanation: Days 2 and 3 satisfy the required non‑increasing and non‑decreasing windows.

Input: security = [1,1,1,1,1], time = 0
Output: [0,1,2,3,4]
```

## Approach
Pre‑compute two auxiliary arrays:
- `left[i]` = number of consecutive days ending at `i` where `security` is non‑increasing.
- `right[i]` = number of consecutive days starting at `i` where `security` is non‑decreasing.
A day `i` is good if `left[i] >= time` and `right[i] >= time`.

## Pseudocode
```text
FUNCTION goodDays(security, time):
    SET n ← LENGTH(security)
    SET left ← array of n zeros
    SET right ← array of n zeros
    // fill left
    FOR i FROM 1 TO n-1:
        IF security[i] <= security[i-1]:
            left[i] ← left[i-1] + 1
        ELSE:
            left[i] ← 0
    // fill right
    FOR i FROM n-2 DOWNTO 0:
        IF security[i] <= security[i+1]:
            right[i] ← right[i+1] + 1
        ELSE:
            right[i] ← 0
    SET result ← []
    FOR i FROM 0 TO n-1:
        IF left[i] >= time AND right[i] >= time:
            APPEND i TO result
    RETURN result
```

## Walkthrough
| i | security[i] | left[i] | right[i] | good? |
|---|-------------|---------|----------|-------|
| 0 | 5 | 0 | 0 | no |
| 1 | 3 | 1 (5≥3) | 0 | no |
| 2 | 3 | 2 (3≤3) | 2 (3≤5≤6) | yes |
| 3 | 3 | 3 | 1 | yes |
| ... | ... | ... | ... | ... |
Result → [2,3]

## Complexity Analysis
- **Time:** O(n) – two linear passes.
- **Space:** O(n) for the auxiliary arrays (can be reduced to O(1) with two‑pointer sliding windows).

## Follow‑Up Questions
- How would you adapt the solution for a streaming input where the array is not fully known in advance?
- Can you solve the problem using only O(1) extra space?
- What changes are needed if the condition uses strict inequality instead of non‑strict?

## Key Takeaway
Prefix counts of monotonic segments let you evaluate each day in constant time, turning a seemingly quadratic check into a linear‑time solution.
