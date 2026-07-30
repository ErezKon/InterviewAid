# 1626. Best Team With No Conflicts

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/best-team-with-no-conflicts](https://leetcode.com/problems/best-team-with-no-conflicts)
**Companies:** Blinkit, Google, Morgan Stanley

---

## Problem Description
You are given two integer arrays `scores` and `ages` of the same length, where `scores[i]` and `ages[i]` represent the score and age of the i‑th player. Form a team by selecting any subset of players such that for any two players `i` and `j` in the team, if `ages[i] < ages[j]` then `scores[i] ≤ scores[j]`. Return the maximum possible sum of scores of a valid team.

## Examples
**Example 1:**
```
Input: scores = [1,3,5,10,15], ages = [1,2,3,4,5]
Output: 34
Explanation: Choose all players; ages are increasing and scores are non‑decreasing.
```

**Example 2:**
```
Input: scores = [4,5,6,5], ages = [2,1,2,1]
Output: 16
Explanation: Select players with (score,age) pairs (5,1), (5,1), (6,2) → total 16.
```

## Approach
**LIS‑style DP after sorting — O(n²)**
1. Pair each player as `(age, score)` and sort the list primarily by age and secondarily by score.
2. Let `dp[i]` be the best team score ending with player `i`.
3. For each `i`, consider all previous players `j < i`. If `score[j] ≤ score[i]` (the age condition is already satisfied by sorting), we can extend the team: `dp[i] = max(dp[i], dp[j] + score[i])`.
4. The answer is `max(dp)`.

```text
FUNCTION bestTeamScore(scores, ages):
    players ← ZIP(ages, scores)               // list of (age, score)
    SORT(players)                              // by age, then score
    n ← LENGTH(players)
    dp ← ARRAY of size n, each initialized to players[i].score
    FOR i ← 1 TO n-1:
        FOR j ← 0 TO i-1:
            IF players[j].score ≤ players[i].score:
                dp[i] ← MAX(dp[i], dp[j] + players[i].score)
    RETURN MAX(dp)
```

## Walkthrough
For `scores = [4,5,6,5]`, `ages = [2,1,2,1]`:
- Pair & sort → `[(1,5),(1,5),(2,4),(2,6)]`.
- Initialize `dp = [5,5,4,6]`.
- `i=1`: `j=0` → scores equal, `dp[1]=5+5=10`.
- `i=2`: check `j=0,1` (scores 5 > 4) → no update, `dp[2]=4`.
- `i=3`: `j=0,1` (5 ≤ 6) → `dp[3]=MAX(6,5+6,10+6)=16`.
Result `max(dp)=16`.

## Complexity Analysis
- **Time:** O(n²) due to the double loop over players.
- **Space:** O(n) for the `dp` array.

## Follow‑Up Questions
1. How can the DP be optimized to O(n log n) using a Fenwick or Segment Tree?
2. What changes are needed if the age condition is strict (`ages[i] < ages[j]` ⇒ `scores[i] < scores[j]`)?
3. Can you solve the problem when the number of players is up to 10⁵?

## Key Takeaway
Sorting by age converts the conflict condition into a simple non‑decreasing score check, allowing a longest‑increasing‑subsequence style DP to compute the optimal team score.