# 595. Big Countries

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/big-countries](https://leetcode.com/problems/big-countries)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Tcs

---

```sql
SELECT name, population, area
FROM World
WHERE area >= 3000000 OR population >= 25000000;
```
