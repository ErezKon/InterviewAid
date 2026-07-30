# 258. Add Digits

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/add-digits](https://leetcode.com/problems/add-digits)
**Companies:** Adobe, Amazon, Bloomberg, Google, Infosys, Meta, Microsoft, Pega, Uber, Visa

---

## Problem Description
Given a non‑negative integer `num`, repeatedly replace `num` with the sum of its digits until the result has only one digit. Return that final single‑digit result.

**Constraints**
- `0 <= num <= 2^31 - 1`

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| `38`  | `2`    | `38 → 3+8 = 11 → 1+1 = 2` |
| `0`   | `0`    | Already a single digit |

## Approach
The repeated digit sum is known as the **digital root**. For any positive integer, the digital root can be computed in O(1) using the formula:
```
digitalRoot = 1 + (num - 1) % 9   (when num > 0)
```
If `num` is `0`, the result is `0`.

### Pseudocode
```text
FUNCTION addDigits(num):
    IF num == 0:
        RETURN 0
    RETURN 1 + (num - 1) % 9
```

## Walkthrough
Take `num = 38`:
1. `num` is not `0`.
2. Compute `1 + (38 - 1) % 9 = 1 + 37 % 9 = 1 + 1 = 2`.
3. Return `2`, which matches the iterative process `38 → 11 → 2`.

## Complexity Analysis
- **Time Complexity:** `O(1)` – constant‑time arithmetic.
- **Space Complexity:** `O(1)` – no extra space.

## Follow‑Up Questions
- How would you solve the problem without using the modulo trick (i.e., with a loop)?
- Can you extend the solution to work with arbitrarily large numbers represented as strings?

## Key Takeaway
The digital root of a number can be obtained instantly with a simple modulo‑9 formula, avoiding any loops.
