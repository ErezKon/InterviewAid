# 2137. Pour Water Between Buckets to Make Water Levels Equal

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/pour-water-between-buckets-to-make-water-levels-equal](https://leetcode.com/problems/pour-water-between-buckets-to-make-water-levels-equal)
**Companies:** Deutsche Bank

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

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
**Algorithm:** Binary search on the final water level `t`.
**Key Insight:** Feasibility is monotonic in `t`. For a candidate level `t`, buckets above `t` can give `Σ_{b>t}(b - t)` gallons, but only `(100 - loss)/100` of that arrives; buckets below `t` need `Σ_{b<t}(t - b)` gallons. If the delivered water covers the need, `t` is achievable, and so is every lower level. The answer lies in `[0, max(buckets)]`, so binary search on reals until the interval is smaller than `10^-5`.

```text
FUNCTION equalizeWater(buckets, loss):
    lo ← 0, hi ← MAX(buckets)
    keep ← (100 - loss) / 100
    WHILE hi - lo > 1e-6:
        t ← (lo + hi) / 2
        give ← 0, need ← 0
        FOR b IN buckets:
            IF b > t: give ← give + (b - t)
            ELSE: need ← need + (t - b)
        IF give * keep >= need:
            lo ← t        // level t is reachable, try higher
        ELSE:
            hi ← t
    RETURN lo
```

## Walkthrough
Example 1: `buckets = [1,2,7]`, `loss = 80` → `keep = 0.2`, search range `[0, 7]`.

| t | give | delivered (give · 0.2) | need | feasible? | new range |
|---|------|------------------------|------|-----------|-----------|
| 3.5 | 3.5 | 0.7 | 2.5 + 1.5 = 4.0 | no | [0, 3.5] |
| 1.75 | 0.25 + 5.25 = 5.5 | 1.1 | 0.75 | yes | [1.75, 3.5] |
| 2.625 | 4.375 | 0.875 | 1.625 + 0.625 = 2.25 | no | [1.75, 2.625] |
| 2.1875 | 4.8125 | 0.9625 | 1.1875 + 0.1875 = 1.375 | no | [1.75, 2.1875] |
| ... | | | | | converges to 2 |

At `t = 2`: give = 5, delivered = 1, need = 1 - exactly balanced, so the answer is `2.00000`.

## Complexity Analysis
- **Time:** O(n · log(max / ε)) - about 40 iterations of an O(n) feasibility check.
- **Space:** O(1) extra space.

## Follow-Up Questions
1. Can you avoid floating-point binary search by sorting and solving for `t` exactly on each segment between consecutive bucket values?
2. How would the answer change if each pour had a fixed loss (in gallons) rather than a percentage?
3. Why is it never beneficial to pour from a bucket that ends below the target or to pour water twice through an intermediate bucket?

## Key Takeaway
When the answer is a real number and feasibility is monotonic, binary search on the answer with a linear check is the clean solution; here the check just compares delivered surplus against total deficit.
