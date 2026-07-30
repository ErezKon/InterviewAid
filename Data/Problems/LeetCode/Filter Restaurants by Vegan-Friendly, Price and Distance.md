# 1333. Filter Restaurants by Vegan-Friendly, Price and Distance

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/filter-restaurants-by-vegan-friendly-price-and-distance](https://leetcode.com/problems/filter-restaurants-by-vegan-friendly-price-and-distance)
**Companies:** Yelp

---

## Problem Description

Given restaurants `[id, rating, veganFriendly, price, distance]`, filter by `veganFriendly`, `maxPrice`, and `maxDistance`. Return IDs sorted by rating descending, then by ID descending.

---

## Approach: Filter + Sort — O(n log n) ✅

```text
FUNCTION filterRestaurants(restaurants, veganFriendly, maxPrice, maxDistance):
    SET filtered ← []
    FOR r IN restaurants:
        IF (NOT veganFriendly OR r.veganFriendly == 1) AND r.price <= maxPrice AND r.distance <= maxDistance:
            APPEND r TO filtered
    SORT filtered BY (-r.rating, -r.id)
    RETURN [r.id FOR r IN filtered]
```

---

## Examples

| restaurants | veganFriendly | maxPrice | maxDistance | Output |
|-------------|---------------|----------|-------------|--------|
| `[[1,4,1,40,10],[2,8,0,50,5],[3,8,1,30,4]]` | `1` | `50` | `10` | `[3,1]` |
| `[[1,4,0,30,5],[2,5,0,20,10]]` | `0` | `30` | `5` | `[1]` |

## Walkthrough

Example 1:
1. Iterate each restaurant.
2. Restaurant 1 passes all constraints → add to `filtered`.
3. Restaurant 2 fails `veganFriendly` (required 1) → skip.
4. Restaurant 3 passes → add.
5. `filtered` now contains restaurants 1 and 3.
6. Sort by rating descending, then id descending → order `[3,1]`.
7. Return IDs `[3,1]`.

## Complexity Analysis

- **Time:** O(n log n) due to sorting the filtered list.
- **Space:** O(n) for storing filtered restaurants.

## Key Takeaway

> **Filter by constraints, then multi‑key sort. Straightforward simulation problem — common in real‑world API design.**