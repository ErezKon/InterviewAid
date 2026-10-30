# 571. Find Median Given Frequency of Numbers

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-median-given-frequency-of-numbers](https://leetcode.com/problems/find-median-given-frequency-of-numbers)
**Companies:** Pinterest

---

## Problem Description
> *Note: #571 is a **SQL** problem (premium; statement verified via doocs/leetcode). The Approach/Walkthrough below describe an array version of the same idea; the SQL solution uses cumulative `SUM(frequency)` window functions and keeps rows whose running range covers the middle position(s).*

Table: `Numbers`

```
+-------------+------+
| Column Name | Type |
+-------------+------+
| num         | int  |
| frequency   | int  |
+-------------+------+
num is the primary key (column with unique values) for this table.
Each row of this table shows the frequency of a number in the database.
```

The **median** is the value separating the higher half from the lower half of a data sample.

Write a solution to report the **median** of all the numbers in the database after decompressing the `Numbers` table. Round the median to **one decimal point**.

The result format is in the following example.

## Examples
**Example 1:**
```
Input:
Numbers table:
+-----+-----------+
| num | frequency |
+-----+-----------+
| 0   | 7         |
| 1   | 1         |
| 2   | 3         |
| 3   | 1         |
+-----+-----------+
Output:
+--------+
| median |
+--------+
| 0.0    |
+--------+
Explanation:
If we decompress the Numbers table, we will get [0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 3], so the median is (0 + 0) / 2 = 0.
```

## Approach
Compute the total size `N` = sum(freq). The median positions are `mid1 = (N+1)//2` and `mid2 = (N+2)//2` (both same when N odd). Iterate over `values` in sorted order while accumulating a running count of frequencies. When the running count reaches or exceeds a median position, record the corresponding value. Use a binary search on the prefix sums for O(log n) query per median.

### Pseudocode
```text
FUNCTION findMedian(values, freq):
    // assume values are sorted; if not, sort pairs together
    SET n ← LENGTH(values)
    SET prefix ← empty list
    SET sum ← 0
    FOR i ← 0 TO n-1:
        SET sum ← sum + freq[i]
        APPEND sum TO prefix
    SET total ← sum
    SET mid1 ← (total + 1) DIV 2
    SET mid2 ← (total + 2) DIV 2
    SET median1 ← getValueAtPosition(prefix, values, mid1)
    SET median2 ← getValueAtPosition(prefix, values, mid2)
    RETURN (median1 + median2) / 2.0

FUNCTION getValueAtPosition(prefix, values, pos):
    // binary search for first index where prefix[idx] >= pos
    SET left ← 0
    SET right ← LENGTH(prefix) - 1
    WHILE left < right:
        SET mid ← (left + right) DIV 2
        IF prefix[mid] < pos:
            SET left ← mid + 1
        ELSE:
            SET right ← mid
    RETURN values[left]
```

## Walkthrough
For `values=[1,2,3]`, `freq=[2,2,1]`:
- Prefix sums = [2,4,5]; total = 5; mid1=3, mid2=3.
- Binary search for position 3 returns index 1 (value 2). Both medians are 2 → result 2.0.

## Complexity Analysis
- **Time:** O(n log n) for sorting (if needed) plus O(log n) per median lookup.
- **Space:** O(n) for the prefix array.

## Follow‑Up Questions
1. How would you handle the case where `values` are not distinct?
2. Can you compute the median in O(n) without sorting by using a selection algorithm on the weighted frequencies?
3. What changes are needed if the frequencies are extremely large and may overflow 32‑bit integers?

## Key Takeaway
By converting frequencies to prefix sums, the median can be located via binary search without materializing the full multiset.
