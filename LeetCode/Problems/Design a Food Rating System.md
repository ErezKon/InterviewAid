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

## Examples

**Example 1:**
```
foods = ["kimchi", "miso", "sushi", "ramen"]
cuisines = ["korean", "japanese", "japanese", "japanese"]
ratings = [9, 12, 8, 15]
fr = FoodRatings(foods, cuisines, ratings)
fr.highestRated("japanese") → "ramen"   // rating 15 highest
fr.changeRating("sushi", 16)
fr.highestRated("japanese") → "sushi"   // now sushi has highest rating
```
Explanation: The system initializes heaps per cuisine; after a rating change, the heap is updated to reflect the new order.

---

## Walkthrough

| Step | Operation | Heap for "japanese" (sorted by -rating, name) |
|------|-----------|-----------------------------------------------|
| 1 | Initialize | [(-15, "ramen"), (-12, "miso"), (-8, "sushi")] |
| 2 | `highestRated("japanese")` | Returns "ramen" (top of heap) |
| 3 | `changeRating("sushi", 16)` | Remove (-8, "sushi"), add (-16, "sushi") → [(-16, "sushi"), (-15, "ramen"), (-12, "miso")] |
| 4 | `highestRated("japanese")` | Returns "sushi" |

---

## Complexity Analysis

- **Time:** Each `changeRating` and `highestRated` operation O(log n) due to heap insertion/removal.
- **Space:** O(n) to store food‑to‑cuisine, food‑to‑rating maps and a heap per cuisine.

---

## Follow‑Up Questions

1. How would you support ties by returning the lexicographically smallest food name?
2. Can you extend the design to handle removal of foods?
3. What if you need to query the top k foods per cuisine?

---

## Key Takeaway

> **SortedList per cuisine with `(-rating, name)` tuples gives O(log n) updates and O(1) top query. Negate rating for max‑first ordering; name breaks ties lexicographically.**