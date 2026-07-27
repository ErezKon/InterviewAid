# 1744. Can You Eat Your Favorite Candy on Your Favorite Day?

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/can-you-eat-your-favorite-candy-on-your-favorite-day](https://leetcode.com/problems/can-you-eat-your-favorite-candy-on-your-favorite-day)
**Companies:** Fleetx

---

## 1. Problem Description

Given `candiesCount` (number of candies of each type), and queries `[favoriteType, favoriteDay, dailyCap]`, determine if you can eat a candy of `favoriteType` on `favoriteDay` (0-indexed), eating 1 to `dailyCap` candies per day. Must eat types in order (finish type 0 before type 1, etc.).

---

## 2. Key Insight

> Use **prefix sums** of candy counts. On day `d`, you've eaten between `d+1` (min 1/day) and `(d+1)×cap` (max cap/day) candies total. Type `t` candies are at positions `[prefix[t]+1, prefix[t+1]]`. The ranges must overlap.

---

## 3. Approach: Prefix Sum + Range Overlap — O(n + q) ✅

```
FUNCTION canEat(candiesCount, queries):
    prefix = prefix_sum(candiesCount)    // prefix[i] = total candies of types 0..i-1
    result = []
    FOR type, day, cap IN queries:
        // Candies eaten by day: [day+1, (day+1)*cap]
        minEaten = day + 1
        maxEaten = (day + 1) * cap
        // Type's candy range: (prefix[type], prefix[type+1]]
        firstCandy = prefix[type] + 1
        lastCandy = prefix[type + 1]
        result.ADD(minEaten <= lastCandy AND maxEaten >= firstCandy)
    RETURN result
```

| Time | Space |
|------|-------|
| O(n + q) | O(n) |

---

## Key Takeaway

> Convert the problem into range overlap: range of total candies eaten by a given day vs. range of candy indices for the target type. Two ranges overlap iff `min1 ≤ max2 AND min2 ≤ max1`.
