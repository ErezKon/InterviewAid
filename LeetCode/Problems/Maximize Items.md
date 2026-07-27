# 3052. Maximize Items

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximize-items](https://leetcode.com/problems/maximize-items)
**Companies:** Hashedin

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: SQL — Greedy Allocation](#approach-sql--greedy-allocation)
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

## Key Takeaway

> **Priority-based bin packing in SQL: allocate to high-priority items first, then use remaining capacity for lower-priority items.** This is a greedy approach expressed declaratively.
