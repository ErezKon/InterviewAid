# 3536. Maximum Product of Two Digits

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/maximum-product-of-two-digits](https://leetcode.com/problems/maximum-product-of-two-digits)
**Companies:** Google

---

## Problem Description
Given a number `num`, return the **maximum product** of any two of its digits.

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| `123` | `6` | Digits are 1, 2, 3. Largest two are 2 and 3 → 2×3 = 6 |
| `991` | `81` | Digits are 9, 9, 1. Largest two are 9 and 9 → 9×9 = 81 |
| `5`   | `0` | Only one digit, product is 0 by definition |

## Approach
**Algorithm:** Find the two largest digits and multiply them.

```text
FUNCTION maxProduct(num):
    // Extract digits
    digits ← []
    WHILE num > 0:
        SET digit ← num MOD 10
        APPEND digit TO digits
        SET num ← num DIV 10
    END WHILE
    // Track top two digits without full sort
    SET max1 ← -1
    SET max2 ← -1
    FOR d IN digits:
        IF d > max1:
            SET max2 ← max1
            SET max1 ← d
        ELSE IF d > max2:
            SET max2 ← d
        END IF
    END FOR
    IF max2 = -1:
        RETURN 0  // fewer than two digits
    RETURN max1 × max2
END FUNCTION
```

## Walkthrough
Consider `num = 991`:
1. Extract digits → `[9, 9, 1]`.
2. Initialize `max1 = -1`, `max2 = -1`.
3. Iterate:
   - d=9 → `max1=9`, `max2=-1`.
   - d=9 → `max2` becomes previous `max1` (9), `max1` stays 9.
   - d=1 → no change.
4. Top two digits are 9 and 9 → product `81`.

## Complexity Analysis
| Aspect | Complexity |
|--------|------------|
| Time   | **O(d)** where *d* is the number of digits |
| Space  | **O(1)** auxiliary space |

## Follow-Up Questions
- How would you modify the algorithm to return the maximum product of **three** digits?
- What if the input is given as a string instead of an integer?
- Can you compute the product without extracting all digits (single pass)?

## Key Takeaway
> **Find the two largest digits** — extract digits, track the top‑2, and multiply.
