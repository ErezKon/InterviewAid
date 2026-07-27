# 2339. All the Matches of the League

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/all-the-matches-of-the-league](https://leetcode.com/problems/all-the-matches-of-the-league)
**Companies:** Microsoft

---

## 1. Problem Description

**SQL Problem.** Given a `Teams` table, generate all possible matches where each team plays against every other team (home and away).

---

## 2. Approach: Cross Join ✅

```sql
SELECT t1.team_name AS home_team, t2.team_name AS away_team
FROM Teams t1
CROSS JOIN Teams t2
WHERE t1.team_name != t2.team_name;
```

---

## Key Takeaway

> `CROSS JOIN` with a self-exclusion filter generates all ordered pairs. For unordered pairs, use `t1.team_name < t2.team_name`.
