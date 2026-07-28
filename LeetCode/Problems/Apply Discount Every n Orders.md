# 1357. Apply Discount Every n Orders

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/apply-discount-every-n-orders](https://leetcode.com/problems/apply-discount-every-n-orders)
**Companies:** Meta

---

## 1. Problem Description

Design a `Cashier` class. Every `n`th customer gets a `discount`% off their total bill. Implement `getBill(product, amount)` that returns the total cost (with discount applied if applicable).

---

## 2. Examples

**Example 1:**
```
Cashier cashier = new Cashier(3, 50, [1,2,3], [100,200,300])
cashier.getBill([1,2], [1,2]) // returns 500 (no discount)
cashier.getBill([3], [1])       // returns 300 (no discount)
cashier.getBill([1,3], [1,1])   // returns (100+300)*0.5 = 200 (3rd customer gets 50% discount)
```
**Explanation:** The first two customers pay full price. The third customer receives a 50% discount on the total.

---

## 3. Approach: Counter + HashMap — O(k) per call ✅

```text
CLASS Cashier:
    INIT(n, discount, products, prices):
        SET self.n ← n
        SET self.discount ← discount
        SET self.priceMap ← {products[i]: prices[i] for each i}
        SET self.count ← 0
    
    FUNCTION getBill(product, amount):
        SET self.count ← self.count + 1
        SET total ← 0
        FOR i ← 0 TO LENGTH(product) - 1:
            SET total ← total + self.priceMap[product[i]] * amount[i]
        IF self.count MOD self.n = 0:
            SET total ← total * (100 - self.discount) / 100
        RETURN total
```

---

## 4. Walkthrough

| Step | Customer # | Products (id, qty) | Subtotal | Discount Applied? | Bill Returned |
|------|------------|--------------------|----------|-------------------|---------------|
| 1    | 1          | (1,1), (2,2)       | 100*1 + 200*2 = 500 | No | 500 |
| 2    | 2          | (3,1)              | 300*1 = 300 | No | 300 |
| 3    | 3          | (1,1), (3,1)       | 100 + 300 = 400 | Yes (50%) | 200 |

The counter increments each call; when `count % n == 0`, the discount factor is applied.

---

## 5. Complexity Analysis

- **Time:** O(k) per `getBill`, where k is the number of distinct products in the order.
- **Space:** O(p) for storing the price map of p products.

---

## Follow-Up Questions

- How would you extend the design to support multiple discount rules (e.g., different discounts for different customer groups)?
- Can you modify the solution to handle bulk updates to product prices efficiently?

---

## Key Takeaway

> Simple simulation with a counter modulo `n`. Store prices in a hashmap for O(1) lookup per product.
