# 1357. Apply Discount Every n Orders

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/apply-discount-every-n-orders](https://leetcode.com/problems/apply-discount-every-n-orders)
**Companies:** Meta

---

## 1. Problem Description

Design a `Cashier` class. Every `n`th customer gets a `discount`% off their total bill. Implement `getBill(product, amount)` that returns the total cost (with discount applied if applicable).

---

## 2. Approach: Counter + HashMap — O(k) per call ✅

```
CLASS Cashier:
    INIT(n, discount, products, prices):
        self.n = n
        self.discount = discount
        self.priceMap = {products[i]: prices[i] for all i}
        self.count = 0
    
    FUNCTION getBill(product, amount):
        self.count += 1
        total = SUM(self.priceMap[product[i]] * amount[i])
        IF self.count % self.n == 0:
            total *= (100 - self.discount) / 100
        RETURN total
```

| Time | Space |
|------|-------|
| O(k) per getBill, k = items | O(p) for price map |

---

## Key Takeaway

> Simple simulation with a counter modulo `n`. Store prices in a hashmap for O(1) lookup per product.
