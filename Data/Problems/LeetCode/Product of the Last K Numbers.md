# 1352. Product of the Last K Numbers

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/product-of-the-last-k-numbers](https://leetcode.com/problems/product-of-the-last-k-numbers)
**Companies:** Amazon, Apple, Bloomberg, Bytedance, Google, Meta, Microsoft, Starbucks, Target, Tekion, Tiktok

---

## Problem Description

Design an algorithm that accepts a stream of integers and retrieves the product of the last `k` integers of the stream.

Implement the `ProductOfNumbers` class:

- `ProductOfNumbers()` Initializes the object with an empty stream.
- `void add(int num)` Appends the integer `num` to the stream.
- `int getProduct(int k)` Returns the product of the last `k` numbers in the current list. You can assume that always the current list has at least `k` numbers.

The test cases are generated so that, at any time, the product of any contiguous sequence of numbers will fit into a single 32-bit integer without overflowing.

**Constraints:**
- `0 <= num <= 100`
- `1 <= k <= 4 * 10^4`
- At most `4 * 10^4` calls will be made to `add` and `getProduct`.
- The product of the stream at any point in time will fit in a **32-bit** integer.

**Follow-up:** Can you implement **both** `GetProduct` and `Add` to work in `O(1)` time complexity instead of `O(k)` time complexity?

## Examples

**Example 1:**
```
Input
["ProductOfNumbers","add","add","add","add","add","getProduct","getProduct","getProduct","add","getProduct"]
[[],[3],[0],[2],[5],[4],[2],[3],[4],[8],[2]]
Output
[null,null,null,null,null,null,20,40,0,null,32]
Explanation
ProductOfNumbers productOfNumbers = new ProductOfNumbers();
productOfNumbers.add(3);        // [3]
productOfNumbers.add(0);        // [3,0]
productOfNumbers.add(2);        // [3,0,2]
productOfNumbers.add(5);        // [3,0,2,5]
productOfNumbers.add(4);        // [3,0,2,5,4]
productOfNumbers.getProduct(2); // return 20. The product of the last 2 numbers is 5 * 4 = 20
productOfNumbers.getProduct(3); // return 40. The product of the last 3 numbers is 2 * 5 * 4 = 40
productOfNumbers.getProduct(4); // return 0. The product of the last 4 numbers is 0 * 2 * 5 * 4 = 0
productOfNumbers.add(8);        // [3,0,2,5,4,8]
productOfNumbers.getProduct(2); // return 32. The product of the last 2 numbers is 4 * 8 = 32
```

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
