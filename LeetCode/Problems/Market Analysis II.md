# 1159. Market Analysis II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/market-analysis-ii](https://leetcode.com/problems/market-analysis-ii)
**Companies:** Poshmark

---

## 1. Problem Description (SQL)

For each user, check if the brand of their 2nd item sold matches their favorite brand.

---

## 2. Approach: SQL — ROW_NUMBER + Join ✅

```sql
SELECT u.user_id AS seller_id,
    CASE WHEN i.item_brand = u.favorite_brand THEN 'yes' ELSE 'no' END AS 2nd_item_fav_brand
FROM Users u
LEFT JOIN (
    SELECT seller_id, item_id,
        ROW_NUMBER() OVER (PARTITION BY seller_id ORDER BY order_date) AS rn
    FROM Orders
) o ON u.user_id = o.seller_id AND o.rn = 2
LEFT JOIN Items i ON o.item_id = i.item_id;
```

---

## 3. Examples

**Example 1:**
```sql
-- Users table
user_id | favorite_brand
1       | 'Nike'
2       | 'Adidas'

-- Orders table (ordered by order_date)
order_id | seller_id | item_id | order_date
101      | 1         | 10      | 2020-01-01
102      | 1         | 11      | 2020-02-01   -- 2nd item sold by user 1
103      | 2         | 12      | 2020-01-15
104      | 2         | 13      | 2020-03-01   -- 2nd item sold by user 2

-- Items table
item_id | item_brand
10      | 'Nike'
11      | 'Adidas'
12      | 'Adidas'
13      | 'Adidas'
```
Result:
```
seller_id | 2nd_item_fav_brand
1         | 'no'   -- 2nd item brand Adidas ≠ favorite Nike
2         | 'yes'  -- 2nd item brand Adidas = favorite Adidas
```

**Example 2:** Users with fewer than two sold items get `NULL` for the brand comparison, which is treated as `no`.

---

## 4. Walkthrough

| Step | Action | 2nd Item Brand | Favorite Brand | Result |
|------|--------|----------------|----------------|--------|
| 1    | Compute ROW_NUMBER per seller ordered by `order_date` | – | – | Assigns rank to each sold item |
| 2    | Filter rows where `rn = 2` | Brand of the second sold item | – | Isolated second item per seller |
| 3    | Join with `Items` to get `item_brand` and compare to `favorite_brand` | `item_brand` | `favorite_brand` | `'yes'` if equal else `'no'` |

---

## 5. Complexity Analysis

- **Time:** The query runs in O(|Orders| log |Orders|) due to the window function, plus linear joins on `Users` and `Items`.
- **Space:** O(|Orders|) for the intermediate window result and O(|Users| + |Items|) for join buffers.

---

## 6. Follow‑Up Questions

- How would you modify the query to find the brand of the *k*‑th sold item?
- Can you write a version that returns the full list of items sold by each user with their rank?
- How would you handle ties when multiple items share the same `order_date`?

---

## Key Takeaway

> Use `ROW_NUMBER` to isolate the N‑th record per group, then join to compare attributes.
