# 3168. Minimum Number of Chairs in a Waiting Room

**Difficulty:** 🟢 Easy

**Companies:** Amazon, Expedia, Goldman Sachs
---

```
FUNCTION minimumChairs(s):
    curr = 0; maxChairs = 0
    FOR c IN s:
        IF c == 'E': curr += 1
        ELSE: curr -= 1
        maxChairs = MAX(maxChairs, curr)
    RETURN maxChairs
```
