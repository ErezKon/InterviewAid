# 1912. Design Movie Rental System

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/design-movie-rental-system](https://leetcode.com/problems/design-movie-rental-system)
**Companies:** Amazon, Flipkart

---

## Problem Description

Design a movie rental system that spans multiple shops. Implement operations to search for the cheapest available shops for a given movie, rent a movie from a shop, return (drop) a rented movie, and report the cheapest currently rented movies across all shops.

---

## Examples

**Example 1:**
```
Input:
  entries = [[0,1,5],[0,2,6],[0,3,7],[1,1,4],[1,2,5]]
  operations = ["search", "rent", "search", "drop", "report"]
  args = [[1],[0,1],[2],[0,2],[]]
Output: [[0,1,2],[0,1],[0,2,1,3,4]]
Explanation:
- search(1) returns shops 0,1,2 (prices 5,4,5) sorted by price then shop.
- rent(0,1) moves movie 1 from shop 0 to rented list.
- search(2) now excludes shop 0 because movie 2 is still available there.
- drop(0,2) returns movie 2 to availability.
- report() returns the five cheapest rented movies.
```

**Example 2:**
```
Input:
  entries = [[2,5,10]]
  operations = ["search", "rent", "report"]
  args = [[5],[2,5],[]]
Output: [[2],[[2,5]]]
Explanation:
- Only one shop (2) has movie 5 at price 10.
- After renting, report shows that single rented movie.
```

---

## Key Insight

Maintain two indexed structures: available movies per movie ID (sorted by price, then shop) and a global set of rented entries (sorted by price, shop, movie). Sorted containers give O(log n) updates and O(1) top‑5 reads.

---

## Approach

```text
CLASS MovieRentingSystem:
    CONSTRUCTOR(n, entries):
        price = {}                              // (shop, movie) → price
        available = DEFAULTDICT(SortedList)     // movie → [(price, shop)]
        rented = SortedList()                   // [(price, shop, movie)]
        FOR [shop, movie, p] IN entries:
            price[(shop, movie)] = p
            available[movie].ADD((p, shop))

    FUNCTION search(movie):
        // Return up to 5 cheapest shops with the movie available
        RETURN [shop FOR (p, shop) IN available[movie][:5]]

    FUNCTION rent(shop, movie):
        p = price[(shop, movie)]
        available[movie].REMOVE((p, shop))
        rented.ADD((p, shop, movie))

    FUNCTION drop(shop, movie):
        p = price[(shop, movie)]
        rented.REMOVE((p, shop, movie))
        available[movie].ADD((p, shop))

    FUNCTION report():
        // Return up to 5 cheapest rented movies as [shop, movie]
        RETURN [[shop, movie] FOR (p, shop, movie) IN rented[:5]]
```

---

## Walkthrough

Consider the first example, after initializing entries:
1. **search(1)** looks up `available[1] = [(4,1),(5,0),(5,2)]` → returns shops `[1,0,2]` (price 4, then 5 with lower shop index).
2. **rent(0,1)** removes `(5,0)` from `available[1]` and inserts `(5,0,1)` into `rented`.
3. **search(2)** now sees `available[2] = [(5,0),(6,0)]` (shop 0 still has movie 2) → returns `[0]`.
4. **drop(0,2)** moves `(6,0,2)` from `rented` back to `available[2]`.
5. **report()** reads the first five entries of `rented`, which currently holds only `(5,0,1)` → returns `[[0,1]]`.
The sorted containers guarantee each operation respects the required tie‑breaking order.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(log n) for `rent`/`drop`, O(1) for `search`/`report` (slice of sorted list) |
| **Space** | O(n) to store all entries |

---

## Follow-Up Questions

1. How would you extend the system to support bulk rentals of multiple movies in a single operation?
2. What changes are needed if shops can dynamically change movie prices?
3. Can you design a version that works with a distributed database while preserving the ordering guarantees?

---

## Key Takeaway

> **Two sorted indexes: per‑movie availability sorted by `(price, shop)` and a global rented list sorted by `(price, shop, movie)`. Sorting keys encode the exact tie‑breaking rules, so top‑5 queries are just slices.**