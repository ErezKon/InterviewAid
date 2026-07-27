# 2353. Design a Food Rating System

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-a-food-rating-system](https://leetcode.com/problems/design-a-food-rating-system)
**Companies:** Amazon, Atlassian, Google, Microsoft

---

## Problem Description

Design a system to manage food items with cuisines and ratings. Support changing ratings and querying the highest-rated food per cuisine.

---

## Approach

```
CLASS FoodRatings:
    CONSTRUCTOR(foods, cuisines, ratings):
        self.foodCuisine = {f: c for f, c in zip(foods, cuisines)}
        self.foodRating = {f: r for f, r in zip(foods, ratings)}
        self.cuisineHeap = defaultdict(SortedList)
        FOR f, c, r IN zip(foods, cuisines, ratings):
            cuisineHeap[c].ADD((-r, f))

    FUNCTION changeRating(food, newRating):
        c = foodCuisine[food]
        cuisineHeap[c].REMOVE((-foodRating[food], food))
        foodRating[food] = newRating
        cuisineHeap[c].ADD((-newRating, food))

    FUNCTION highestRated(cuisine):
        RETURN cuisineHeap[cuisine][0][1]
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(log n) per change/query with SortedList |
| **Space** | O(n) |

---

## Key Takeaway

> **SortedList per cuisine with `(-rating, name)` tuples gives O(log n) updates and O(1) top query. Negate rating for max-first ordering; name breaks ties lexicographically.**
