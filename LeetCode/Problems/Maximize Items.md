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

Given a table of items with categories (`prime` or `not_prime`) and their space requirements, plus a table of warehouse containers with fixed capacity, maximize the total number of items stored. **Prime items have priority** — allocate space to prime items first, then use remaining space for non-prime items.

This is a **SQL problem**.

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
Items table:
| id | type          | unit_space |
|----|---------------|------------|
| 1  | prime_eligible| 5          |
| 2  | not_prime     | 3          |
Containers table:
| id | capacity |
|----|----------|
| 1  | 20       |
Result: Allocate 3 prime items (3*5=15) leaving 5 space for 1 non‑prime item.
Total stored items = 4.
```

**Example 2:**
```
Prime items total space exceeds container capacity.
Prime unit = 4, containers total = 10.
Maximum prime items = FLOOR(10/4) = 2.
No space left for non‑prime items.
Result = 2 items stored.
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
