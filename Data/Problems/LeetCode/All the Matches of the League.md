# 2339. All the Matches of the League

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/all-the-matches-of-the-league](https://leetcode.com/problems/all-the-matches-of-the-league)
**Companies:** Microsoft

---

## 1. Problem Description

**SQL Problem.** Given a `Teams` table, generate all possible matches where each team plays against every other team (home and away).

---

## 2. Examples

**Example 1**
```
Teams:
| team_name |
|-----------|
| A |
| B |
| C |
```
**Output**
```
| home_team | away_team |
|-----------|-----------|
| A | B |
| A | C |
| B | A |
| B | C |
| C | A |
| C | B |
```
*Explanation*: Every ordered pair of distinct teams appears.

**Example 2**
```
Teams:
| team_name |
|-----------|
| X |
| Y |
```
**Output**
```
| home_team | away_team |
| X | Y |
| Y | X |
```
*Explanation*: With two teams, each plays the other once at home.

---

## 3. Approach: Cross Join ✅

```sql
SELECT t1.team_name AS home_team, t2.team_name AS away_team
FROM Teams t1
CROSS JOIN Teams t2
WHERE t1.team_name != t2.team_name;
```

---

## 4. Walkthrough

| Step | Action | Result |
|------|--------|--------|
| 1 | Perform `CROSS JOIN` of `Teams` with itself | Produces every ordered pair of teams |
| 2 | Filter out rows where `team_name` equals itself | Removes self‑matches |
| 3 | Select `home_team` and `away_team` columns | Final match list |

---

## 5. Complexity Analysis

- **Time Complexity**: `O(N²)` where `N` is the number of teams, due to the self‑join.
- **Space Complexity**: `O(N²)` for the result set of matches.

---

## 6. Follow-Up Questions

- How would you generate only unordered matches (i.e., treat A vs B the same as B vs A)?
- If the `Teams` table is huge, what indexing strategies could improve performance?
- Can you rewrite the query using `EXISTS` or `UNION` instead of a cross join?

---

## Key Takeaway

> A self `CROSS JOIN` with a non‑equality filter efficiently enumerates all possible ordered matches between teams.
