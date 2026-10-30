# 1744. Can You Eat Your Favorite Candy on Your Favorite Day?

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/can-you-eat-your-favorite-candy-on-your-favorite-day](https://leetcode.com/problems/can-you-eat-your-favorite-candy-on-your-favorite-day)
**Companies:** Fleetx

---

## 1. Problem Description

You are given a **(0-indexed)** array of positive integers `candiesCount` where `candiesCount[i]` represents the number of candies of the `i`-th type you have. You are also given a 2D array `queries` where `queries[i] = [favoriteType_i, favoriteDay_i, dailyCap_i]`.

You play a game with the following rules:

- You start eating candies on day **`0`**.
- You **cannot** eat **any** candy of type `i` unless you have eaten **all** candies of type `i - 1`.
- You must eat **at least** **one** candy per day until you have eaten all the candies.

Construct a boolean array `answer` such that `answer.length == queries.length` and `answer[i]` is `true` if you can eat a candy of type `favoriteType_i` on day `favoriteDay_i` without eating **more than** `dailyCap_i` candies on **any** day, and `false` otherwise. Note that you can eat different types of candy on the same day, provided that you follow rule 2.

Return *the constructed array* `answer`.

**Constraints:**
- `1 <= candiesCount.length <= 10^5`
- `1 <= candiesCount[i] <= 10^5`
- `1 <= queries.length <= 10^5`
- `queries[i].length == 3`
- `0 <= favoriteType_i < candiesCount.length`
- `0 <= favoriteDay_i <= 10^9`
- `1 <= dailyCap_i <= 10^9`

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

```
Example 1:
  Input: candiesCount = [7,4,5,3,8], queries = [[0,2,2],[4,2,4],[2,13,1000000000]]
  Output: [true,false,true]
  Explanation:
  1- If you eat 2 candies (type 0) on day 0 and 2 candies (type 0) on day 1, you will eat a candy of type 0 on day 2.
  2- You can eat at most 4 candies each day.
     If you eat 4 candies every day, you will eat 4 candies (type 0) on day 0 and 4 candies (type 0 and type 1) on day 1.
     On day 2, you can only eat 4 candies (type 1 and type 2), so you cannot eat a candy of type 4 on day 2.
  3- If you eat 1 candy each day, you will eat a candy of type 2 on day 13.
```

```
Example 2:
  Input: candiesCount = [5,2,6,4,1], queries = [[3,1,2],[4,10,3],[3,10,100],[4,100,30],[1,3,1]]
  Output: [false,true,true,false,false]
```

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
