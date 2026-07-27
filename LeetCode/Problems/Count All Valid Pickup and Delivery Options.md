# 1359. Count All Valid Pickup and Delivery Options

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-all-valid-pickup-and-delivery-options](https://leetcode.com/problems/count-all-valid-pickup-and-delivery-options)
**Companies:** Acko, Doordash, Google

---

```
FUNCTION countOrders(n):
    MOD = 10^9 + 7
    result = 1
    FOR i ← 1 TO n:
        // i-th order: pickup can go in any of 2i-1 slots
        // delivery must come after pickup: (2i-1) * i ways
        result = result * (2*i - 1) * i % MOD
    RETURN result
```
