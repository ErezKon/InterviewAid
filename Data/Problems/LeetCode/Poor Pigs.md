# 458. Poor Pigs

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/poor-pigs](https://leetcode.com/problems/poor-pigs)
**Companies:** Google

---

## Problem Description

There are `buckets` buckets of liquid, where **exactly one** of the buckets is poisonous. To figure out which one is poisonous, you feed some number of (poor) pigs the liquid to see whether they will die or not. Unfortunately, you only have `minutesToTest` minutes to determine which bucket is poisonous.

You can feed the pigs according to these steps:

1. Choose some live pigs to feed.
2. For each pig, choose which buckets to feed it. The pig will consume all the chosen buckets simultaneously and will take no time. Each pig can feed from any number of buckets, and each bucket can be fed from by any number of pigs.
3. Wait for `minutesToDie` minutes. You may **not** feed any other pigs during this time.
4. After `minutesToDie` minutes have passed, any pigs that have been fed the poisonous bucket will die, and all others will survive.
5. Repeat this process until you run out of time.

Given `buckets`, `minutesToDie`, and `minutesToTest`, return *the **minimum** number of pigs needed to figure out which bucket is poisonous within the allotted time*.

**Constraints:**
- `1 <= buckets <= 1000`
- `1 <= minutesToDie <= minutesToTest <= 100`

## Examples

**Example 1:**
```
Input: buckets = 4, minutesToDie = 15, minutesToTest = 15
Output: 2
Explanation: We can determine the poisonous bucket as follows:
At time 0, feed the first pig buckets 1 and 2, and feed the second pig buckets 2 and 3.
At time 15, there are 4 possible outcomes:
- If only the first pig dies, then bucket 1 must be poisonous.
- If only the second pig dies, then bucket 3 must be poisonous.
- If both pigs die, then bucket 2 must be poisonous.
- If neither pig dies, then bucket 4 must be poisonous.
```

**Example 2:**
```
Input: buckets = 4, minutesToDie = 15, minutesToTest = 30
Output: 2
Explanation: We can determine the poisonous bucket as follows:
At time 0, feed the first pig bucket 1, and feed the second pig bucket 2.
At time 15, there are 2 possible outcomes:
- If either pig dies, then the poisonous bucket is the one it was fed.
- If neither pig dies, then feed the first pig bucket 3, and feed the second pig bucket 4.
At time 30, one of the two pigs must die, and the poisonous bucket is the one it was fed.
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
