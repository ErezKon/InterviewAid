# 1482. Minimum Number of Days to Make m Bouquets

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets](https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets)
**Companies:** Adobe, Amazon, Barclays, Bloomberg, Flipkart, Google, Meta, Microsoft, Phonepe

---

## Problem Description

You are given an integer array `bloomDay` where `bloomDay[i]` is the day the i‑th flower will bloom. To make a bouquet you need `k` **adjacent** flowers that have all bloomed. Return the minimum number of days required to make exactly `m` bouquets. If it is impossible, return `-1`.

## Examples

1. **Input:** `bloomDay = [1,10,3,10,2]`, `m = 3`, `k = 1`
   **Output:** `3`
   **Explanation:** We can use the flowers that bloom on days 1,2,3 to form three bouquets.
2. **Input:** `bloomDay = [1,10,3,10,2]`, `m = 3`, `k = 2`
   **Output:** `-1`
   **Explanation:** Need 6 flowers but only 5 are available.

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
- Scanning yields three single‑flower bouquets, satisfying `m = 3`.
- Binary search narrows to day 3 as the smallest feasible day.

## Complexity Analysis

- **Time:** `O(n log D)` where `D` is the range between min and max bloom days.
- **Space:** `O(1)`.

## Follow‑Up Questions

- How would the solution change if the `k` flowers for a bouquet need not be adjacent?
- Can we extend the approach to return the actual indices of the chosen flowers?
- What if each flower has a different cost and we need to minimize total cost instead of days?

## Key Takeaway

Binary search on the day combined with a linear feasibility check efficiently finds the minimum day to satisfy bouquet requirements.
