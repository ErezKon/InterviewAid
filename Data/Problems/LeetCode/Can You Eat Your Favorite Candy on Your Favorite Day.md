# 1744. Can You Eat Your Favorite Candy on Your Favorite Day?

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/can-you-eat-your-favorite-candy-on-your-favorite-day](https://leetcode.com/problems/can-you-eat-your-favorite-candy-on-your-favorite-day)
**Companies:** Fleetx

---

## 1. Problem Description

Given `candiesCount` (number of candies of each type), and queries `[favoriteType, favoriteDay, dailyCap]`, determine if you can eat a candy of `favoriteType` on `favoriteDay` (0-indexed), eating 1 to `dailyCap` candies per day. Must eat types in order (finish type 0 before type 1, etc.).

---

## 2. Key Insight

> Use **prefix sums** of candy counts. On day `d`, you've eaten between `d+1` (min 1/day) and `(d+1)×cap` candies total. Type `t` candies are at positions `[prefix[t]+1, prefix[t+1]]`. The ranges must overlap.

---

## 3. Approach: Prefix Sum + Range Overlap — O(n + q) ✅

```text
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

## 4. Examples

**Example 1:**
```
candiesCount = [7,4,5,3,8]
queries = [[0,2,2],[4,2,4],[2,13,100]]
```
- Query 0: Day 2, cap 2 → total eaten range [3,6]. Type 0 candies are positions [1,7]. Overlap → `true`.
- Query 1: Day 2, cap 4 → total eaten range [3,12]. Type 4 candies are positions [20,27]. No overlap → `false`.
- Query 2: Day 13, cap 100 → total eaten range [14,1400]. Type 2 candies are positions [12,16]. Overlap → `true`.

**Example 2:**
```
candiesCount = [5,2,6]
queries = [[1,1,1]]
```
- Day 1, cap 1 → total eaten range [2,2]. Type 1 candies are positions [6,7]. No overlap → `false`.

---

## 5. Walkthrough

Consider Example 1, first query `[0,2,2]`:
1. Compute prefix sums: `[0,7,11,16,19,27]`.
2. For type 0: range = (0, 7] → positions 1‑7.
3. Day 2, cap 2 → total candies eaten range = [3, 6].
4. Overlap check: `3 ≤ 7` **and** `6 ≥ 1` → true, so you can eat a type‑0 candy on day 2.

---

## 6. Complexity Analysis

- **Time:** O(n + q) – one pass to build prefix sums (n = number of candy types) and one pass per query.
- **Space:** O(n) for the prefix‑sum array.

---

## Follow-Up Questions

- How would you handle queries where the daily cap varies each day?
- Can you extend the solution to support removing candies from the end of a type?
- What if the candy types can be eaten in any order?

---

## Key Takeaway

> Convert the problem into range overlap: range of total candies eaten by a given day vs. range of candy indices for the target type. Two ranges overlap iff `min1 ≤ max2 AND min2 ≤ max1`.
