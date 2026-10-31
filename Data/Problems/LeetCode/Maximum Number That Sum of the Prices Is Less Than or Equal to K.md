# 3007. Maximum Number That Sum of the Prices Is Less Than or Equal to K

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-number-that-sum-of-the-prices-is-less-than-or-equal-to-k](https://leetcode.com/problems/maximum-number-that-sum-of-the-prices-is-less-than-or-equal-to-k)
**Companies:** Google, Microsoft

---

## Problem Description
You are given an integer `k` and an integer `x`. The price of a number `num` is calculated by the count of set bits at positions `x`, `2x`, `3x`, etc., in its binary representation, starting from the least significant bit. The following table contains examples of how price is calculated.

| x | num | Binary Representation | Price |
|---|-----|-----------------------|-------|
| 1 | 13  | 00000**1****1**0**1** | 3 |
| 2 | 13  | 00000**1**101 | 1 |
| 2 | 233 | 0**1**1**1**0**1**001 | 3 |
| 3 | 13  | 000001**1**01 | 1 |
| 3 | 362 | **1**01**1**01010 | 2 |

The **accumulated price** of `num` is the **total** price of numbers from `1` to `num`. `num` is considered **cheap** if its accumulated price is less than or equal to `k`.

Return the **greatest** cheap number.

**Constraints:**
- `1 <= k <= 10^15`
- `1 <= x <= 8`

## Examples

```
Example 1:
  Input: k = 9, x = 1
  Output: 6
  Explanation: As shown in the table below, 6 is the greatest cheap number.

    x | num | Binary | Price | Accumulated Price
    1 |  1  |  001   |   1   |  1
    1 |  2  |  010   |   1   |  2
    1 |  3  |  011   |   2   |  4
    1 |  4  |  100   |   1   |  5
    1 |  5  |  101   |   2   |  7
    1 |  6  |  110   |   2   |  9
    1 |  7  |  111   |   3   |  12
```

```
Example 2:
  Input: k = 7, x = 2
  Output: 9
  Explanation: As shown in the table below, 9 is the greatest cheap number.

    x | num | Binary | Price | Accumulated Price
    2 |  1  |  0001  |   0   |  0
    2 |  2  |  0010  |   1   |  1
    2 |  3  |  0011  |   1   |  2
    2 |  4  |  0100  |   0   |  2
    2 |  5  |  0101  |   0   |  2
    2 |  6  |  0110  |   1   |  3
    2 |  7  |  0111  |   1   |  4
    2 |  8  |  1000  |   1   |  5
    2 |  9  |  1001  |   1   |  6
    2 | 10  |  1010  |   2   |  8
```

## Approach
Sort the `prices` array and greedily take the cheapest items until the budget is exhausted. This yields the maximum count because any other selection with the same count would have a larger total cost.

```text
FUNCTION maxItems(prices, k):
    SORT prices ASCENDING
    count ← 0
    FOR price IN prices:
        IF k < price:
            BREAK
        k ← k - price
        count ← count + 1
    RETURN count
```
If the price range is limited, a counting sort can achieve linear time.

## Walkthrough
For `prices = [2,3,1,5]`, `k = 7`:
1. After sorting → `[1,2,3,5]`.
2. Take `1` (k=6, count=1).
3. Take `2` (k=4, count=2).
4. Take `3` (k=1, count=3).
5. Next price `5` exceeds remaining budget → stop. Return `3`.

## Complexity Analysis
*Time*: **O(n log n)** for sorting (`n = len(prices)`).
*Space*: **O(1)** extra if sorting in place, otherwise **O(n)**.

## Follow-Up Questions
1. How would you solve the problem in **O(n)** time using a frequency array when `prices[i] ≤ 10⁵`?
2. What if you must also output the list of selected item indices?
3. How does the algorithm change if you can purchase at most `m` items regardless of cost?

## Key Takeaway
Sorting and a greedy scan give the optimal count of purchasable items under a budget constraint.
