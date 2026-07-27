# 3074. Apple Redistribution into Boxes

**Difficulty:** 🟢 Easy

**Companies:** Apple, Bloomberg, Google
---

```
FUNCTION minimumBoxes(apple, capacity):
    total = SUM(apple)
    SORT capacity DESC
    FOR i, c IN enumerate(capacity):
        total -= c
        IF total <= 0: RETURN i + 1
```
