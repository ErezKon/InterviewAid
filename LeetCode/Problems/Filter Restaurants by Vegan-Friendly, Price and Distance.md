# 1333. Filter Restaurants by Vegan-Friendly, Price and Distance

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/filter-restaurants-by-vegan-friendly-price-and-distance](https://leetcode.com/problems/filter-restaurants-by-vegan-friendly-price-and-distance)
**Companies:** Yelp

---

## Problem Description

Given restaurants `[id, rating, veganFriendly, price, distance]`, filter by `veganFriendly`, `maxPrice`, and `maxDistance`. Return IDs sorted by rating descending, then by ID descending.

---

## Approach: Filter + Sort — O(n log n) ✅

```
FUNCTION filterRestaurants(restaurants, veganFriendly, maxPrice, maxDistance):
    filtered = []
    FOR r IN restaurants:
        IF (NOT veganFriendly OR r.veganFriendly == 1)
           AND r.price <= maxPrice
           AND r.distance <= maxDistance:
            filtered.ADD(r)
    SORT filtered BY (-rating, -id)
    RETURN [r.id FOR r IN filtered]
```

---

## Key Takeaway

> **Filter by constraints, then multi-key sort. Straightforward simulation problem — common in real-world API design.**
