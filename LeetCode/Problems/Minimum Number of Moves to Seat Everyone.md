# 2037. Minimum Number of Moves to Seat Everyone

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-moves-to-seat-everyone](https://leetcode.com/problems/minimum-number-of-moves-to-seat-everyone)
**Companies:** Amazon, Google, Meta, Microsoft

---

```
FUNCTION minMovesToSeat(seats, students):
    SORT seats; SORT students
    RETURN SUM(ABS(s - t) for s, t in zip(seats, students))
```
