# 3658. GCD of Odd and Even Sums

**Difficulty:** 🟢 Easy
**Companies:** Bloomberg, Google, Microsoft

---

## Problem Description
Given an integer array `nums`, compute the sum of all odd‑indexed elements and the sum of all even‑indexed elements (based on value parity, not position). Return the greatest common divisor (GCD) of these two sums.

## Examples
**Example 1:**
```
Input: nums = [1,2,3,4,5]
oddSum = 1+3+5 = 9
evenSum = 2+4 = 6
Output: 3
Explanation: GCD(9,6) = 3.
```
**Example 2:**
```
Input: nums = [2,4,6,8]
oddSum = 0
evenSum = 20
Output: 20
Explanation: GCD(0,20) = 20.
```

## Approach
Calculate the two sums in a single pass, then apply Euclid's algorithm to find their GCD.

```text
FUNCTION gcdOfSums(nums):
    oddSum ← 0
    evenSum ← 0
    FOR num IN nums:
        IF num MOD 2 == 1:
            oddSum ← oddSum + num
        ELSE:
            evenSum ← evenSum + num
    // Euclidean algorithm
    WHILE evenSum ≠ 0:
        temp ← evenSum
        evenSum ← oddSum MOD evenSum
        oddSum ← temp
    RETURN oddSum
```
The loop terminates when the remainder becomes zero, leaving the GCD in `oddSum`.

## Walkthrough
| Step | num | oddSum | evenSum |
|------|-----|--------|---------|
| 1 | 1 | 1 | 0 |
| 2 | 2 | 1 | 2 |
| 3 | 3 | 4 | 2 |
| 4 | 4 | 4 | 6 |
| 5 | 5 | 9 | 6 |
After loop: GCD(9,6) → 3.

## Complexity Analysis
- **Time:** `O(n)` for the single pass plus `O(log min(oddSum, evenSum))` for GCD computation.
- **Space:** `O(1)` auxiliary space.

## Follow‑Up Questions
1. How would you modify the solution if the array is extremely large and cannot fit in memory?
2. Can you compute the GCD incrementally as you stream the numbers?
3. What if you need the GCD of sums of numbers at even and odd *indices* instead of parity?

## Key Takeaway
Separating the array into two groups based on a simple property and then applying Euclid's algorithm yields the GCD efficiently.
