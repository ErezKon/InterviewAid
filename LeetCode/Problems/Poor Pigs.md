# 458. Poor Pigs

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/poor-pigs](https://leetcode.com/problems/poor-pigs)
**Companies:** Google

---

## Problem Description
You have `buckets` buckets of water, each containing either poison or water. You have `minutesToTest` minutes to determine which `buckets` are poisonous using `pigs` pigs. A pig dies if it drinks poison within `minutesToDie` minutes. After each round (lasting `minutesToDie` minutes) you can reuse surviving pigs for the next round. Return the minimum number of pigs needed to guarantee identification of all poisonous buckets.

## Examples
**Example 1:**
```
Input: buckets = 1000, minutesToDie = 15, minutesToTest = 60
Output: 5
Explanation: 5 pigs can test 5^4 = 625 combinations per round, enough for 1000 buckets.
```
**Example 2:**
```
Input: buckets = 4, minutesToDie = 15, minutesToTest = 15
Output: 2
Explanation: Only one round is possible, so each pig provides a binary outcome.
```

## Approach
**Algorithm:** Information theory / base‑`(rounds+1)` encoding
**Key Insight:** In `R = minutesToTest / minutesToDie` rounds, each pig can produce `R+1` distinct states (dies in round 1…R or survives). With `p` pigs we can encode `(R+1)^p` bucket outcomes. Find the smallest `p` such that `(R+1)^p >= buckets`.

```text
FUNCTION poorPigs(buckets, minutesToDie, minutesToTest):
    rounds ← minutesToTest DIV minutesToDie
    states ← rounds + 1
    pigs ← 0
    WHILE states^pigs < buckets:
        pigs ← pigs + 1
    RETURN pigs
```

## Walkthrough
For `buckets=1000, minutesToDie=15, minutesToTest=60`:
- `rounds = 60 / 15 = 4`
- `states = 5`
- Find smallest `p` with `5^p >= 1000` → `p=5` because `5^4=625 < 1000` and `5^5=3125 >= 1000`.
Thus 5 pigs suffice.

## Complexity Analysis
- **Time:** O(log buckets) – each iteration multiplies `states` until the condition is met.
- **Space:** O(1).

## Follow‑Up Questions
1. How would the solution change if pigs could be reused within a round (partial testing)?
2. What if the test time is not an exact multiple of `minutesToDie`?
3. Can you extend the approach to minimize total testing time given a fixed number of pigs?

## Key Takeaway
Each pig provides `R+1` states across `R` rounds; the minimum number of pigs is the smallest `p` where `(R+1)^p` covers all buckets.
