# 1357. Apply Discount Every n Orders

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/apply-discount-every-n-orders](https://leetcode.com/problems/apply-discount-every-n-orders)
**Companies:** Meta

---

## 1. Problem Description

There is a supermarket that is frequented by many customers. The products sold at the supermarket are represented as two parallel integer arrays `products` and `prices`, where the `i^th` product has an ID of `products[i]` and a price of `prices[i]`.

When a customer is paying, their bill is represented as two parallel integer arrays `product` and `amount`, where the `j^th` product they purchased has an ID of `product[j]`, and `amount[j]` is how much of the product they bought. Their subtotal is calculated as the sum of each `amount[j] * (price of the j^th product)`.

The supermarket decided to have a sale. Every `n^th` customer paying for their groceries will be given a **percentage discount**. The discount amount is given by `discount`, where they will be given `discount` percent off their subtotal. More formally, if their subtotal is `bill`, then they would actually pay `bill * ((100 - discount) / 100)`.

Implement the `Cashier` class:

- `Cashier(int n, int discount, int[] products, int[] prices)` Initializes the object with `n`, the `discount`, and the `products` and their `prices`.
- `double getBill(int[] product, int[] amount)` Returns the final total of the bill with the discount applied (if any). Answers within `10^-5` of the actual value will be accepted.

**Constraints:**
- `1 <= n <= 10^4`
- `0 <= discount <= 100`
- `1 <= products.length <= 200`
- `prices.length == products.length`
- `1 <= products[i] <= 200`
- `1 <= prices[i] <= 1000`
- The elements in `products` are **unique**.
- `1 <= product.length <= products.length`
- `amount.length == product.length`
- `product[j]` exists in `products`.
- `1 <= amount[j] <= 1000`
- The elements of `product` are **unique**.
- At most `1000` calls will be made to `getBill`.
- Answers within `10^-5` of the actual value will be accepted.

---

## 2. Examples

**Example 1:**
```
Input
["Cashier","getBill","getBill","getBill","getBill","getBill","getBill","getBill"]
[[3,50,[1,2,3,4,5,6,7],[100,200,300,400,300,200,100]],[[1,2],[1,2]],[[3,7],[10,10]],[[1,2,3,4,5,6,7],[1,1,1,1,1,1,1]],[[4],[10]],[[7,3],[10,10]],[[7,5,3,1,6,4,2],[10,10,10,9,9,9,7]],[[2,3,5],[5,3,2]]]
Output:
[null,500.0,4000.0,800.0,4000.0,4000.0,7350.0,2500.0]
Explanation:
Cashier cashier = new Cashier(3,50,[1,2,3,4,5,6,7],[100,200,300,400,300,200,100]);
cashier.getBill([1,2],[1,2]);                        // return 500.0. 1^st customer, no discount.
                                                     // bill = 1 * 100 + 2 * 200 = 500.
cashier.getBill([3,7],[10,10]);                      // return 4000.0. 2^nd customer, no discount.
                                                     // bill = 10 * 300 + 10 * 100 = 4000.
cashier.getBill([1,2,3,4,5,6,7],[1,1,1,1,1,1,1]);    // return 800.0. 3^rd customer, 50% discount.
                                                     // Original bill = 1600
                                                     // Actual bill = 1600 * ((100 - 50) / 100) = 800.
cashier.getBill([4],[10]);                           // return 4000.0. 4^th customer, no discount.
cashier.getBill([7,3],[10,10]);                      // return 4000.0. 5^th customer, no discount.
cashier.getBill([7,5,3,1,6,4,2],[10,10,10,9,9,9,7]); // return 7350.0. 6^th customer, 50% discount.
                                                     // Original bill = 14700, but with
                                                     // Actual bill = 14700 * ((100 - 50) / 100) = 7350.
cashier.getBill([2,3,5],[5,3,2]);                    // return 2500.0.  7^th customer, no discount.
```

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
