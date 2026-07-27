# 1386. Cinema Seat Allocation

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/cinema-seat-allocation](https://leetcode.com/problems/cinema-seat-allocation)
**Companies:** Bloomberg, Geico, Linkedin, Microsoft, Yandex

---

```
FUNCTION maxNumberOfFamilies(n, reservedSeats):
    reserved = defaultdict(set)
    FOR [r, c] IN reservedSeats: reserved[r].ADD(c)

    count = 2 * (n - len(reserved))    // rows with no reservations get 2 families

    FOR r, seats IN reserved.items():
        left = not any(s in seats for s in [2,3,4,5])
        mid = not any(s in seats for s in [4,5,6,7])
        right = not any(s in seats for s in [6,7,8,9])
        IF left AND right: count += 2
        ELSE IF left OR mid OR right: count += 1

    RETURN count
```
