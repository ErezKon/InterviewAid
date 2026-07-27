# 175. Combine Two Tables

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/combine-two-tables](https://leetcode.com/problems/combine-two-tables)
**Companies:** Amazon, Bloomberg, Cognizant, Google, Infosys, Meta, Microsoft

---

```sql
SELECT p.firstName, p.lastName, a.city, a.state
FROM Person p
LEFT JOIN Address a ON p.personId = a.personId;
```
