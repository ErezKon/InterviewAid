# 619. Biggest Single Number

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/biggest-single-number](https://leetcode.com/problems/biggest-single-number)
**Companies:** Amazon, Bloomberg, Google

---

```sql
SELECT MAX(num) AS num
FROM (SELECT num FROM MyNumbers GROUP BY num HAVING COUNT(*) = 1) t;
```
