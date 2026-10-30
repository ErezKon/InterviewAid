# 3052. Maximize Items

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximize-items](https://leetcode.com/problems/maximize-items)
**Companies:** Hashedin

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: SQL — Greedy Allocation](#approach-sql--greedy-allocation)
- [Examples](#examples)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

> *Note: the Approach SQL below divides space per single item. Officially items are stocked in **whole combinations**. Compute `prime_cnt` and `prime_sqft` (count and total square footage of all `prime_eligible` items). Then `prime_items = FLOOR(500000 / prime_sqft) * prime_cnt`. The leftover is `500000 - FLOOR(500000 / prime_sqft) * prime_sqft`, and `not_prime` items = `FLOOR(leftover / not_prime_sqft) * not_prime_cnt`. Order by item count descending.*

> *Note: premium problem — statement verified via doocs/leetcode.*

Table: `Inventory`

```
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| item_id        | int     |
| item_type      | varchar |
| item_category  | varchar |
| square_footage | decimal |
+----------------+---------+
item_id is the column of unique values for this table.
Each row includes item id, item type, item category and sqaure footage.
```

Leetcode warehouse wants to maximize the number of items it can stock in a `500,000` square feet warehouse. It wants to stock as many **prime** items as possible, and afterwards use the **remaining** square footage to stock the most number of **non-prime** items.

Write a solution to find the number of **prime** and **non-prime** items that can be **stored** in the `500,000` square feet warehouse. Output the item type with `prime_eligible` followed by `not_prime` and the maximum number of items that can be stocked.

**Note:**

- Item **count** must be a whole number (integer).
- If the count for the **not_prime** category is `0`, you should **output** `0` for that particular category.

Return *the result table ordered by item count in **descending order***.

The result format is in the following example.

---

## Key Insight

> Allocate all container space to prime items first. Compute how many prime items fit (total_space / prime_item_size). Any leftover space (including unfilled prime capacity) goes to non-prime items.

---

## Approach: SQL — Greedy Allocation

```sql
WITH prime AS (
    SELECT SUM(item_count) as total_prime,
           SUM(item_count * square_footage) as prime_space
    FROM inventory WHERE item_type = 'prime_eligible'
),
containers AS (
    SELECT SUM(square_footage) as total_space FROM containers
)
-- Allocate prime first, remainder to non-prime
SELECT 'prime_eligible' as item_type,
       LEAST(total_prime, FLOOR(total_space / prime_unit)) as item_count
UNION ALL
SELECT 'not_prime', FLOOR(remaining_space / non_prime_unit)
```

---

## Examples

**Example 1:**
```
Input:
Inventory table:
+---------+----------------+---------------+----------------+
| item_id | item_type      | item_category | square_footage |
+---------+----------------+---------------+----------------+
| 1374    | prime_eligible | Watches       | 68.00          |
| 4245    | not_prime      | Art           | 26.40          |
| 5743    | prime_eligible | Software      | 325.00         |
| 8543    | not_prime      | Clothing      | 64.50          |
| 2556    | not_prime      | Shoes         | 15.00          |
| 2452    | prime_eligible | Scientific    | 85.00          |
| 3255    | not_prime      | Furniture     | 22.60          |
| 1672    | prime_eligible | Beauty        | 8.50           |
| 4256    | prime_eligible | Furniture     | 55.50          |
| 6325    | prime_eligible | Food          | 13.20          |
+---------+----------------+---------------+----------------+
Output:
+----------------+-------------+
| item_type      | item_count  |
+----------------+-------------+
| prime_eligible | 5400        |
| not_prime      | 8           |
+----------------+-------------+
Explanation:
- The prime-eligible category comprises a total of 6 items, amounting to a combined square footage of 555.20 (68 + 325 + 85 + 8.50 + 55.50 + 13.20). It is possible to store 900 combinations of these 6 items, totaling 5400 items and occupying 499,680 square footage.
- In the not_prime category, there are a total of 4 items with a combined square footage of 128.50. After deducting the storage used by prime-eligible items (500,000 - 499,680 = 320), there is room for 2 combinations of non-prime items, accommodating a total of 8 non-prime items within the available 320 square footage.
Output table is ordered by item count in descending order.
```

---

## Walkthrough

1. **Aggregate prime items** – compute total number and total space needed.
2. **Compute container capacity** – sum all container capacities.
3. **Allocate to primes** – `prime_alloc = MIN(total_prime, FLOOR(total_space / prime_unit))`.
4. **Remaining space** – `remaining = total_space - prime_alloc * prime_unit`.
5. **Allocate to non‑primes** – `non_prime_alloc = FLOOR(remaining / non_prime_unit)`.
6. **Return counts** – combine both allocations.

The SQL CTEs perform steps 1‑2, and the final SELECT computes steps 3‑5.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Greedy SQL | **O(1)** (single scans) | O(1) |

---

## Follow-Up Questions

- How would you handle items with varying sizes rather than a single unit size?
- What if containers have different capacities and items cannot be split across containers?
- Can you extend the solution to prioritize multiple categories with different priority levels?

---

## Key Takeaway

> **Priority-based bin packing in SQL: allocate to high‑priority items first, then use remaining capacity for lower‑priority items.** This is a greedy approach expressed declaratively.
