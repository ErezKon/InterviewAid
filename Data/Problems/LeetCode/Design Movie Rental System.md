# 1912. Design Movie Rental System

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/design-movie-rental-system](https://leetcode.com/problems/design-movie-rental-system)
**Companies:** Amazon, Flipkart

---

## Problem Description

You have a movie renting company consisting of `n` shops. You want to implement a renting system that supports searching for, booking, and returning movies. The system should also support generating a report of the currently rented movies.

Each movie is given as a 2D integer array `entries` where `entries[i] = [shop_i, movie_i, price_i]` indicates that there is a copy of movie `movie_i` at shop `shop_i` with a rental price of `price_i`. Each shop carries **at most one** copy of a movie `movie_i`.

The system should support the following functions:

- **Search**: Finds the **cheapest 5 shops** that have an **unrented copy** of a given movie. The shops should be sorted by **price** in ascending order, and in case of a tie, the one with the **smaller** `shop_i` should appear first. If there are less than 5 matching shops, then all of them should be returned. If no shop has an unrented copy, then an empty list should be returned.
- **Rent**: Rents an **unrented copy** of a given movie from a given shop.
- **Drop**: Drops off a **previously rented copy** of a given movie at a given shop.
- **Report**: Returns the **cheapest 5 rented movies** (possibly of the same movie ID) as a 2D list `res` where `res[j] = [shop_j, movie_j]` describes that the `j`-th cheapest rented movie `movie_j` was rented from the shop `shop_j`. The movies in `res` should be sorted by **price** in ascending order, and in case of a tie, the one with the **smaller** `shop_j` should appear first, and if there is still tie, the one with the **smaller** `movie_j` should appear first. If there are fewer than 5 rented movies, then all of them should be returned. If no movies are currently being rented, then an empty list should be returned.

Implement the `MovieRentingSystem` class:

- `MovieRentingSystem(int n, int[][] entries)` Initializes the `MovieRentingSystem` object with `n` shops and the movies in `entries`.
- `List<Integer> search(int movie)` Returns a list of shops that have an **unrented copy** of the given `movie` as described above.
- `void rent(int shop, int movie)` Rents the given `movie` from the given `shop`.
- `void drop(int shop, int movie)` Drops off a previously rented `movie` at the given `shop`.
- `List<List<Integer>> report()` Returns a list of cheapest **rented** movies as described above.

**Note:** The test cases will be generated such that `rent` will only be called if the shop has an **unrented** copy of the movie, and `drop` will only be called if the shop had **previously rented** out the movie.

**Constraints:**
- `1 <= n <= 3 * 10^5`
- `1 <= entries.length <= 10^5`
- `0 <= shop_i < n`
- `1 <= movie_i, price_i <= 10^4`
- Each shop carries **at most one** copy of a movie `movie_i`.
- At most `10^5` calls **in total** will be made to `search`, `rent`, `drop` and `report`.

---

## Examples

```
Example 1:
  Input:
  ["MovieRentingSystem", "search", "rent", "rent", "report", "drop", "search"]
  [[3, [[0, 1, 5], [0, 2, 6], [0, 3, 7], [1, 1, 4], [1, 2, 7], [2, 1, 5]]], [1], [0, 1], [1, 2], [], [1, 2], [2]]
  Output:
  [null, [1, 0, 2], null, null, [[0, 1], [1, 2]], null, [0, 1]]
  Explanation:
  MovieRentingSystem movieRentingSystem = new MovieRentingSystem(3, [[0, 1, 5], [0, 2, 6], [0, 3, 7], [1, 1, 4], [1, 2, 7], [2, 1, 5]]);
  movieRentingSystem.search(1);  // return [1, 0, 2], Movies of ID 1 are unrented at shops 1, 0, and 2. Shop 1 is cheapest; shop 0 and 2 are the same price, so order by shop number.
  movieRentingSystem.rent(0, 1); // Rent movie 1 from shop 0. Unrented movies at shop 0 are now [2,3].
  movieRentingSystem.rent(1, 2); // Rent movie 2 from shop 1. Unrented movies at shop 1 are now [1].
  movieRentingSystem.report();   // return [[0, 1], [1, 2]]. Movie 1 from shop 0 is cheapest, followed by movie 2 from shop 1.
  movieRentingSystem.drop(1, 2); // Drop off movie 2 at shop 1. Unrented movies at shop 1 are now [1,2].
  movieRentingSystem.search(2);  // return [0, 1]. Movies of ID 2 are unrented at shops 0 and 1. Shop 0 is cheapest, followed by shop 1.
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