# 3935. Power Update After K-th Largest Insertion I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/power-update-after-k-th-largest-insertion-i](https://leetcode.com/problems/power-update-after-k-th-largest-insertion-i)
**Companies:** Google

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

You are given an integer array `nums` and an integer `p`.

You are also given a 2D integer array `queries`, where each `queries[i] = [val_i, k_i]` and the difference between **consecutive** `k_i` values is always **less** than 10.

For each query:

- Insert `val_i` into `nums`.
- Let `x` be the `k_i`th **largest** element in the current `nums`.
- **Update** `p` to `p^x % (10^9 + 7)`.

Return an array `ans` where the `ans[i]` represents the value of `p` after processing the `i`th query.

**Constraints:**
- `1 <= nums.length <= 2 × 10^4`
- `1 <= nums[i] <= 10^6`
- `1 <= p <= 10^6`
- `1 <= queries.length <= 2 × 10^4`
- `1 <= val_i <= 10^6`
- `1 <= k_i <= n + i + 1`
- `|k_i - k_(i-1)| < 10` for `i > 0`

## Examples

**Example 1:**
```
Input: nums = [2], p = 4, queries = [[3,1],[1,2]]
Output: [64,4096]
Explanation:
| i | val_i | Current nums | k_i | k_i-th largest | p  | New p = p^x % (10^9 + 7)  |
|---|-------|--------------|-----|----------------|----|---------------------------|
| 0 | 3     | [2, 3]       | 1   | 3              | 4  | 4^3 % (10^9 + 7) = 64     |
| 1 | 1     | [2, 3, 1]    | 2   | 2              | 64 | 64^2 % (10^9 + 7) = 4096  |
Thus, ans = [64, 4096].
```

**Example 2:**
```
Input: nums = [7,5], p = 6, queries = [[4,3],[7,2]]
Output: [1296,220296870]
Explanation:
| i | val_i | Current nums  | k_i | k_i-th largest | p    | New p = p^x % (10^9 + 7)           |
|---|-------|---------------|-----|----------------|------|------------------------------------|
| 0 | 4     | [7, 5, 4]     | 3   | 4              | 6    | 6^4 % (10^9 + 7) = 1296            |
| 1 | 7     | [7, 5, 4, 7]  | 2   | 7              | 1296 | 1296^7 % (10^9 + 7) = 220296870    |
Thus, ans = [1296, 220296870]
```

## Approach
Maintain two heaps whose split point follows the current `k_i`:
1. **top** - a min-heap holding the `k` largest elements (its top is the `k`-th largest).
2. **rest** - a max-heap holding all the smaller elements.

Invariant: every element of `rest` is `<=` every element of `top`. For each query:
- Insert `val`: push into `top` if `top` is non-empty and `val >= top.min`, otherwise into `rest`.
- Rebalance to size `k_i`: move `top.min` to `rest` while `|top| > k_i`; move `rest.max` to `top` while `|top| < k_i`. Because consecutive `k_i` differ by less than 10, this is at most about 10 moves per query.
- `x = top.min`; update `p ← p^x mod (10^9 + 7)` with fast modular exponentiation.

**Pseudocode**
```text
FUNCTION PowerUpdates(nums, p, queries):
    SET MOD ← 10^9 + 7
    SET top ← EMPTY MIN-HEAP
    SET rest ← MAX-HEAP OF nums
    SET ans ← []
    FOR EACH [val, k] IN queries:
        IF top NOT EMPTY AND val >= TOP(top):
            PUSH val INTO top
        ELSE:
            PUSH val INTO rest
        WHILE SIZE(top) > k:
            PUSH POP(top) INTO rest
        WHILE SIZE(top) < k:
            PUSH POP(rest) INTO top
        SET x ← TOP(top)
        SET p ← POWMOD(p, x, MOD)
        APPEND p TO ans
    RETURN ans
```

## Walkthrough
Example 2: `nums = [7,5]`, `p = 6`, `queries = [[4,3],[7,2]]`. Start: `top = []`, `rest = {7,5}`.

| Step | Inserted | k | top (k largest) | rest | x | New p |
|------|----------|---|-----------------|------|---|-------|
|1|4 → rest (top empty)|3|move 7, 5, 4 → `{4,5,7}`|`{}`|4|`6^4 = 1296`|
|2|7 → top (7 >= 4)|2|`{4,5,7,7}` → move 4, 5 out → `{7,7}`|`{4,5}`|7|`1296^7 mod (10^9+7) = 220296870`|

Result: `[1296, 220296870]`.

## Complexity Analysis
Time: O(n) to heapify `nums`, then O(log(n + m)) per insertion plus at most ~10 heap moves per query for rebalancing, and O(log x) for the modular power. Overall O(n + m log(n + m)).
Space: O(n + m) for the two heaps.

## Follow-Up Questions
1. What if consecutive `k_i` could differ arbitrarily? (Use an order-statistics structure such as a Fenwick tree over compressed values or a sorted list, giving O(log n) per k-th query.)
2. Why can `p` never become `0` here, and why does that matter if you wanted to reduce the exponent modulo `10^9 + 6` (Fermat)?
3. How would you support deleting a value from `nums` between queries?

## Key Takeaway
Two heaps split at the k-th position track a moving order statistic cheaply when k changes by a bounded amount; combine with fast modular exponentiation for the power update.
