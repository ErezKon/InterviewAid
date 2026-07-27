# 1564. Put Boxes Into the Warehouse I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/put-boxes-into-the-warehouse-i](https://leetcode.com/problems/put-boxes-into-the-warehouse-i)
**Companies:** Amazon, Google, Pinterest

---

```
FUNCTION maxBoxesInWarehouse(boxes, warehouse):
    // Preprocess warehouse: effective height at each position
    FOR i ← 1 TO len(warehouse) - 1:
        warehouse[i] = MIN(warehouse[i], warehouse[i-1])
    SORT boxes
    count = 0; j = len(warehouse) - 1
    FOR box IN boxes:
        WHILE j >= 0 AND warehouse[j] < box: j -= 1
        IF j < 0: BREAK
        count += 1; j -= 1
    RETURN count
```
