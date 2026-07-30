# 531. Lonely Pixel I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/lonely-pixel-i](https://leetcode.com/problems/lonely-pixel-i)
**Companies:** Google

---

## 1. Problem Description

Count 'B' (black) pixels that are the only 'B' in their row AND column.

---

## 2. Examples

**Example 1:**
```
picture = [
  ["W","B","W","W"],
  ["W","W","W","W"],
  ["W","W","B","W"],
  ["W","W","W","W"]
]
```
**Output:** `2`
**Explanation:** The black pixels at (0,1) and (2,2) are each the only black pixel in their respective row and column.

**Example 2:**
```
picture = [
  ["B","W","W"],
  ["W","B","W"],
  ["W","W","B"]
]
```
**Output:** `0`
**Explanation:** No black pixel satisfies both row and column uniqueness.

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
