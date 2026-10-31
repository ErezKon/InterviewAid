# 1482. Minimum Number of Days to Make m Bouquets

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets](https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets)
**Companies:** Adobe, Amazon, Barclays, Bloomberg, Flipkart, Google, Meta, Microsoft, Phonepe

---

## Problem Description

You are given an integer array `bloomDay`, an integer `m` and an integer `k`.

You want to make `m` bouquets. To make a bouquet, you need to use `k` **adjacent flowers** from the garden.

The garden consists of `n` flowers, the `i^th` flower will bloom in the `bloomDay[i]` and then can be used in **exactly one** bouquet.

Return the **minimum** number of days you need to wait to be able to make m bouquets from the garden. If it is impossible to make m bouquets return -1.

**Constraints:**
- `bloomDay.length == n`
- `1 <= n <= 10^5`
- `1 <= bloomDay[i] <= 10^9`
- `1 <= m <= 10^6`
- `1 <= k <= n`

## Examples

**Example 1:**
```
Input: bloomDay = [1,10,3,10,2], m = 3, k = 1
Output: 3
Explanation: Let us see what happened in the first three days. x means flower bloomed and _ means flower did not bloom in the garden.
We need 3 bouquets each should contain 1 flower.
After day 1: [x, _, _, _, _]   // we can only make one bouquet.
After day 2: [x, _, _, _, x]   // we can only make two bouquets.
After day 3: [x, _, x, _, x]   // we can make 3 bouquets. The answer is 3.
```

**Example 2:**
```
Input: bloomDay = [1,10,3,10,2], m = 3, k = 2
Output: -1
Explanation: We need 3 bouquets each has 2 flowers, that means we need 6 flowers. We only have 5 flowers so it is impossible to get the needed bouquets and we return -1.
```

**Example 3:**
```
Input: bloomDay = [7,7,7,7,12,7,7], m = 2, k = 3
Output: 12
Explanation: We need 2 bouquets each should have 3 flowers.
Here is the garden after the 7 and 12 days:
After day 7: [x, x, x, x, _, x, x]
We can make one bouquet of the first three flowers that bloomed. We cannot make another bouquet from the last three flowers that bloomed because they are not adjacent.
After day 12: [x, x, x, x, x, x, x]
It is obvious that we can make two bouquets in different ways.
```

## Approach

**Algorithm:** Binary search on the answer (the day). For a candidate day `mid`, check if we can form `m` bouquets using only flowers with `bloomDay[i] ≤ mid`. The check scans the array counting consecutive eligible flowers; each time we reach `k` consecutive, we increment bouquet count and reset the counter.

```text
FUNCTION minDays(bloomDay, m, k):
    n ← LENGTH(bloomDay)
    IF m * k > n THEN RETURN -1
    lo ← MIN(bloomDay)
    hi ← MAX(bloomDay)
    WHILE lo < hi DO
        mid ← (lo + hi) DIV 2
        IF canMake(bloomDay, m, k, mid) THEN
            hi ← mid
        ELSE
            lo ← mid + 1
    RETURN lo

FUNCTION canMake(bloomDay, m, k, day):
    bouquets ← 0
    consecutive ← 0
    FOR d IN bloomDay DO
        IF d ≤ day THEN
            consecutive ← consecutive + 1
            IF consecutive = k THEN
                bouquets ← bouquets + 1
                consecutive ← 0
        ELSE
            consecutive ← 0
    RETURN bouquets ≥ m
```

## Walkthrough

For the first example with `day = 3`:

- Eligible flowers (≤3): positions 0,2,4 → pattern `eligible, not, eligible, not, eligible`.
- Scanning yields three single-flower bouquets, satisfying `m = 3`.
- Binary search narrows to day 3 as the smallest feasible day.

## Complexity Analysis

- **Time:** `O(n log D)` where `D` is the range between min and max bloom days.
- **Space:** `O(1)`.

## Follow-Up Questions

- How would the solution change if the `k` flowers for a bouquet need not be adjacent?
- Can we extend the approach to return the actual indices of the chosen flowers?
- What if each flower has a different cost and we need to minimize total cost instead of days?

## Key Takeaway

Binary search on the day combined with a linear feasibility check efficiently finds the minimum day to satisfy bouquet requirements.
