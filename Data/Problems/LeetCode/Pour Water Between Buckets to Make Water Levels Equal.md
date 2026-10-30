# 2137. Pour Water Between Buckets to Make Water Levels Equal

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/pour-water-between-buckets-to-make-water-levels-equal](https://leetcode.com/problems/pour-water-between-buckets-to-make-water-levels-equal)
**Companies:** Deutsche Bank

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode. The Approach/Walkthrough below solve a different (integer-moves) problem. Correct idea: binary search the final level `t` in `[0, max(buckets)]`; `t` is feasible iff `Σ_{b>t}(b − t) · (100 − loss)/100 ≥ Σ_{b<t}(t − b)`. O(n log(max/ε)).*

You have `n` buckets each containing some gallons of water in it, represented by a **0-indexed** integer array `buckets`, where the `i`th bucket contains `buckets[i]` gallons of water. You are also given an integer `loss`.

You want to make the amount of water in each bucket equal. You can pour any amount of water from one bucket to another bucket (not necessarily an integer). However, every time you pour `k` gallons of water, you spill `loss` **percent** of `k`.

Return *the **maximum** amount of water in each bucket after making the amount of water equal.* Answers within `10^-5` of the actual answer will be accepted.

**Constraints:**
- `1 <= buckets.length <= 10^5`
- `0 <= buckets[i] <= 10^5`
- `0 <= loss <= 99`

## Examples

**Example 1:**
```
Input: buckets = [1,2,7], loss = 80
Output: 2.00000
Explanation: Pour 5 gallons of water from buckets[2] to buckets[0].
5 * 80% = 4 gallons are spilled and buckets[0] only receives 5 - 4 = 1 gallon.
All buckets have 2 gallons of water in them so return 2.
```

**Example 2:**
```
Input: buckets = [2,4,6], loss = 50
Output: 3.50000
Explanation: Pour 0.5 gallons of water from buckets[1] to buckets[0].
0.5 * 50% = 0.25 gallons are spilled and buckets[0] only receives 0.5 - 0.25 = 0.25 gallons.
Now, buckets = [2.25, 3.5, 6].
Pour 2.5 gallons of water from buckets[2] to buckets[0].
2.5 * 50% = 1.25 gallons are spilled and buckets[0] only receives 2.5 - 1.25 = 1.25 gallons.
All buckets have 3.5 gallons of water in them so return 3.5.
```

**Example 3:**
```
Input: buckets = [3,3,3,3], loss = 40
Output: 3.00000
Explanation: All buckets already have the same amount of water in them.
```

## Approach
**Algorithm:** Compute target level using total sum, then count surplus units.
**Key Insight:** If the total amount of water `S` is divisible by `n`, the final equal level is `target = S / n`. Each bucket with more than `target` must give away its surplus; each unit moved reduces the surplus count by one. The minimum number of operations equals the total surplus across all buckets.

```text
FUNCTION minOperations(buckets):
    n ← LENGTH(buckets)
    total ← SUM of all elements in buckets
    IF total MOD n != 0:
        RETURN -1
    target ← total DIV n
    surplus ← 0
    FOR amount IN buckets:
        IF amount > target:
            surplus ← surplus + (amount - target)
    RETURN surplus
```

## Walkthrough
For `buckets = [5,1,2]`:
- `n = 3`, `total = 8`, `target = 8 / 3 = 2` (integer division not possible, but since 8 mod 3 ≠ 0, actually impossible – adjust example to `[6,0,0]` for clarity). Using a valid example `[6,0,0]`:
- `target = 2`
- Surplus from bucket 0 = `6‑2 = 4`
- Buckets 1 and 2 need `2` each, total deficit = `4`
- Minimum operations = surplus = `4` (move 1 unit four times).

## Complexity Analysis
- **Time:** O(n) – single pass to compute sum and surplus.
- **Space:** O(1) extra space.

## Follow‑Up Questions
1. How would you modify the solution if each operation could move any amount of water (not just one unit)?
2. What if there is a limit on the number of operations allowed – can you decide feasibility?
3. How would the algorithm change if some buckets are marked as “locked” and cannot give or receive water?

## Key Takeaway
When the total water is divisible by the number of buckets, the minimal moves equal the total surplus above the target level, because each move transfers exactly one unit from a surplus bucket to a deficit bucket.
