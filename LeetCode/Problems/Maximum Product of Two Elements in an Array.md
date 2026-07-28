# 1464. Maximum Product of Two Elements in an Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/maximum-product-of-two-elements-in-an-array](https://leetcode.com/problems/maximum-product-of-two-elements-in-an-array)
**Companies:** Amazon, Bloomberg, Google, Jpmorgan, Meta, Samsung, Yandex

---

## Problem Description
Given `nums`, return `max((nums[i]-1) × (nums[j]-1))` for any `i ≠ j`.

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| `[3,4,5,2]` | `12` | Choose 5 and 4 → (5-1)*(4-1)=4*3=12 |
| `[1,5,4,5]` | `16` | Choose the two 5s → (5-1)*(5-1)=4*4=16 |
| `[3,7]` | `12` | (7-1)*(3-1)=6*2=12 |

## Approach
**Algorithm:** Track the two largest numbers in one pass and compute `(first-1)*(second-1)`.

```text
FUNCTION maxProduct(nums):
    SET first ← 0
    SET second ← 0
    FOR num IN nums DO
        IF num ≥ first THEN
            SET second ← first
            SET first ← num
        ELSE IF num > second THEN
            SET second ← num
        END IF
    END FOR
    RETURN (first - 1) × (second - 1)
END FUNCTION
```

## Walkthrough
Consider `nums = [1,5,4,5]`:
1. Initialize `first=0`, `second=0`.
2. num=1 → `first=1`, `second=0`.
3. num=5 → `second=1`, `first=5`.
4. num=4 → `second` becomes 4 (since 4 < first but > second).
5. num=5 → `second` becomes previous `first` (5), `first` stays 5.
6. Final `first=5`, `second=5` → `(5-1)*(5-1)=16`.

## Complexity Analysis
| Aspect | Complexity |
|--------|------------|
| Time   | **O(n)** where *n* is length of `nums` |
| Space  | **O(1)** auxiliary space |

## Follow-Up Questions
- How would you adapt the solution if the array could contain negative numbers?
- Can you solve it without storing the two largest values explicitly (single pass with constant memory)?

## Key Takeaway
> **Track top‑2 in one pass** — simple linear scan for the two largest elements.
