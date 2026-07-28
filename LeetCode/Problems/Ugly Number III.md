# 1201. Ugly Number III

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/ugly-number-iii](https://leetcode.com/problems/ugly-number-iii)
**Companies:** Amazon, American Express, Meta

---

## Problem Description
Given three positive integers `a`, `b`, and `c`, an *ugly number* is a positive integer that is divisible by at least one of `a`, `b`, or `c`. Return the `n`‑th ugly number in ascending order.

## Examples
**Example 1:**
```
Input: n = 1, a = 2, b = 3, c = 5
Output: 2
Explanation: The sequence of ugly numbers is [2,3,4,5,6,...]. The 1st is 2.
```
**Example 2:**
```
Input: n = 3, a = 2, b = 3, c = 5
Output: 4
Explanation: The first three ugly numbers are 2,3,4.
```

## Approach
Use binary search on the answer space combined with inclusion‑exclusion to count how many ugly numbers are ≤ a candidate value.

### Pseudocode
```text
FUNCTION nthUglyNumber(n, a, b, c):
    SET ab ← LCM(a, b)
    SET ac ← LCM(a, c)
    SET bc ← LCM(b, c)
    SET abc ← LCM(ab, c)
    SET lo ← 1
    SET hi ← 2 * 10^9  // upper bound per constraints
    WHILE lo < hi:
        SET mid ← (lo + hi) / 2
        // count numbers ≤ mid divisible by a or b or c
        SET count ← mid // a + mid // b + mid // c
        SET count ← count - (mid // ab) - (mid // ac) - (mid // bc)
        SET count ← count + (mid // abc)
        IF count < n:
            SET lo ← mid + 1
        ELSE:
            SET hi ← mid
    RETURN lo
```

## Walkthrough
| Step | lo | hi | mid | count | Action |
|------|----|----|-----|-------|--------|
| 1 | 1 | 2e9 | 1e9 | > n | hi = mid |
| … | … | … | … | … | … |
The loop narrows the range until `lo` equals the smallest value with at least `n` ugly numbers, which is the answer.

## Complexity Analysis
- **Time:** `O(log(maxValue))` binary search iterations, each `O(1)` counting → overall `O(log 2e9)`.
- **Space:** `O(1)` auxiliary space.

## Follow‑Up Questions
1. How would you modify the solution if the numbers could be zero or negative?
2. Can you extend the approach to find the k‑th number divisible by any of `m` given divisors?
3. What if you need to generate the first `n` ugly numbers instead of only the nth?

## Key Takeaway
Binary search with inclusion‑exclusion efficiently finds the nth number meeting multiple divisibility constraints without enumerating all candidates.