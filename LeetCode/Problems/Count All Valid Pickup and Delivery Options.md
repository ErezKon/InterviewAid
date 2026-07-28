# 1359. Count All Valid Pickup and Delivery Options

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-all-valid-pickup-and-delivery-options](https://leetcode.com/problems/count-all-valid-pickup-and-delivery-options)
**Companies:** Acko, Doordash, Google

---

## Problem Description
Given `n` orders, each order consists of a pickup and a delivery. We need to count all possible sequences of `2n` events such that for every order, its pickup appears before its delivery. Return the count modulo `10^9 + 7`.

## Examples
| n | Output | Explanation |
|---|--------|-------------|
| 1 | 1 | Only one possible sequence: `P1 D1` |
| 2 | 6 | Six valid sequences, e.g., `P1 P2 D1 D2`, `P1 P2 D2 D1`, etc. |

## Approach
The problem can be solved combinatorially. When adding the i‑th order to an existing valid sequence of length `2(i‑1)`, there are `2i‑1` possible positions for its pickup. After placing the pickup, the delivery must be placed after it, giving `i` choices. Multiply these choices for all `i` from `1` to `n` and take modulo.

### Pseudocode
```text
FUNCTION countOrders(n):
    MOD ← 1_000_000_007
    result ← 1
    FOR i ← 1 TO n:
        // (2i‑1) possible slots for pickup, i slots for delivery after pickup
        SET result ← (result * (2*i - 1) * i) % MOD
    RETURN result
```

## Walkthrough
Consider `n = 2`:
1. Start with empty sequence, result = 1.
2. i = 1: only one slot, result = 1 * 1 * 1 = 1.
3. i = 2: sequence length is 2, there are `2*2‑1 = 3` slots for the second pickup. After placing it, delivery has 2 possible positions after the pickup. Multiply: result = 1 * 3 * 2 = 6.
Thus, 6 valid sequences.

## Complexity Analysis
- Time: O(n) – one loop over orders.
- Space: O(1) – only constant extra variables.

## Follow-Up Questions
- How would the answer change if deliveries could occur before any pickup?
- Can you extend the solution to count sequences with additional constraints, such as limited parallel pickups?
- What is the combinatorial interpretation using Catalan numbers?

## Key Takeaway
The count of valid pickup‑delivery sequences is the product of `(2i‑1) * i` for each order `i`, yielding an O(n) solution using simple modular arithmetic.
