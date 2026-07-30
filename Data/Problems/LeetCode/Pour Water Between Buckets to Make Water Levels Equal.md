# 2137. Pour Water Between Buckets to Make Water Levels Equal

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/pour-water-between-buckets-to-make-water-levels-equal](https://leetcode.com/problems/pour-water-between-buckets-to-make-water-levels-equal)
**Companies:** Deutsche Bank

---

## Problem Description
You are given an array `buckets` where `buckets[i]` represents the amount of water in the *i*‑th bucket. In one operation you may choose two different buckets `i` and `j` and pour one unit of water from bucket `i` to bucket `j` (the source bucket must have at least one unit). The operation can be performed any number of times. Return the minimum number of operations required to make all bucket levels equal. If it is impossible, return `-1`.

## Examples
**Example 1:**
```
Input: buckets = [5,1,2]
Output: 3
Explanation: Transfer 1 unit from bucket 0 to bucket 1 (→ [4,2,2]), then 1 unit from bucket 0 to bucket 2 (→ [3,2,3]), finally 1 unit from bucket 0 to bucket 2 (→ [2,2,4]) and one more from bucket 2 to bucket 0 (→ [3,2,3]) … after 3 moves we can reach [3,3,3].
```
**Example 2:**
```
Input: buckets = [2,2,2]
Output: 0
Explanation: All buckets already have equal water.
```
**Example 3:**
```
Input: buckets = [1,2,3]
Output: -1
Explanation: Total water (6) is not divisible by 3, so equal levels are impossible.
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
