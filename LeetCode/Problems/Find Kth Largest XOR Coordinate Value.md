# 1738. Find Kth Largest XOR Coordinate Value

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-kth-largest-xor-coordinate-value](https://leetcode.com/problems/find-kth-largest-xor-coordinate-value)
**Companies:** Google

---

## Problem Description

Given a matrix of integers, for each coordinate `(i, j)` compute the XOR of all elements in the submatrix from `(0,0)` to `(i,j)`. Return the k‑th largest value among all these XOR results.

---

## Examples

**Example 1:**
```
Input: matrix = [[5,2],[1,6]], k = 2
Output: 5
Explanation: Prefix XORs are [5,7,4,0]; sorted descending → [7,5,4,0]; the 2nd largest is 5.
```

**Example 2:**
```
Input: matrix = [[1,3,4],[8,6,7],[5,2,9]], k = 5
Output: 4
Explanation: Compute all 9 prefix XOR values, sort descending, the 5th largest is 4.
```

---

## Approach: 2D Prefix XOR + Sort — O(m·n log(m·n)) ✅

```text
FUNCTION kthLargestValue(matrix, k):
    m ← number of rows
    n ← number of columns
    prefix ← m × n matrix initialized to 0
    values ← empty list
    FOR i ← 0 TO m - 1:
        FOR j ← 0 TO n - 1:
            prefix[i][j] ← matrix[i][j]
            IF i > 0: prefix[i][j] ← prefix[i][j] XOR prefix[i-1][j]
            IF j > 0: prefix[i][j] ← prefix[i][j] XOR prefix[i][j-1]
            IF i > 0 AND j > 0: prefix[i][j] ← prefix[i][j] XOR prefix[i-1][j-1]
            values.APPEND(prefix[i][j])
    SORT values in descending order
    RETURN values[k - 1]
```

---

## Walkthrough

Consider `matrix = [[5,2],[1,6]]`:
1. Initialize `prefix` as [[0,0],[0,0]].
2. `(0,0)`: `prefix[0][0] = 5`; values = [5].
3. `(0,1)`: `prefix[0][1] = 2 XOR 5 = 7`; values = [5,7].
4. `(1,0)`: `prefix[1][0] = 1 XOR 5 = 4`; values = [5,7,4].
5. `(1,1)`: `prefix[1][1] = 6 XOR 4 XOR 7 XOR 5 = 0`; values = [5,7,4,0].
6. Sort descending → [7,5,4,0]; k=2 → answer 5.

---

## Complexity Analysis

- **Time:** Computing prefix XOR for each cell O(m·n) plus sorting O(m·n log(m·n)).
- **Space:** O(m·n) for the prefix matrix and the list of values.

---

## Follow-Up Questions

1. How would you find the k‑th largest value without fully sorting the list (e.g., using a heap or quick‑select)?
2. Can this technique be extended to 3‑D tensors with XOR prefix sums?
3. What if the matrix is extremely large and cannot fit in memory—how would you stream the computation?

---

## Key Takeaway

> **2D prefix XOR lets you compute XOR of any submatrix in O(1) after O(m·n) preprocessing; then select the k‑th largest among the collected values.**