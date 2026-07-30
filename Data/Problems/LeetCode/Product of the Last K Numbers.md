# 1352. Product of the Last K Numbers

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/product-of-the-last-k-numbers](https://leetcode.com/problems/product-of-the-last-k-numbers)
**Companies:** Amazon, Apple, Bloomberg, Bytedance, Google, Meta, Microsoft, Starbucks, Target, Tekion, Tiktok

---

## Problem Description
Design a data structure that supports two operations:
1. `add(num)`: Append an integer `num` to the end of a stream of numbers.
2. `getProduct(k)`: Return the product of the last `k` numbers in the stream. If the stream contains a zero within the last `k` elements, the product is `0`.
Both operations must run in **O(1)** time.

## Examples
**Example 1**
```
add(3), add(0), add(2), add(5), add(4)
getProduct(2) → 20   // 5 * 4
getProduct(3) → 0    // 0 * 2 * 5
add(8)
getProduct(2) → 32   // 4 * 8
```
The zero resets the product calculation for any window that includes it.

## Approach
Maintain a list of prefix products. When a non‑zero number is added, append `prefix[-1] * num`. When a zero is added, reset the prefix list to `[1]` because any product that spans the zero becomes zero. To answer `getProduct(k)`, if `k` is larger than the length of the prefix list minus one, a zero occurred within the window, so return `0`. Otherwise, return `prefix[-1] / prefix[-k-1]`.

### Pseudocode
```text
CLASS ProductOfNumbers:
    FUNCTION __init__():
        SET prefix ← [1]

    FUNCTION add(num):
        IF num == 0:
            SET prefix ← [1]
        ELSE:
            APPEND prefix[-1] * num TO prefix

    FUNCTION getProduct(k):
        IF k >= LENGTH(prefix):
            RETURN 0
        RETURN prefix[-1] / prefix[-k-1]
```
Division works because the prefix list stores cumulative products without zeros.

## Walkthrough
After adding `3,0,2,5,4`:
- Prefix after `3`: `[1,3]`
- Zero resets prefix: `[1]`
- After `2,5,4`: `[1,2,10,40]`
`getProduct(2)` → `40 / 2 = 20`.
Adding `8` → prefix `[1,2,10,40,320]`; `getProduct(2)` → `320 / 10 = 32`.

## Complexity Analysis
- **Time:** `O(1)` per `add` and `getProduct`.
- **Space:** `O(n)` for storing prefix products, where `n` is the number of added elements since the last zero.

## Follow‑Up Questions
1. How would you modify the structure to support division‑free queries (e.g., using logarithms)?
2. Can you adapt the design to handle a sliding window of fixed size instead of arbitrary `k`?
3. What changes are needed if the numbers can be negative and overflow is a concern?

## Key Takeaway
By storing cumulative products and resetting on zeros, you can compute the product of the last k numbers in constant time.
