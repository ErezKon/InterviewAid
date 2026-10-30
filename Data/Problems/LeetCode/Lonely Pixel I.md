# 531. Lonely Pixel I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/lonely-pixel-i](https://leetcode.com/problems/lonely-pixel-i)
**Companies:** Google

---

## 1. Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

Given an `m x n` `picture` consisting of black `'B'` and white `'W'` pixels, return *the number of **black** lonely pixels*.

A black lonely pixel is a character `'B'` that located at a specific position where the same row and same column don't have **any other** black pixels.

**Constraints:**
- `m == picture.length`
- `n == picture[i].length`
- `1 <= m, n <= 500`
- `picture[i][j]` is `'W'` or `'B'`.

---

## 2. Examples

**Example 1:**
```
Input: picture = [["W","W","B"],["W","B","W"],["B","W","W"]]
Output: 3
Explanation: All the three 'B's are black lonely pixels.
```

**Example 2:**
```
Input: picture = [["B","B","B"],["B","B","W"],["B","B","B"]]
Output: 0
```

---

## 3. Approach: Row/Col Counts — O(m·n) ✅

```text
FUNCTION findLonelyPixel(picture):
    rowCount ← array of length m initialized to 0
    colCount ← array of length n initialized to 0
    // First pass: count black pixels per row and column
    FOR r FROM 0 TO m-1:
        FOR c FROM 0 TO n-1:
            IF picture[r][c] == 'B':
                rowCount[r] ← rowCount[r] + 1
                colCount[c] ← colCount[c] + 1
    result ← 0
    // Second pass: identify lonely pixels
    FOR r FROM 0 TO m-1:
        FOR c FROM 0 TO n-1:
            IF picture[r][c] == 'B' AND rowCount[r] == 1 AND colCount[c] == 1:
                result ← result + 1
    RETURN result
```

---

## 4. Walkthrough

| Step | Action |
|------|--------|
| 1 | Initialize `rowCount` and `colCount` to zeros. |
| 2 | Scan the matrix; for each `'B'` increment its row and column counters. |
| 3 | Scan again; a `'B'` is lonely if its row counter and column counter are both `1`. |
| 4 | Increment `result` for each lonely pixel and return the total. |

---

## 5. Complexity Analysis

- **Time:** O(m·n) – two full passes over the picture.
- **Space:** O(m + n) – arrays for row and column counts.

---

## 6. Follow-Up Questions

- How would you solve the problem if the picture is streamed row by row?
- Can you reduce the space to O(1) by modifying the input matrix?
- How would the solution change if the uniqueness condition applied to rows only?

---

## 7. Key Takeaway

> Precompute black‑pixel counts per row and column. A pixel is "lonely" iff both its row count and column count equal 1.
