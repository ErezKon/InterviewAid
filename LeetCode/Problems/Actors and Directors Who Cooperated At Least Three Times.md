# 1050. Actors and Directors Who Cooperated At Least Three Times

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/actors-and-directors-who-cooperated-at-least-three-times](https://leetcode.com/problems/actors-and-directors-who-cooperated-at-least-three-times)
**Companies:** Amazon, Google, Microsoft

---

```sql
SELECT actor_id, director_id FROM ActorDirector
GROUP BY actor_id, director_id
HAVING COUNT(*) >= 3;
```
