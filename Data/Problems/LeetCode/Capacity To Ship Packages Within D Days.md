# 1011. Capacity To Ship Packages Within D Days

**Difficulty:** 🟡 Medium
**Acceptance:** 69.0%
**LeetCode:** [https://leetcode.com/problems/capacity-to-ship-packages-within-d-days](https://leetcode.com/problems/capacity-to-ship-packages-within-d-days)
**Companies:** Agoda, Amazon, Apolloio, Apple, Bloomberg, Chalo, Dp World, Flipkart, Goldman Sachs, Google, Meta, Microsoft, Mindtickle, Myntra, Oracle, Spinny, Tiktok, Uber, Visa, Walmart Labs, Zeta

---

## Problem Description
A conveyor belt has packages that must be shipped from one port to another within `days` days.

The `i`-th package on the conveyor belt has a weight of `weights[i]`. Each day, we load the ship with packages on the conveyor belt (in the order given by `weights`). We may not load more weight than the maximum weight capacity of the ship.

Return the least weight capacity of the ship that will result in all the packages on the conveyor belt being shipped within `days` days.

**Constraints:**
- `1 <= days <= weights.length <= 5 * 10^4`
- `1 <= weights[i] <= 500`

## Examples
```
Example 1:
  Input: weights = [1,2,3,4,5,6,7,8,9,10], days = 5
  Output: 15
  Explanation: A ship capacity of 15 is the minimum to ship all the packages in 5 days like this:
  1st day: 1, 2, 3, 4, 5
  2nd day: 6, 7
  3rd day: 8
  4th day: 9
  5th day: 10
  Note that the cargo must be shipped in the order given, so using a ship of capacity 14 and splitting the packages into parts like (2, 3, 4, 5), (1, 6, 7), (8), (9), (10) is not allowed.
```

```
Example 2:
  Input: weights = [3,2,2,4,1,4], days = 3
  Output: 6
  Explanation: A ship capacity of 6 is the minimum to ship all the packages in 3 days like this:
  1st day: 3, 2
  2nd day: 2, 4
  3rd day: 1, 4
```

```
Example 3:
  Input: weights = [1,2,3,1,1], days = 4
  Output: 3
  Explanation:
  1st day: 1
  2nd day: 2
  3rd day: 3
  4th day: 1, 1
```

## Approach: Binary Search on Answer — O(n log S) ✅

```text
FUNCTION shipWithinDays(weights, days):
    // Lower bound is the heaviest single package
    lo ← MAX(weights)
    // Upper bound is shipping everything in one day
    hi ← SUM(weights)
    WHILE lo < hi:
        mid ← (lo + hi) DIV 2
        IF canShip(weights, days, mid):
            hi ← mid
        ELSE:
            lo ← mid + 1
    RETURN lo

FUNCTION canShip(weights, days, capacity):
    needed ← 1
    current ← 0
    FOR w IN weights:
        IF current + w > capacity:
            needed ← needed + 1
            current ← 0
        current ← current + w
    RETURN needed <= days
```

The binary search narrows the feasible capacity range while `canShip` checks feasibility in linear time.

## Walkthrough
| Step | `mid` (capacity) | Days needed by `canShip` |
|------|------------------|--------------------------|
| 1 | `lo=10, hi=55 → mid=32` | 2 ≤ 5 → feasible, set `hi=32` |
| 2 | `lo=10, hi=32 → mid=21` | 3 ≤ 5 → feasible, `hi=21` |
| 3 | `lo=10, hi=21 → mid=15` | 5 ≤ 5 → feasible, `hi=15` |
| 4 | `lo=10, hi=15 → mid=12` | 6 > 5 → not feasible, `lo=13` |
| 5 | `lo=13, hi=15 → mid=14` | 6 > 5 → not feasible, `lo=15` |
| End | `lo=hi=15` → answer `15` |

## Complexity Analysis
- **Time:** O(n log S) where *n* = `len(weights)` and *S* = sum of weights (binary search iterations). 
- **Space:** O(1) extra space.

## Follow‑Up Questions
1. How would you modify the algorithm if packages could be reordered?
2. Can you extend the solution to return the actual daily loading plan?
3. What is the impact of using a different monotonicity condition (e.g., limiting number of packages per day instead of weight)?

## Key Takeaway
Binary searching the ship capacity while checking feasibility in linear time yields the minimal capacity efficiently.
