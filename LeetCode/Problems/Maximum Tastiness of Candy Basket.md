# 2517. Maximum Tastiness of Candy Basket

**Difficulty:** 🟡 Medium
**Companies:** Amazon, Bloomberg, Phonepe

---

## Problem Description
Given an array `price` of candy prices and an integer `k`, select exactly `k` candies such that the minimum absolute difference between any two selected prices is maximized. Return this maximum possible minimum difference.

## Examples
**Example 1**
```
Input: price = [1,2,4,8,9], k = 3
Output: 3
Explanation: Choose candies with prices [1,4,8]; the minimum gap is min(4-1,8-4)=3.
```
**Example 2**
```
Input: price = [5,5,5,5], k = 2
Output: 0
Explanation: All prices are equal, so the minimum gap is 0.
```

## Approach
The problem can be solved with a binary‑search on the answer combined with a greedy feasibility check.
1. **Sort** the price array.
2. **Binary Search** the minimum gap `mid` between 0 and `max(price)-min(price)`.
3. **Greedy Check** – starting from the smallest price, repeatedly pick the next price that is at least `mid` larger than the previously chosen one. If we can pick `k` candies, `mid` is feasible.
4. Adjust the search range accordingly to find the largest feasible `mid`.

## Pseudocode
```text
FUNCTION maximumTastiness(price, k):
    SORT price ASCENDING
    SET lo ← 0
    SET hi ← price[-1] - price[0]
    WHILE lo < hi:
        // Upper mid to avoid infinite loop
        SET mid ← (lo + hi + 1) / 2
        // Greedy feasibility test
        SET count ← 1
        SET prev ← price[0]
        FOR p IN price:
            IF p - prev ≥ mid:
                SET count ← count + 1
                SET prev ← p
                IF count = k:
                    BREAK
        IF count ≥ k:
            SET lo ← mid   // mid is feasible, try larger
        ELSE:
            SET hi ← mid - 1   // mid too large, reduce
    RETURN lo
```

## Walkthrough
For `price = [1,2,4,8,9]` and `k = 3`:
- After sorting, `lo = 0`, `hi = 8`.
- Mid = 4 → greedy picks 1, then 8 (gap 7) → only 2 candies → not feasible → hi = 3.
- Mid = 2 → picks 1, 4, 8 → 3 candies → feasible → lo = 2.
- Mid = 3 → picks 1, 4, 8 → 3 candies → feasible → lo = 3.
- Loop ends, answer = 3.

## Complexity Analysis
- **Time:** O(n log M) where `n` is the number of candies and `M` is the price range (`max‑min`). Sorting costs O(n log n).
- **Space:** O(1) extra space besides the input array.

## Follow‑Up Questions
1. How would the solution change if the candies could be selected in any order (no sorting)?
2. Can you adapt the algorithm to return the actual set of selected candies?
3. What if `k` is very large, close to `n`? How does that affect the binary‑search bounds?

## Key Takeaway
Combining binary search on the answer with a greedy feasibility test efficiently finds the largest minimum gap for selecting `k` items.
