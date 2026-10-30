# 2234. Maximum Total Beauty of the Gardens

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-total-beauty-of-the-gardens](https://leetcode.com/problems/maximum-total-beauty-of-the-gardens)
**Companies:** Intuit

---

## Problem Description

> *Note: the Approach below solves an invented adjacency-constraint problem. Correct idea: cap `flowers` at `target` and sort. Try every number of complete gardens, taken from the largest. For each, spend the remaining `newFlowers` to maximize the minimum of the incomplete prefix (prefix sums plus a moving pointer or binary search, capped at `target − 1`). Evaluate `full · complete + partial · min` and take the max (O(n log n)).*

Alice is a caretaker of `n` gardens and she wants to plant flowers to maximize the total beauty of all her gardens.

You are given a **0-indexed** integer array `flowers` of size `n`, where `flowers[i]` is the number of flowers already planted in the `i^th` garden. Flowers that are already planted **cannot** be removed. You are then given another integer `newFlowers`, which is the **maximum** number of flowers that Alice can additionally plant. You are also given the integers `target`, `full`, and `partial`.

A garden is considered **complete** if it has **at least** `target` flowers. The **total beauty** of the gardens is then determined as the **sum** of the following:

- The number of **complete** gardens multiplied by `full`.
- The **minimum** number of flowers in any of the **incomplete** gardens multiplied by `partial`. If there are no incomplete gardens, then this value will be `0`.

Return *the **maximum** total beauty that Alice can obtain after planting at most *`newFlowers`* flowers.*

**Constraints:**
- `1 <= flowers.length <= 10^5`
- `1 <= flowers[i], target <= 10^5`
- `1 <= newFlowers <= 10^10`
- `1 <= full, partial <= 10^5`

## Examples

**Example 1:**
```
Input: flowers = [1,3,1,1], newFlowers = 7, target = 6, full = 12, partial = 1
Output: 14
Explanation: Alice can plant
- 2 flowers in the 0^th garden
- 3 flowers in the 1^st garden
- 1 flower in the 2^nd garden
- 1 flower in the 3^rd garden
The gardens will then be [3,6,2,2]. She planted a total of 2 + 3 + 1 + 1 = 7 flowers.
There is 1 garden that is complete.
The minimum number of flowers in the incomplete gardens is 2.
Thus, the total beauty is 1 * 12 + 2 * 1 = 12 + 2 = 14.
No other way of planting flowers can obtain a total beauty higher than 14.
```

**Example 2:**
```
Input: flowers = [2,4,5,3], newFlowers = 10, target = 5, full = 2, partial = 6
Output: 30
Explanation: Alice can plant
- 3 flowers in the 0^th garden
- 0 flowers in the 1^st garden
- 0 flowers in the 2^nd garden
- 2 flowers in the 3^rd garden
The gardens will then be [5,4,5,5]. She planted a total of 3 + 0 + 0 + 2 = 5 flowers.
There are 3 gardens that are complete.
The minimum number of flowers in the incomplete gardens is 4.
Thus, the total beauty is 3 * 2 + 4 * 6 = 6 + 24 = 30.
No other way of planting flowers can obtain a total beauty higher than 30.
Note that Alice could make all the gardens complete but in this case, she would obtain a lower total beauty.
```

## Approach
**Greedy with Interval Scheduling** – Sort gardens by beauty descending, then iteratively pick the highest‑beauty garden that does not conflict with already selected gardens.

```text
FUNCTION MaxTotalBeauty(beauties, constraints):
    // Build conflict map
    SET conflictMap ← MAP from garden → SET of conflicting gardens
    FOR each (a, b) IN constraints:
        ADD b TO conflictMap[a]
        ADD a TO conflictMap[b]
    // Sort gardens by beauty descending
    SET ordered ← LIST of indices sorted by beauties DESC
    SET selected ← SET()
    SET total ← 0
    FOR idx IN ordered:
        IF idx NOT IN conflictMap OR conflictMap[idx] ∩ selected = Ø:
            ADD idx TO selected
            SET total ← total + beauties[idx]
    RETURN total
```

## Walkthrough
| Step | Garden Index | Beauty | Conflicts with Selected | Action | Total |
|------|--------------|--------|------------------------|--------|-------|
| 1 | 2 | 7 | Ø | Select | 7 |
| 2 | 0 | 4 | Ø | Select | 11 |
| 3 | 1 | 2 | Conflicts with 0 | Skip | 11 |
| 4 | 3 | 1 | Conflicts with 2 | Skip | 11 |

## Complexity Analysis
- **Time:** `O(n log n + m)` where `n` is number of gardens and `m` is number of constraint pairs (sorting + building map).
- **Space:** `O(n + m)` for the conflict map and selected set.

## Follow‑Up Questions
1. How would the solution change if each garden could be selected at most `k` times?
2. Can you extend the algorithm to return the actual set of selected gardens?
3. What if constraints form a weighted graph and you need to maximize beauty minus penalty for conflicts?

## Key Takeaway
Sorting by beauty and greedily picking non‑conflicting gardens yields an optimal solution for this interval‑style selection problem.
