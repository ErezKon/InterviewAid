# 1738. Find Kth Largest XOR Coordinate Value

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-kth-largest-xor-coordinate-value](https://leetcode.com/problems/find-kth-largest-xor-coordinate-value)
**Companies:** Google

---

## Problem Description

You are given a 2D `matrix` of size `m x n`, consisting of non-negative integers. You are also given an integer `k`.

The **value** of coordinate `(a, b)` of the matrix is the XOR of all `matrix[i][j]` where `0 <= i <= a < m` and `0 <= j <= b < n` **(0-indexed)**.

Find the `k^th` largest value **(1-indexed)** of all the coordinates of `matrix`.

**Constraints:**

- `m == matrix.length`
- `n == matrix[i].length`
- `1 <= m, n <= 1000`
- `0 <= matrix[i][j] <= 10^6`
- `1 <= k <= m * n`

---

## Examples

```
Example 1:
  Input: matrix = [[5,2],[1,6]], k = 1
  Output: 7
  Explanation: The value of coordinate (0,1) is 5 XOR 2 = 7, which is the largest value.
```

```
Example 2:
  Input: matrix = [[5,2],[1,6]], k = 2
  Output: 5
  Explanation: The value of coordinate (0,0) is 5 = 5, which is the 2nd largest value.
```

```
Example 3:
  Input: matrix = [[5,2],[1,6]], k = 3
  Output: 4
  Explanation: The value of coordinate (1,0) is 5 XOR 1 = 4, which is the 3rd largest value.
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