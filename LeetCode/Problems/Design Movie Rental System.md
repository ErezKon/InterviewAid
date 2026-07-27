# 1912. Design Movie Rental System

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/design-movie-rental-system](https://leetcode.com/problems/design-movie-rental-system)
**Companies:** Amazon, Flipkart

---

## Problem Description

Design a movie rental system across shops: `search(movie)` returns 5 cheapest shops with the movie unrented, `rent(shop, movie)`, `drop(shop, movie)`, `report()` returns 5 cheapest rented movies.

---

## Key Insight

Maintain two indexed structures: available movies per movie ID (sorted by price, then shop) and a global set of rented entries (sorted by price, shop, movie). Sorted containers give O(log n) updates and O(1) top-5 reads.

---

## Approach

```
CLASS MovieRentingSystem:
    CONSTRUCTOR(n, entries):
        price = {}                              // (shop, movie) → price
        available = defaultdict(SortedList)     // movie → [(price, shop)]
        rented = SortedList()                   // [(price, shop, movie)]
        FOR [shop, movie, p] IN entries:
            price[(shop, movie)] = p
            available[movie].ADD((p, shop))

    FUNCTION search(movie):
        RETURN [shop for (p, shop) IN available[movie][:5]]

    FUNCTION rent(shop, movie):
        p = price[(shop, movie)]
        available[movie].REMOVE((p, shop))
        rented.ADD((p, shop, movie))

    FUNCTION drop(shop, movie):
        p = price[(shop, movie)]
        rented.REMOVE((p, shop, movie))
        available[movie].ADD((p, shop))

    FUNCTION report():
        RETURN [[shop, movie] for (p, shop, movie) IN rented[:5]]
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(log n) rent/drop, O(1) search/report |
| **Space** | O(n) entries |

---

## Key Takeaway

> **Two sorted indexes: per-movie availability sorted by `(price, shop)` and a global rented list sorted by `(price, shop, movie)`. Sort keys encode the exact tie-breaking rules, so top-5 queries are just slices.**
