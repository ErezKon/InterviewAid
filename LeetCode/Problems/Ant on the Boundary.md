# 3028. Ant on the Boundary

**Difficulty:** 🟢 Easy

**Companies:** Accenture, Amazon, Google
---

```
FUNCTION returnToBoundaryCount(nums):
    prefix = 0; count = 0
    FOR num IN nums:
        prefix += num
        IF prefix == 0: count += 1
    RETURN count
```
