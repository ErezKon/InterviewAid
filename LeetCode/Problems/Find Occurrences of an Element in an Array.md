# 3159. Find Occurrences of an Element in an Array

**Difficulty:** 🟡 Medium

**Companies:** Amazon, Ibm, Jpmorgan
---

```
FUNCTION occurrencesOfElement(nums, queries, x):
    positions = [i for i, n in enumerate(nums) if n == x]
    RETURN [positions[q-1] if q <= len(positions) else -1 for q in queries]
```
