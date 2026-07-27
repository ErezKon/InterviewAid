# 2007. Find Original Array From Doubled Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-original-array-from-doubled-array](https://leetcode.com/problems/find-original-array-from-doubled-array)
**Companies:** Amazon, Bloomberg, Goldman Sachs, Google, Meta, Verily

---

```
FUNCTION findOriginalArray(changed):
    IF len(changed) % 2 != 0: RETURN []
    count = Counter(changed)
    result = []

    FOR num IN sorted(count.keys(), key=abs):
        IF count[num] > count[2 * num]: RETURN []
        FOR _ ← 0 TO count[num] - 1:
            result.ADD(num)
            count[2 * num] -= 1
        count[num] = 0

    RETURN result
```

Sort by absolute value. For each number, pair it with its double.
